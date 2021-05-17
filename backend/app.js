const express = require("express");
const path = require("path");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
require('dotenv').config();
var app = express();
const SSHConnection = require('./config/database');


//parse data
app.use(express.urlencoded({extended: false}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());



//set hbs view engine
app.set('view engine', 'hbs');

//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

const publicDir = path.join(__dirname, './public');
const img = path.join(__dirname, './img');
app.use(express.static(publicDir));
app.use(express.static(img));
app.use(cookieParser);

const PORT = 4000;
app.listen(PORT, ()=>{
    console.log(`server is running on port ` + PORT);
});