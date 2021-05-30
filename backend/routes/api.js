const express = require('express');

const router = express.Router();
const workorderController = require('../controllers/workorder');
const taskController = require('../controllers/task');

const noteController = require('../controllers/notes');
//routing the post command to controller
router.get("/workorder", workorderController.workorder);

router.post("/task/:id", taskController.tasks);

router.post("/notes/saveNotes", noteController.saveNotes);
router.post("/notes/:id", noteController.getNotes);



module.exports = router;