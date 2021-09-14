const mysql = require('mysql2/promise');
const path = require('path');

require('dotenv').config({
    path: path.join(__dirname, '../.env.test'),
});

const {DB_PASSWORD, DB_NAME, DB_HOST, DB_USER, DB_PORT} = process.env;
const dropDatabase = async () => {
    try {
       const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            port: DB_PORT,
            password: DB_PASSWORD,
        });
        console.log(DB_NAME)
        await connection.query(`DROP DATABASE ${DB_NAME}`);
        connection.end()
    }
    catch(err) {
        console.log(err)
    }
    
}

module.exports = dropDatabase


