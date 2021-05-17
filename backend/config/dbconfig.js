module.exports = {
     dbServer : {
        host     : process.env.HOST,
        user     : process.env.DATABASEUSER,
        database : process.env.DATABASE,
        password : process.env.DATABASE_PASSWORD,
        port : 3306
    },

     tunnelConfig : {
        host: process.env.DB_SSH_HOST,
        port: 22,
        username: process.env.DB_SSH_USER,
        password: process.env.DB_SSH_PASSWORD
    },

    localhost: '127.0.0.1'
}