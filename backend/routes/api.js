const express = require('express');

const router = express.Router();
const workorderController = require('../controllers/workorder');
const taskController = require('../controllers/task');
//routing the post command to controller
router.get("/workorder", workorderController.workorder);

router.post("/task/:id", taskController.tasks);

module.exports = router;