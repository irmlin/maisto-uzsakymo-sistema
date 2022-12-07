import express from 'express';
import http from 'http';
import * as db from './db.js'
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: true
}));

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(express.json({type: '*/*'}));

http.createServer(app).listen(3000, () => {
    console.log("server is runing at port 3000");
});

app.post('/register-courier', express.json({type: '*/*'}), async (request, response) => {  
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
	
		let sql = `INSERT INTO couriers (personal_code, firstname, lastname, birth_date,
      phone_number, email, transport, username, password, fk_city_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
		let data = [personalCode, firstName, lastName, birthDate, phoneNumber, email, transport, username, password, cityId];
		await db.executeSqlQuery(sql, data);
    response.status(201).send({message: "Kurjeris sėkmingai sukurtas", success: true});	
	}	
	catch(e){
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.post('/register-client', express.json({type: '*/*'}), async (request, response) => {  
	try{
		let firstName = request.body.firstName;
		let lastName = request.body.lastName;
		let email = request.body.email;
		let username = request.body.username;
		let password = request.body.password;
    let personalCode = request.body.personalCode;
    let birthDate = request.body.birthDate;
    let phoneNumber = request.body.phoneNumber;
	
		let sql = `INSERT INTO clients (personal_code, firstname, lastname, birth_date,
      phone_number, email, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
		let data = [personalCode, firstName, lastName, birthDate, phoneNumber, email, username, password];
		await db.executeSqlQuery(sql, data);
    response.status(201).send({message: "Klientas sėkmingai sukurtas", success: true});	
	}	
	catch(e){
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.post('/register-restaurant', express.json({type: '*/*'}), async (request, response) => {  
	try{
		let email = request.body.email;
		let username = request.body.username;
		let password = request.body.password;
		let restaurantName = request.body.restaurantName;
		let cityId = request.body.cityId;
    let address = request.body.address;
    let openingTime = request.body.openingTime;
    let closingTime = request.body.closingTime;
	
		let sql = `INSERT INTO restaurants (email, username, password, name,
      fk_city_id, address, opening_time, closing_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
		let data = [email, username, password, restaurantName, cityId, address, openingTime, closingTime];
		await db.executeSqlQuery(sql, data);
    response.status(201).send({message: "Restoranas sėkmingai sukurtas", success: true});	
	}	
	catch(e){
		response.status(400).send({message: e.sqlMessage, success: false});
	}
})

app.post('/register-admin', express.json({type: '*/*'}), async (request, response) => {  
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