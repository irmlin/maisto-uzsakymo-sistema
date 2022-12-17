import express from 'express';
import http from 'http';
import * as db from './db.js'
import bodyParser from 'body-parser';
import cors from 'cors';
import { COURIER_STATES, ROLES } from './Enums/Enums.js';
import { ExistEmailOrUsernameDuplicates } from './Helper/HelperFunctions.js';

const app = express();

app.use(cors({
    origin: true
}));

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(express.json({type: '*/*'}));

http.createServer(app).listen(3001, () => {
    console.log("server is runing at port 3001");
});

app.post('/register/courier', express.json({type: '*/*'}), async (request, response) => {  
	try{
		let firstName = request.body.firstName;
		let lastName = request.body.lastName;
		let email = request.body.email;
		let username = request.body.username;
		let password = request.body.password;
    let personalCode = request.body.personalCode;
    let birthDate = request.body.birthDate;
    let phoneNumber = request.body.phoneNumber;
    let transport = request.body.transport;	
    let cityId = request.body.cityId;
		
		const validationResult = await ExistEmailOrUsernameDuplicates('couriers', email, username);
		if (validationResult.existDuplicates) {
			response.status(400).send({message: validationResult.message, success: false});
		} else {
			let sql = `INSERT INTO couriers (personal_code, firstname, lastname, birth_date,
				phone_number, email, transport, username, password, fk_city_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
			let data = [personalCode, firstName, lastName, birthDate, phoneNumber, email, transport, username, password, cityId];
			await db.executeSqlQuery(sql, data);
			response.status(201).send({message: "Kurjeris sėkmingai sukurtas", success: true});	
		}
	}	
	catch(e) {
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.post('/register/client', express.json({type: '*/*'}), async (request, response) => {  
	try{
		let firstName = request.body.firstName;
		let lastName = request.body.lastName;
		let email = request.body.email;
		let username = request.body.username;
		let password = request.body.password;
    let personalCode = request.body.personalCode;
    let birthDate = request.body.birthDate;
    let phoneNumber = request.body.phoneNumber;
		let cityId = request.body.cityId;
	
		const validationResult = await ExistEmailOrUsernameDuplicates('clients', email, username);
		if (validationResult.existDuplicates) {
			response.status(400).send({message: validationResult.message, success: false});
		} else {
			let sql = `INSERT INTO clients (personal_code, firstname, lastname, birth_date,
				phone_number, email, username, password, fk_city_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
			let data = [personalCode, firstName, lastName, birthDate, phoneNumber, email, username, password, cityId];
			await db.executeSqlQuery(sql, data);
			response.status(201).send({message: "Klientas sėkmingai sukurtas", success: true});	
		}
	}	
	catch(e){
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.post('/register/restaurant', express.json({type: '*/*'}), async (request, response) => {  
	try{
		let email = request.body.email;
		let username = request.body.username;
		let password = request.body.password;
		let restaurantName = request.body.restaurantName;
		let cityId = request.body.cityId;
    let address = request.body.address;
    let openingTime = request.body.openingTime;
    let closingTime = request.body.closingTime;
	
		const validationResult = await ExistEmailOrUsernameDuplicates('restaurants', email, username);
		if (validationResult.existDuplicates) {
			response.status(400).send({message: validationResult.message, success: false});
		} else {
			let sql = `INSERT INTO restaurants (email, username, password, name,
				fk_city_id, address, opening_time, closing_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
			let data = [email, username, password, restaurantName, cityId, address, openingTime, closingTime];
			await db.executeSqlQuery(sql, data);
			response.status(201).send({message: "Restoranas sėkmingai sukurtas", success: true});	
		}
	}	
	catch(e){
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.post('/register/admin', express.json({type: '*/*'}), async (request, response) => {  
	try{
		let firstname = request.body.firstName;
		let lastname = request.body.lastName;
		let email = request.body.email;
		let phoneNumber = request.body.phoneNumber;
		let username = request.body.username;
    let password = request.body.password;
	
		let sql = `INSERT INTO admins (firstname, lastname, email, phone_number,
      username, password) VALUES (?, ?, ?, ?, ?, ?)`;
		let data = [firstname, lastname, email, phoneNumber, username, password];
		await db.executeSqlQuery(sql, data);
    response.status(201).send({message: "Administratorius sėkmingai sukurtas", success: true});	
	}	
	catch(e){
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.post('/login', express.json({type: '*/*'}), async (request, response) => {
	try {
		let emailOrUsername = request.body.emailOrUsername;
		let password = request.body.password;
		let role = request.body.selectedRole;
		let tableName = Object.values(ROLES).find(item => (
			item.ROLENAME === role
		)).TABLENAME;

		const isAdmin = role === ROLES.ADMINISTRATOR.ROLENAME; 
		let sql = `SELECT COUNT(id) AS found, id` + 
			(isAdmin ? `` : `, fk_city_id`) +
			`, username, email, password FROM ${tableName} WHERE email = ? OR username = ?`;
		let result = await db.executeSqlQuery(sql, [emailOrUsername, emailOrUsername]);

		// check if user exists
		if(result[0].found == 1)
		{
			// confirm password
			if (result[0].password === password) {

				// if courier, change status to 'logged in'
				if (role === ROLES.COURIER.ROLENAME) {
					let sqlUpdateStatus = "UPDATE couriers SET status = ? WHERE id = ?";
					await db.executeSqlQuery(sqlUpdateStatus, [COURIER_STATES.ONLINE, result[0].id]);
				}
				let responseData = {success: true, email: result[0].email, role: role,
					username: result[0].username, id: result[0].id}

				if (!isAdmin) 
					responseData["cityId"] = result[0].fk_city_id;

				response.status(200).send(responseData);	
			} else {
				response.status(401).send({success: false, message: "Neteisingas slaptažodis"});
			}		
		}			
		else {
			response.status(401).send({success: false, message: "Vartotojas nerastas"});
		}
	}	
	catch(e){
		console.log(e);
		response.status(500).send({message: "Serverio klaida"});
	}
})

app.get('/courier/:id/data', async (request, response) => {
	try{
		let id = request.params.id;
    let sql = `SELECT cr.firstname, cr.lastname,
			cr.birth_date, cr.employed_from,
			cr.phone_number, cr.transport,
			cr.approved, cr.status,
			c.name AS city, c.county
			FROM couriers AS cr INNER JOIN cities AS c 
			ON c.id = cr.fk_city_id WHERE cr.id = ?`;

    let result = await db.executeSqlQuery(sql, [id]);
    response.status(200).send(JSON.stringify({profileData: result[0], success: true}));
	}
	catch (e) {
		console.log(e);
		response.status(500).send({message: e.sqlMessage, success: false});
	}
})

app.get('/restaurant/:id/data', async (request, response) => {
	try{
		let id = request.params.id;
    let sql = 'SELECT name, address, opening_time, closing_time FROM restaurants WHERE id = ?';
    let result = await db.executeSqlQuery(sql, [id]);
    
    response.status(200).send(JSON.stringify({profileData: result[0], success: true}));
	}
	catch (e) {
		console.log(e);
		response.status(500).send({message: e.sqlMessage, success: false});
	}
})

app.get('/client/:id/data', async (request, response) => {
	try{
		let id = request.params.id;
    let sql = 'SELECT username FROM clients WHERE id = ?';
    let result = await db.executeSqlQuery(sql, [id]);
    
    response.status(200).send(JSON.stringify({profileData: result[0], success: true}));
	}
	catch (e) {
		console.log(e);
		response.status(500).send({message: e.sqlMessage, success: false});
	}
})

app.put('/courier/:id/transport', async (request, response) => {  
	try{
		let id = request.params.id;
		let newTransport = request.body.transport;
		let sql = 'UPDATE couriers SET transport = ? WHERE id = ?';
		let result = await db.executeSqlQuery(sql, [newTransport, id]);
    response.status(200).send({message: "Transportas išsaugotas sėkmingai!", success: true});	
	}	
	catch(e){
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.put('/courier/:id/status', async (request, response) => {  
	try{
		let id = request.params.id;
		let newStatus = request.body.status;
		let sql = 'UPDATE couriers SET status = ? WHERE id = ?';
		let result = await db.executeSqlQuery(sql, [newStatus, id]);
    response.status(200).send({message: "Būsena išsaugota sėkmingai!", success: true});	
	}	
	catch(e){
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.put('/restaurant/:id/data', async (request, response) => {  
	try{;
		let sql = 'UPDATE restaurants SET name = ?, address = ?, opening_time = ?, closing_time = ?  WHERE id = ?';
		let data = [
			request.body.name,
			request.body.address,
			request.body.opening_time,
			request.body.closing_time,
			request.params.id
		];
		let result = await db.executeSqlQuery(sql, data);
    response.status(200).send({message: "Restorano informacija išsaugota sėkmingai!", success: true});	
	}	
	catch(e){
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.get('/cities', async (request, response) => {
	try{
    let sql = 'SELECT * FROM cities';
    let result = await db.executeSqlQuery(sql, []);
    
    response.status(200).send(JSON.stringify({result}));

	}
	catch (e) {
		console.log(e);
		response.status(500).send("Serverio klaida");
	}
})

app.get('/restaurants/:cityId', async (request, response) => {
	try{
		let id = request.params.cityId;
    let sql = `SELECT id, name, address, opening_time, closing_time FROM restaurants WHERE approved = 1 AND fk_city_id = ?`;
    let result = await db.executeSqlQuery(sql, [id]);
    
    response.status(200).send({success: true, restaurants: result});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.get('/meals/:restaurantId', async (request, response) => {
	try{
		let id = request.params.restaurantId;
    let sql = 
		`
		SELECT m.id, m.name, m.description, m.price, m.vegetarian, 
		r.name as restaurantName, m.fk_restaurant_id AS restaurantId, r.name as restaurantName
		FROM meals AS m
		RIGHT JOIN restaurants AS r
		ON r.id = m.fk_restaurant_id
		WHERE r.id = ?
		`;
    let result = await db.executeSqlQuery(sql, [id]);
    !result.length ? response.status(200).send({success: false, message: "Nerasta patiekalų!"}) : 
		response.status(200).send({success: true, meals: result});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

// fetch orders for courier
app.get('/orders/:cityId', async (request, response) => {
	try{
		let cityId = request.params.cityId;
    let sql = 
		`
		SELECT o.id AS orderId, o.date, o.delivery_address, o.client_comments, o.status AS orderStatus,
			c.firstname, c.lastname, c.phone_number, c.id AS clientId,
			crt.id AS cartId, crt.sum AS totalCartPrice,
			crtm.amount AS currentMealAmount,
			m.name AS mealName,
			r.name AS restaurantName, r.address AS restaurantAddress,
			d.tariff_size AS deliveryTax
		FROM orders AS o
		INNER JOIN clients AS c ON c.id = o.fk_client_id
		INNER JOIN carts AS crt ON crt.fk_order_id = o.id
		INNER JOIN cart_meals AS crtm ON crtm.fk_cart_id = crt.id
		INNER JOIN meals AS m ON crtm.fk_meal_id = m.id
		INNER JOIN restaurants AS r ON r.id = m.fk_restaurant_id 
		INNER JOIN delivery_tariffs AS d on d.id = o.fk_delivery_tariff_id
		WHERE 
			(o.status = "Apmokėtas" OR o.status = "Patvirtintas restorano" OR o.status = "Pagamintas")
			AND o.fk_courier_id IS NULL
			AND c.fk_city_id = ?
		`;
    let result = await db.executeSqlQuery(sql, [cityId]);
		response.status(200).send({success: true, orders: result});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.put('/orders/:orderId/status', async (request, response) => {  
	try{
		let id = request.params.orderId;
		let newStatus = request.body.newStatus;
		let sql = 'UPDATE orders SET status = ? WHERE id = ?';
		let result = await db.executeSqlQuery(sql, [newStatus, id]);
    response.status(200).send({message: "Užsakymas atnaujintas sėkmingai!", success: true});	
	}	
	catch(e) {
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.put('/orders/:orderId/assign-courier', async (request, response) => {  
	try{
		let orderId = request.params.orderId;
		let courierId = request.body.courierId;
		let sql = 'UPDATE orders SET fk_courier_id = ? WHERE id = ?';
		let result = await db.executeSqlQuery(sql, [courierId, orderId]);
    response.status(200).send({message: "Kurjeris priskirtas sėkmingai!", success: true});	
	}	
	catch(e) {
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.get('/orders/:orderId/get-one', async (request, response) => {
	try{
		let orderId = request.params.orderId;
    let sql = 
		`SELECT * from orders WHERE id = ?`;
    let result = await db.executeSqlQuery(sql, [orderId]);
		response.status(200).send({success: true, order: result});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})