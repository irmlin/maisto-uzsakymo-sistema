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
	
		const validationResult = await ExistEmailOrUsernameDuplicates('clients', email, username);
		if (validationResult.existDuplicates) {
			response.status(400).send({message: validationResult.message, success: false});
		} else {
			let sql = `INSERT INTO clients (personal_code, firstname, lastname, birth_date,
				phone_number, email, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
			let data = [personalCode, firstName, lastName, birthDate, phoneNumber, email, username, password];
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
		let firstname = request.body.firstname;
		let lastname = request.body.lastname;
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

		let sql = `SELECT COUNT(id) AS found, id, username, email, password FROM ${tableName} WHERE email = ? OR username = ?`;
		let result = await db.executeSqlQuery(sql, [emailOrUsername, emailOrUsername]);

		// check if user exists
		if(result[0].found == 1)
		{
			// confirm password
			if (result[0].password === password) {

				// if courier, change status to 'logged in'
				if (role === ROLES.COURIER.ROLENAME) {
					let sqlUpdateStatus = "UPDATE couriers SET status = ? WHERE id = ?";
					let updateResult = await db.executeSqlQuery(sqlUpdateStatus, [COURIER_STATES.WAITING_FOR_ORDER, result[0].id]);
				}
				response.status(200).send({success: true, email: result[0].email, role: role, username: result[0].username, id: result[0].id});	
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