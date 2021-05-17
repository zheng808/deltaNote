const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = mysql.createConnection({ 
    host: process.env.HOST,
    database:process.env.DATABASE,
    user: process.env.DATABASEUSER,
    password: process.env.DATABASE_PASSWORD
});

exports.login = async (req, res) =>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        console.log(email);
        if(!email || !password){
            return res.status(400).render('login', {
                message: "please provide email or password"
            })
        }
    db.query('Select * from user where email = ?', email, async (error, results) =>{
        console.log(results);
        if(!results || !(await bcrypt.compare(password, results[0].password))){
            return res.status(401).render('login', {
                message: "Please provide correct username or password"
            })
        }else{
            //login succesfully
            const id = results.iduser;
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
            res.status(200).redirect("/workorder");
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


