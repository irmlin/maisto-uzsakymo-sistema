import * as db from "../db.js";


const query = 
`
DROP TABLE IF EXISTS cart_meals;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS meals;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS delivery_tariffs;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS couriers;
DROP TABLE IF EXISTS taxes;
DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS cities;
CREATE TABLE cities
(
  id int NOT NULL AUTO_INCREMENT,
	name varchar (50),
	county varchar (50),
	PRIMARY KEY(id)
);

CREATE TABLE clients
(
  id int NOT NULL AUTO_INCREMENT,
	personal_code varchar (50),
	firstname varchar (50),
	lastname varchar (50),
	birth_date date,
	phone_number varchar (50),
	email varchar (50),
	username varchar (50),
	password varchar (255),
	fk_city_id int,
  FOREIGN KEY (fk_city_id) REFERENCES cities(id),
	PRIMARY KEY(id)
);

CREATE TABLE admins
(
  id int NOT NULL AUTO_INCREMENT,
	firstname varchar (50),
	lastname varchar (50),
	email varchar (50),
	phone_number varchar (50),
	username varchar (50),
	password varchar (255),
	PRIMARY KEY(id)
);

CREATE TABLE taxes
(
  id int NOT NULL AUTO_INCREMENT,
	applied_from date,
	applied_until date,
	tax_size double precision,
	fk_admin_id int,
	PRIMARY KEY(id),
	FOREIGN KEY (fk_admin_id) REFERENCES admins(id)
);

CREATE TABLE couriers
(
  id int NOT NULL AUTO_INCREMENT,
	personal_code varchar (50),
	firstname varchar (50),
	lastname varchar (50),
	birth_date date,
	employed_from date,
	phone_number varchar (50),
	email varchar (50),
	transport ENUM ('Automobilis', 'Dviratis', 'Paspirtukas'),
	username varchar (50),
	password varchar (255),
	approved boolean DEFAULT 0,
	status ENUM ('Atsijungęs', 'Prisijungęs', 'Laukia užsakymo', 'Atlieka užsakymą') DEFAULT 'Atsijungęs',
	fk_admin_id int,
	fk_city_id int,
	PRIMARY KEY(id),
	FOREIGN KEY (fk_admin_id) REFERENCES admins(id),
  FOREIGN KEY (fk_city_id) REFERENCES cities(id)
);

CREATE TABLE restaurants
(
  id int NOT NULL AUTO_INCREMENT,
	name varchar (50),
	address varchar (100),
	opening_time time,
	closing_time time,
	username varchar (50),
	password varchar (255),
	approved boolean DEFAULT 0,
	email varchar (50),
	fk_city_id int,
	fk_admin_id int,
	fk_tax_id int,
	PRIMARY KEY(id),
	FOREIGN KEY (fk_admin_id) REFERENCES admins(id),
  FOREIGN KEY (fk_city_id) REFERENCES cities(id),
  FOREIGN KEY (fk_tax_id) REFERENCES taxes(id)
);

CREATE TABLE delivery_tariffs
(
  id int NOT NULL AUTO_INCREMENT,
	applied_from date,
	applied_until date,
	tariff_size double precision,
	fk_courier_id int,
	fk_admin_id int,
	PRIMARY KEY(id),
  FOREIGN KEY (fk_courier_id) REFERENCES couriers(id),
  FOREIGN KEY (fk_admin_id) REFERENCES admins(id)
);

CREATE TABLE orders
(
  id int NOT NULL AUTO_INCREMENT,
	number varchar (50),
	date datetime,
	price double precision,
	delivery_address varchar (100),
	client_comments varchar (255),
	status ENUM('Sudaromas', 'Apmokėtas', 'Vykdomas', 'Maistas paimtas', 'Užbaigtas', 'Atšauktas') DEFAULT('Sudaromas'),
	fk_courier_id int,
	fk_delivery_tariff_id int,
	fk_client_id int,
  PRIMARY KEY(id),
  FOREIGN KEY (fk_courier_id) REFERENCES couriers(id),
  FOREIGN KEY (fk_delivery_tariff_id) REFERENCES delivery_tariffs(id),
  FOREIGN KEY (fk_client_id) REFERENCES clients(id)
);

CREATE TABLE meals
(
  id int NOT NULL AUTO_INCREMENT,
	name varchar (50),
	price double precision,
	description varchar (255),
	vegetarian boolean,
	fk_restaurant_id int,
	PRIMARY KEY(id),
	FOREIGN KEY (fk_restaurant_id) REFERENCES restaurants(id)
);

CREATE TABLE carts
(
  id int NOT NULL AUTO_INCREMENT,
	sum double precision,
	last_edit_date datetime,
	fk_order_id int,
	PRIMARY KEY(id),
	FOREIGN KEY (fk_order_id) REFERENCES orders(id)
);

CREATE TABLE cart_meals
(
  id int NOT NULL AUTO_INCREMENT,
	amount int,
	fk_cart_id int,
	fk_meal_id int,
	PRIMARY KEY(id),
	FOREIGN KEY (fk_cart_id) REFERENCES carts(id),
  FOREIGN KEY (fk_meal_id) REFERENCES meals(id)
);
`;

const con = await db.createDatabaseConnection();

con.query(query, [], function (err, result) {
  if (err) throw err;
  console.log("Query executed successfully");
});
con.end();
