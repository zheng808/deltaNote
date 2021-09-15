const express = require("express");
const path = require("path");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
require('dotenv').config();
var app = express();
const SSHConnection = require('./config/database');
const cors = require('cors');

//parse data
app.use(express.urlencoded({extended: false}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());



//define routes
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));
app.set('view engine', 'hbs');
const publicDir = path.join(__dirname, './public');
const img = path.join(__dirname, './img');
app.use(express.static(publicDir));
app.use(express.static(img));
app.use(cookieParser);

// app.use(express.static(path.join(__dirname, 'build')));
// console.log(path.join(__dirname, 'build', 'index.html'));
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use(cors());

const PORT = 4000;
app.listen(PORT, ()=>{
    console.log(`server is running on port ` + PORT);
});