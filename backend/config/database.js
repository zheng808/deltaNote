const dotenv = require('dotenv');
dotenv.config({ path: './.env'});

const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.DATABASEUSER,
    database : process.env.DATABASE,
    password : process.env.DATABASE_PASSWORD
});
module.exports = connection;



