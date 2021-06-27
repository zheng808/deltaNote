const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');

//routing the post command to controller
router.post("/login", authController.login);

module.exports = router;