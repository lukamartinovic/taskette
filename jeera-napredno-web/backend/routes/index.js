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

router.get('/users', user.authenticate, user.showUsers, errorHandler);

router.post('/user/add', user.addUser, errorHandler);
router.post('/user/getUsers', user.authenticate, user.getUsersById, errorHandler);
router.delete('/user/:id/', user.removeUser, errorHandler);
router.post('/user/login', user.login, errorHandler);
router.post('/user/authenticate', user.authenticate, errorHandler);
router.post('/user/tasks', user.authenticate, user.showTasks, errorHandler);
router.post('/user/getid', user.getId, errorHandler);
router.post('/user/validateToken', user.validateToken, errorHandler);
router.get('/user/search', user.authenticate, user.searchUsers, errorHandler);
router.post('/user/getEmployees', user.authenticate, user.getSubEmployees, errorHandler)

router.post('/task/add', user.authenticate, task.addTask, errorHandler);
router.delete('/task/:id/', task.removeTask, errorHandler);
router.post('/task/edit', user.authenticate, task.editTask, errorHandler);
router.post('/task/changeStatus', user.authenticate, task.changeTaskStatus, errorHandler)

router.get('/project/:_id', user.authenticate, project.getProject, errorHandler);
router.post('/project/add', project.addProject, errorHandler);
router.get('/projects', user.authenticate, project.getProjects, errorHandler);
router.post('/project/editUsers', project.editProjectUsers, errorHandler);
router.post('/project/:id/addSprint', project.addSprint, errorHandler);


router.post('/sprint/add', sprint.addSprint, errorHandler);
router.post('/sprints', sprint.getSprints, errorHandler);

router.post('/company/add', company.addCompany, errorHandler);

module.exports = router;
