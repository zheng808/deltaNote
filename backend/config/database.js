const dotenv = require('dotenv');
dotenv.config({ path: './.env'});
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : process.env.HOST,
        user     : process.env.DATABASEUSER,
        database : process.env.DATABASE,
        password : process.env.DATABASE_PASSWORD
    },
    dateStrings: true,
    timezone: 'UTC'
});



module.exports = knex;



