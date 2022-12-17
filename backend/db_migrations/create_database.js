import * as db from "../db.js";

let sql = "CREATE DATABASE food";
let data = [];

db.executeSqlQuery(sql, data);