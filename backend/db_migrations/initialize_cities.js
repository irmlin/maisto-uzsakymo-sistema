import * as db from "../db.js";

const query = 
`
INSERT INTO CITIES (name, county) VALUES 
("Alytus", "Alytaus"), ("Druskininkai", "Alytaus"), ("Kėdainiai", "Kauno"), ("Raseiniai", "Kauno"), ("Klaipėda", "Klaipėdos"),
("Palanga", "Klaipėdos"), ("Kretinga", "Klaipėdos"), ("Šilutė", "Klaipėdos"), ("Marijampolė", "Marijampolės"), ("Šakiai", "Marijampolės"),
("Panevėžys", "Panevėžio"), ("Biržai", "Panevėžio"), ("Rokiškis", "Panevėžio"), ("Šiauliai", "Šiaulių"), ("Kelmė", "Šiaulių"),
("Radviliškis", "Šiaulių"), ("Tauragė", "Tauragės"), ("Jurbarkas", "Tauragės"), ("Šilalė", "Tauragės"), ("Telšiai", "Telšių"),
("Mažeikiai", "Telšių"), ("Rietavas", "Telšių"), ("Utena", "Utenos"), ("Ignalina", "Utenos"), ("Zarasai", "Utenos"), ("Vilnius", "Vilniaus"),
("Elektrėnai", "Vilniaus"), ("Trakai", "Vilniaus");
`;

const con = await db.createDatabaseConnection();

con.query(query, [], function (err, result) {
  if (err) throw err;
  console.log("Query executed successfully");
});
con.end();