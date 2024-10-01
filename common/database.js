const mysql = require('mysql2');

const databaseConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    // dateString: 'date'
}

const connection = mysql.createPool(databaseConfig);

console.log('database connection success')
module.exports = connection;