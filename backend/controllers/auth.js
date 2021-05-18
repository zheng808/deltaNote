const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sha1 = require('sha1');
const db = require('../config/database');


exports.login = async (req, res) =>{
    try{
        var userName = req.body.username;
        var password = req.body.password;
        if(!userName || !password){
            return res.status(400).render('/', {
                message: "please provide email or password"
            })
        }
    db.query('Select * from sf_guard_user where username = ?', userName, async (error, results) =>{
        const salt = results[0].salt;
        password = salt + password; 
        const hashed_password = sha1(password);
        if(!results || !(hashed_password == results[0].password)){
            return res.status(401).json({
                message: "Please provide correct username or password"
            })
        }else{
            //login succesfully
            const id = results[0].id;
            //create a token
            const token = jwt.sign({id: id}, process.env.JWT_SCRECT, {
              expiresIn: process.env.JWT_EXPIRES_IN
            });
            console.log("token is created " + token);
            const cookieOptions = {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie('jwt', token, cookieOptions);
            res.send({token: token});
        }
    });
    }catch(error){
        console.log(error);
    }
};

exports.register = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;

    db.query("select email from user where email = ?", email, async (error, results) =>{
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            return res.render("register", {
                message: "Email is already in use"
            })
        }else if(password!=confirm_password){
            return res.render("register", {
                message: "Password is not matched"
            });
        }
        //hash password
        let hashed_password = await bcrypt.hash(password, 8);
        console.log(hashed_password);

        //insert user now
        db.query("Insert into user Set ?", {name:name, email:email, password:hashed_password}, (error, results)=>{
            if(error){
                console.log(error)
            }else{
                console.log(results);
                res.status(200).redirect("/");
                return res.render("register", {
                    message: "User Register"
                })
            }
        });

    });
    
};


