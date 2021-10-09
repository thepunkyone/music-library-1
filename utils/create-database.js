//require promise version of mysql2
const mysql = require('mysql2/promise');
// require path to handle file paths
const path = require('path');
// extract any command line arguments from argv
const args = process.argv.slice(2)[0];
// use args to determine if .env or .env.test should be loaded
const envFile = args === 'test' ? '../.env.test' : '../.env';
// load environment variables from env files
require('dotenv').config({
    path: path.join(__dirname, envFile)
});
// destructure environment variables from process.env 
// eslint-disable-next-line no-undef
const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT,CLEAR_DATABASE_URL } = process.env;
// This asyncronous function will run before app
const setUpDatabase = async () => {
    try {
        // connect to the database
        const db = CLEAR_DATABASE_URL ?
        await mysql.createConnection(CLEAR_DATABASE_URL) :
        await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            port: DB_PORT,
        })
        // create the database if it doesn't already exist
        !CLEAR_DATABASE_URL && await db.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
        !CLEAR_DATABASE_URL && await db.query(`USE ${DB_NAME}`);
        await db.query(`CREATE TABLE IF NOT EXISTS Artist (
            id INT PRIMARY KEY auto_increment,
            name VARCHAR(25),
            genre VARCHAR(25)
        )`);
        await db.query(`CREATE TABLE IF NOT EXISTS Album(
            id INT PRIMARY KEY auto_increment,
            name VARCHAR(25),
            year INT,
            Artistid INT,
            FOREIGN KEY (Artistid) REFERENCES Artist(id)
            
        )`);
        db.close()
    }
    catch (err) {
         // if something goes wrong, console.log the error and the current environment variables
        console.log(`Your environment variable might be wrong. Please double check .env file`);
        console.log('Environment Variables are:', {
            DB_PASSWORD,
            DB_NAME,
            DB_USER,
            DB_HOST,
            DB_PORT,
        });
        console.log(err);
    }
};

setUpDatabase();