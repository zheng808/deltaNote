const jwt = require("jsonwebtoken");
const sha1 = require('sha1');
const knex = require('../config/database');


exports.login = async (req, res) =>{
    try{
        var userName = req.body.user;
        var password = req.body.password;
        if(!userName || !password){
            return res.status(400).render('/', {
                message: "please provide email or password"
            })
        }
    knex('sf_guard_user').where('username', userName).then((response) =>{
        const salt = response[0].salt;
        password = salt + password; 
        const hashed_password = sha1(password);
        if(!response || !(hashed_password == response[0].password)){
            return res.status(401).json({
                message: "Please provide correct username or password"
            })
        }else{
            //login succesfully
            const id = response[0].id;
            //create a token
            const token = jwt.sign({id: id}, process.env.JWT_SCRECT, {
              expiresIn: process.env.JWT_EXPIRES_IN
            });
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


