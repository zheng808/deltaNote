const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();


const router = express.Router();
const workorderController = require('../controllers/workorder');
const taskController = require('../controllers/task');

const noteController = require('../controllers/notes');

router.use(fileUpload());
//routing the post command to controller
router.get("/workorder", workorderController.workorder);

router.post("/task/:id", taskController.tasks);

router.post("/notes/uploadImage", noteController.uploadImage);
router.post("/notes/saveNotes", noteController.saveNotes);
router.post("/notes/:id", noteController.getNotes);


module.exports = router;