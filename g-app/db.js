const mysql = require('mysql2')
require('dotenv').config();

const pool = mysql.createPool({
	host : process.env.DB_HOST,
	user : process.env.DB_USER,
	password : process.env.DB_PASS,
	database : process.env.DB_NAME,
	debug : false,
	connectionLimit : 10
});

const connectToDb = () => {
	pool.getConnection((err,connection) => {
		err ? console.log(err.stack) : console.log(`Connected to database ${process.env.DB_NAME}`);
	});
}

exports.pool = pool
exports.connectToDb = connectToDb