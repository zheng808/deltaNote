const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');

const router = express.Router();

router.get("/", (req,res) => {
    res.render("index");
});

router.get("/register", (req,res) => {
    res.render("register");
});

router.get("/workorder", (req,res) => {
    const data = [{
        "id" : 1,
        "name" : "maintainence",
        "customer" : "Alex"
    }];
    res.end(JSON.stringify(data));
});


module.exports = router;