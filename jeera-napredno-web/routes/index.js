var express = require('express');
var router = express.Router();
const user = require('../middleware/user');
const task = require('../middleware/task');
const project = require('../middleware/project');
const sprint = require('../middleware/sprint');
const errorHandler = require('../middleware/errorHandler').errorHandler;

router.get('/', function (req, res) {
    res.send("Express running")
});

router.post('/user/add', user.addUser);
router.delete('/user/:id/', user.removeUser);


router.post('/task/add', task.addTask, errorHandler);
router.delete('/task/:id/', task.removeTask);
router.post('/task/edit', task.editTask);

router.post('/project/add', project.addProject);
router.post('/project/:id/addUser', project.addUser);
router.post('/project/:id/addSprint', project.addSprint);


router.post('/sprint/add', sprint.addSprint);


module.exports = router;
