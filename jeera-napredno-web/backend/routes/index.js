var express = require('express');
var router = express.Router();
const user = require('../middleware/user');
const task = require('../middleware/task');
const project = require('../middleware/project');
const sprint = require('../middleware/sprint');
const errorHandler = require('../middleware/errorHandler').errorHandler;
const company = require('../middleware/company');

router.get('/', function (req, res) {
    res.send("Express running")
});

router.post('/users', user.authenticate, user.showUsers, errorHandler);

router.post('/user/add', user.authenticate, user.addUser, errorHandler);
router.delete('/user/:id/', user.removeUser, errorHandler);
router.post('/user/login', user.login, errorHandler);
router.post('/user/authenticate', user.authenticate, errorHandler);
router.post('/user/tasks', user.authenticate, user.showTasks, errorHandler);
router.post('/user/getid', user.getId, errorHandler);
router.post('/user/validateToken', user.validateToken, errorHandler);

router.post('/task/add', task.addTask, errorHandler);
router.delete('/task/:id/', task.removeTask, errorHandler);
router.post('/task/edit', task.editTask, errorHandler);
router.post('/task/changeStatus', user.authenticate, task.changeTaskStatus, errorHandler)

router.post('/project/add', project.addProject, errorHandler);
router.post('/project/:id/addUser', project.addUser, errorHandler);
router.post('/project/:id/addSprint', project.addSprint, errorHandler);


router.post('/sprint/add', sprint.addSprint, errorHandler);

router.post('/company/add', company.addCompany, errorHandler);

module.exports = router;
