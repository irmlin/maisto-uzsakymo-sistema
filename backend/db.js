import mysql from 'mysql2/promise'

export async function createSqlConnection() {
    const db_con = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: 'root'
    });
    
    await db_con.connect((err) => {
        if (err) {
            console.log("MySQL connection failed: ", err);
        } else {
        console.log("Connected to MySQL");
        }
    });
    
    return db_con
}

export async function executeSqlQuery (sql, data) {
    try {
        const conn = await createDatabaseConnection();
        let [rows, fields] = await conn.execute(sql, data);

        conn.end();

        return rows;
    }
    catch(e) {
        // throw up
        throw e;
    }
}

export async function createDatabaseConnection () {
    try {
        const conn = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
		    database: "food",
            multipleStatements: true,
		    // port: process.env.DB_PORT,
            // dateStrings: true
        });    

        return conn;
    }
    catch(e) {
        console.log(e);
    }
}