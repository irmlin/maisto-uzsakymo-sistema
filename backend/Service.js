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
		const isCourier = role === ROLES.COURIER.ROLENAME; 
		let sql = `SELECT COUNT(id) AS found, id` + 
			(isAdmin ? `` : `, fk_city_id`) +
			(isCourier ? `, approved` : ``) + 
			`, username, email, password FROM ${tableName} WHERE email = ? OR username = ? GROUP BY id`;
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

				if (isCourier) {
					responseData["approved"] = result[0].approved;
					responseData["status"] = COURIER_STATES.ONLINE;	
				}
					
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
app.get('/couriers/adminReport', async (request, response) => {
	console.log("Asd");
	try{
    	let sql = `SELECT c.id, c.firstname, c.lastname, SUM(if(o.status = 'Užbaigtas', 1, 0)) AS completed, SUM(if(o.status = 'Atšauktas', 1, 0)) AS declined, SUM(if(o.status = 'Atšauktas', 0, df.tariff_size)) as money
		FROM couriers AS c 
		LEFT JOIN orders AS o ON c.id = o.fk_courier_id
		LEFT JOIN delivery_tariffs AS df ON o.fk_delivery_tariff_id = df.id
		GROUP BY c.id`;
    	let result = await db.executeSqlQuery(sql, []);
		console.log(result);
    
    	response.status(200).send({success: true, couriers: result});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})
app.get('/courier/:id/data', async (request, response) => {
	try{
		let id = request.params.id;
    let sql = `SELECT cr.firstname, cr.lastname,
			cr.birth_date, cr.employed_from,
			cr.phone_number, cr.transport, cr.email,
			cr.approved, cr.status,
			c.name AS city, c.county, df.tariff_size
			FROM couriers AS cr INNER JOIN cities AS c 
			ON c.id = cr.fk_city_id LEFT JOIN delivery_tariffs as df ON cr.id = df.fk_courier_id WHERE cr.id = ?`;

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
    let sql = 'SELECT r.name, r.address, r.opening_time, r.closing_time, r.email, t.tax_size FROM restaurants as r LEFT JOIN taxes as t ON r.fk_tax_id = t.id WHERE r.id = ?';
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

app.get('/restaurants/adminReport', async (request, response) => {
	console.log("Asd");
	try{
    	let sql = `SELECT r.id, r.name, COUNT(o.id) as order_count, SUM(cm.amount) as meal_count, SUM(o.price) as price, SUM(cm.amount)*t.tax_size as taxes
		FROM restaurants as r
		LEFT JOIN meals as m ON m.fk_restaurant_id = r.id
		LEFT JOIN cart_meals as cm ON cm.fk_meal_id = m.id
		LEFT JOIN carts as c ON c.id = cm.fk_cart_id
		LEFT JOIN orders as o ON c.fk_order_id = o.id
		LEFT JOIN taxes as t ON r.fk_tax_id = t.id GROUP BY r.id`;
    	let result = await db.executeSqlQuery(sql, []);
		console.log(result);
    
    	response.status(200).send({success: true, restaurants: result});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
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
			r.name AS restaurantName, r.address AS restaurantAddress
		FROM orders AS o
		INNER JOIN clients AS c ON c.id = o.fk_client_id
		INNER JOIN carts AS crt ON crt.fk_order_id = o.id
		INNER JOIN cart_meals AS crtm ON crtm.fk_cart_id = crt.id
		INNER JOIN meals AS m ON crtm.fk_meal_id = m.id
		INNER JOIN restaurants AS r ON r.id = m.fk_restaurant_id
		WHERE 
			(o.status = "Užsakytas kliento" OR o.status = "Patvirtintas restorano" OR o.status = "Pagamintas")
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

		let sqlDelivery = `SELECT id FROM delivery_tariffs  
		WHERE fk_courier_id = ? AND NOW() >= applied_from AND NOW() <= applied_until`;
		let resultDelivery = await db.executeSqlQuery(sqlDelivery, [courierId]);

		let sql = 'UPDATE orders SET fk_courier_id = ?, fk_delivery_tariff_id = ? WHERE id = ?';
		let result = await db.executeSqlQuery(sql, [courierId, resultDelivery[0].id, orderId]);
		let sqlStatus = 'UPDATE couriers set status = ? WHERE id = ?';
		let resultStatus = await db.executeSqlQuery(sqlStatus, [COURIER_STATES.BUSY, courierId]);
    response.status(200).send({message: "Kurjeris priskirtas sėkmingai!", success: true});	
	}	
	catch(e) {
		console.log(e)
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
app.get('/orders/:orderId/client', async (request, response) => {
	try{
		let orderId = request.params.orderId;
    let sql = 
		`SELECT * from orders WHERE fk_client_id = ?`;
    let result = await db.executeSqlQuery(sql, [orderId]);
		response.status(200).send({success: true, orders: result});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.put('/orders/:orderId/cancel-courier', async (request, response) => {  
	try{
		let orderId = request.params.orderId;
		let courierId = request.body.courierId;
		let sql = 'UPDATE orders SET fk_courier_id = null, fk_delivery_tariff_id = null, status = "Užsakytas kliento" WHERE id = ?';
		let result = await db.executeSqlQuery(sql, [orderId]);
		let sqlStatus = 'UPDATE couriers set status = ? WHERE id = ?';
		let resultStatus = await db.executeSqlQuery(sqlStatus, [COURIER_STATES.WAITING_FOR_ORDER, courierId]);
    response.status(200).send({success: true});	
	}	
	catch(e) {
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.get('/unaprovedRestaurants/', async (request, response) => {
	try{
    	let sql = `SELECT id, name, opening_time, closing_time, email FROM restaurants WHERE approved = 0`;
    	let result = await db.executeSqlQuery(sql, []);
    
    	response.status(200).send({success: true, restaurants: result});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.put('/unaprovedRestaurants/:id', async (request, response) => {
	try{
		let tax = request.body.rate;
		let adminId = request.body.adminId;
		let restaurantId = request.params.id;
    	let sql = `INSERT INTO taxes (applied_from, applied_until, tax_size, fk_admin_id) VALUES (NOW(), DATE_ADD(NOW(), INTERVAL 365 DAY), ?, ?)`;
    	let result = await db.executeSqlQuery(sql, [tax, adminId]);

		let sql2 = `UPDATE restaurants SET fk_tax_id = ?, approved = ?, fk_admin_id = ? WHERE id = ?`;
		let result2 = await db.executeSqlQuery(sql2, [result.insertId, 1, adminId, restaurantId]);
		
    	response.status(200).send({success: true});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.get('/orders/by-courier/:courierId', async (request, response) => {
	try{
		let courierId = request.params.courierId;
    let sql = 
		`
		SELECT o.number, o.date, o.delivery_address, r.name AS restaurantName, c.sum AS orderPrice, d.tariff_size AS earnings
		FROM orders AS o
		INNER JOIN carts AS c ON c.fk_order_id = o.id
		INNER JOIN delivery_tariffs AS d ON d.id = o.fk_delivery_tariff_id
		JOIN (
			SELECT id, fk_cart_id, fk_meal_id FROM cart_meals WHERE id IN (
				SELECT MAX(id) FROM cart_meals GROUP BY fk_cart_id
			)
		) AS cm ON cm.fk_cart_id = c.id
		INNER JOIN meals AS m ON m.id = cm.fk_meal_id
		INNER JOIN restaurants AS r ON r.id = m.fk_restaurant_id 
		WHERE o.fk_courier_id = ? AND o.status = "Užbaigtas";
		`;
    let result = await db.executeSqlQuery(sql, [courierId]);
		response.status(200).send({success: true, orders: result});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.get('/orders/by-restaurant/:restaurantId', async (request, response) => {
	try{
		let restaurantId = request.params.restaurantId;
    let sql = 
		`
		SELECT o.number, o.status, o.date, o.delivery_address, c.sum AS orderPrice, cl.firstname, cl.lastname
		FROM orders AS o
		INNER JOIN carts AS c ON c.fk_order_id = o.id
		INNER JOIN clients AS cl ON cl.id = o.fk_client_id
		INNER JOIN delivery_tariffs AS d ON d.id = o.fk_delivery_tariff_id
		JOIN (
			SELECT id, fk_cart_id, fk_meal_id FROM cart_meals WHERE id IN (
				SELECT MAX(id) FROM cart_meals GROUP BY fk_cart_id
			)
		) AS cm ON cm.fk_cart_id = c.id
		INNER JOIN meals AS m ON m.id = cm.fk_meal_id
		INNER JOIN restaurants AS r ON r.id = m.fk_restaurant_id
		WHERE r.id = ? AND o.status = "Užbaigtas";
		
		`;
    let result = await db.executeSqlQuery(sql, [restaurantId]);
		response.status(200).send({success: true, orders: result});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.get('/unaprovedCouriers/', async (request, response) => {
	try{
    	let sql = `SELECT id, firstname, lastname, birth_date, phone_number, email, transport FROM couriers WHERE approved = 0`;
    	let result = await db.executeSqlQuery(sql, []);
    
    	response.status(200).send({success: true, couriers: result});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.put('/unaprovedCouriers/:id', async (request, response) => {
	try{
		let tax = request.body.rate;
		let adminId = request.body.adminId;
		let courierId = request.params.id;
    	let sql = `INSERT INTO delivery_tariffs (applied_from, applied_until, tariff_size, fk_courier_id, fk_admin_id) VALUES (NOW(), DATE_ADD(NOW(), INTERVAL 365 DAY), ?, ?, ?)`;
    	let result = await db.executeSqlQuery(sql, [tax, courierId, adminId]);

		let sql2 = `UPDATE couriers SET approved = ?, fk_admin_id = ?, employed_from = CURDATE() WHERE id = ?`;
		let result2 = await db.executeSqlQuery(sql2, [1, adminId, courierId]);

    	response.status(200).send({success: true});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.get('/couriers/', async (request, response) => {
	try{
    	let sql = `SELECT c.id, c.firstname, c.lastname, c.birth_date, c.employed_from, c.phone_number, c.email, c.transport, c.status, df.tariff_size FROM couriers as c LEFT JOIN delivery_tariffs as df ON c.id = df.fk_courier_id WHERE approved = 1 ORDER BY df.id DESC`;
    	let result = await db.executeSqlQuery(sql, []);
    
    	response.status(200).send({success: true, couriers: result});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.delete('/couriers/:id', async (request, response) => {
	try{		
		let sql = `UPDATE couriers SET approved = 0, fk_admin_id = NULL, employed_from = NULL WHERE id = ?`;
    	let result = await db.executeSqlQuery(sql, [request.params.id]);

		let sql2 = `DELETE FROM delivery_tariffs WHERE fk_courier_id = ?`;
		let result2 = await db.executeSqlQuery(sql2, [request.params.id]);
    
    	response.status(200).send({success: true, couriers: result});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.put('/couriers/:courierId/agreement', async (request, response) => {
	console.log("dsafs");
	try{
		let rate = request.body.rate;
		let courierId = request.params.courierId;

		
		let sql2 = `UPDATE delivery_tariffs SET applied_from=CURDATE(), applied_until = DATE_ADD(CURDATE(), INTERVAL 365 DAY), tariff_size = ? WHERE fk_courier_id = ?`;
		let result2 = await db.executeSqlQuery(sql2, [rate, courierId]);

    	response.status(200).send({success: true});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})


app.put('/meals/:restaurantId/createmeal', async (request, response) => {
	try{
		let id = request.params.restaurantId;
    let sql = 'INSERT INTO meals (name, description, price, vegetarian, fk_restaurant_id) VALUES (?, ?, ?, ?, ?)';
	let data = [request.body.rate.mname, request.body.rate.mdescription, request.body.rate.mprice, request.body.rate.mvegetarian, id];
    let result = await db.executeSqlQuery(sql, data);
    
    response.status(200).send(JSON.stringify({profileData: result[0], success: true}));
	}
	catch (e) {
		console.log(e);
		response.status(500).send({message: e.sqlMessage, success: false});
	}
})

app.put('/meals/:mealid/updatemeal', async (request, response) => {
	try{
		let id = request.params.mealid;
    let sql = 'UPDATE meals SET name = ?, description = ?, price = ?, vegetarian = ? WHERE id = ?';
	let data = [request.body.rate.mname, request.body.rate.mdescription, request.body.rate.mprice, request.body.rate.mvegetarian, id];
    let result = await db.executeSqlQuery(sql, data);
    
    response.status(200).send(JSON.stringify({profileData: result[0], success: true}));
	}
	catch (e) {
		console.log(e);
		response.status(500).send({message: e.sqlMessage, success: false});
	}
})

app.get('/meals/:mealid/getmeal', async (request, response) => {
	try{
		let id = request.params.mealid;
    let sql = 'SELECT name, description, price, vegetarian FROM meals WHERE id = ?';
    let result = await db.executeSqlQuery(sql, [id]);
    
    response.status(200).send(JSON.stringify({meal: result[0], success: true}));
	}
	catch (e) {
		console.log(e);
		response.status(500).send({message: e.sqlMessage, success: false});
	}
})

app.put('/meals/:mealid/deletemeal', async (request, response) => {
	try{
		let id = request.params.mealid;
    let sql = 'DELETE FROM meals WHERE id = ?';
    let result = await db.executeSqlQuery(sql, [id]);
    
    response.status(200).send(JSON.stringify({profileData: result[0], success: true}));
	}
	catch (e) {
		console.log(e);
		response.status(500).send({message: e.sqlMessage, success: false});
	}
})


app.get('/restaurants/', async (request, response) => {
	try{
    	let sql = `SELECT r.id, r.name, r.opening_time, r.closing_time, r.email, t.tax_size FROM restaurants as r LEFT JOIN taxes as t ON r.fk_tax_id = t.id WHERE approved = 1 ORDER BY t.id DESC`;
    	let result = await db.executeSqlQuery(sql, []);
    
    	response.status(200).send({success: true, restaurants: result});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.delete('/restaurants/:id', async (request, response) => {
	try{		
		let sql = 'SELECT fk_tax_id FROM restaurants WHERE id = ?';
		let result = await db.executeSqlQuery(sql, [request.params.id]);

		let sql2 = `UPDATE restaurants SET approved = 0, fk_admin_id = NULL, fk_tax_id = NULL WHERE id = ?`;
    	let result2 = await db.executeSqlQuery(sql2, [request.params.id]);

		console.log(result);

		let sql3 = 'DELETE FROM taxes WHERE id = ?';
		let result3 = await db.executeSqlQuery(sql3, [result[0].fk_tax_id]);
		
    	response.status(200).send({success: true});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.put('/restaurants/:restaurantId/agreement', async (request, response) => {
	console.log("dsafs");
	try{
		let rate = request.body.tax;
		let restaurantId = request.params.restaurantId;

		let sql = 'SELECT fk_tax_id FROM restaurants WHERE id = ?';
		let result = await db.executeSqlQuery(sql, [restaurantId]);
		
		let sql3 = 'UPDATE taxes SET tax_size = ? WHERE id = ?';
		let result3 = await db.executeSqlQuery(sql3, [rate, result[0].fk_tax_id]);

    	response.status(200).send({success: true});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.get('/clients/adminReport', async (request, response) => {
	try{
    	let sql = `SELECT cl.id, cl.firstname, cl.lastname, COUNT(o.id) as order_count, SUM(o.price) as order_sum FROM clients as cl LEFT JOIN orders as o ON cl.id = o.fk_client_id GROUP BY cl.id`;
    	let result = await db.executeSqlQuery(sql, []);
    
    	response.status(200).send({success: true, clients: result});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})


app.post('/orders/create', async (request, response) => {  
	try{;
		let meals = request.body.meals;
		let userId = request.body.userId;
		let address = request.body.address;
		let comment = request.body.comment === undefined ? null : request.body.comment;

		let sqlLastId = "SELECT id FROM orders ORDER BY id DESC LIMIT 1";
		let sqlLastIdResult = await db.executeSqlQuery(sqlLastId, []);
		let orderNumber = sqlLastIdResult[0].id + 1;
		let sqlOrder = `INSERT INTO orders values(
			null, ?, NOW(), null, ?, ?, "Užsakytas kliento", null, null, ?
		)`;
		let orderResult = await db.executeSqlQuery(sqlOrder, [
			`ord${orderNumber}`, address, comment, userId
		]);

		let sqlLastId2 = "SELECT id FROM orders ORDER BY id DESC LIMIT 1";
		let sqlLastIdResult2 = await db.executeSqlQuery(sqlLastId2, []);
		let orderId = sqlLastIdResult2[0].id;

		let orderSum = meals.reduce((sum, val) => sum + val.meal.price, 0.0);
		let sqlCart = `INSERT INTO carts VALUES(null, ?, NOW(), ?)`; console.log(orderSum, orderNumber)
		let resultCart = await db.executeSqlQuery(sqlCart, [orderSum, orderId]);

		let sqlLastCartId = "SELECT id FROM carts ORDER BY id DESC LIMIT 1";
		let sqlLastCartIdResult = await db.executeSqlQuery(sqlLastCartId, []);
		let cartId = sqlLastCartIdResult[0].id;

		for(let i=0; i < meals.length; i++) {
			let m = meals[i];
			let sql = `INSERT INTO cart_meals VALUES(null, ?, ?, ?)`;
			let result = await db.executeSqlQuery(sql, [m.count, cartId, m.meal.id]);
		}

    response.status(200).send({success: true});	
	}	
	catch(e){
		console.log(e)
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})


app.put('/orders/:orderId/update-price', async (request, response) => {
	try{
		let cartPrice = request.body.cartPrice;
		let courierId = request.body.courierId;
		let orderId = request.params.orderId;

		let sqlTax = "SELECT tariff_size FROM delivery_tariffs WHERE fk_courier_id = ?";
		let resultTax = await db.executeSqlQuery(sqlTax, [courierId]);
		let tax = resultTax[0].tariff_size;
		let totalOrderPrice = cartPrice + tax;

		let sql = 'UPDATE ORDERS set price = ? WHERE id = ? ';
		let result = await db.executeSqlQuery(sql, [totalOrderPrice, orderId]);

    	response.status(200).send({success: true});
	}
	catch (e) {
		console.log(e);
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})