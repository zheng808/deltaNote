const dotenv = require('dotenv');
dotenv.config({ path: './.env'});

const mysql = require('mysql2');
const { Client } = require('ssh2');
var config = require('./dbconfig');

// create an instance of SSH Client


const dbServer = {
    host     : process.env.HOST,
    user     : process.env.DATABASEUSER,
    database : process.env.DATABASE,
    password : process.env.DATABASE_PASSWORD,
    port : 3306
}

const tunnelConfig = {
    host: process.env.DB_SSH_HOST,
    port: 22,
    username: process.env.DB_SSH_USER,
    password: process.env.DB_SSH_PASSWORD
}

const forwardConfig = {
    srcHost: '127.0.0.1', // any valid address
    srcPort: 3306, // any valid port
    dstHost: dbServer.host, // destination database
    dstPort: dbServer.port // destination port
};

var connection = module.exports = function(){};

createDBConnection = ()=>{
    var mysqlConnection = mysql.createConnection({
        host     : process.env.HOST,
        user     : process.env.DATABASEUSER,
        database : process.env.DATABASE,
        password : process.env.DATABASE_PASSWORD
    });
    return mysqlConnection;
};



//module.exports = SSHConnection;
/*
module.exports = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.DATABASEUSER,
    database : process.env.DATABASE,
    password : process.env.DATABASE_PASSWORD,
});
*/


