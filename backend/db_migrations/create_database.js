import createSqlConnection from "../db.js";

const con = createSqlConnection();
con.query("CREATE DATABASE food", function (err, result) {
  if (err) throw err;
  console.log("Database created");
});
con.end();