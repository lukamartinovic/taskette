var express = require('express');
var router = express.Router();
const user = require('../middleware/user');
const task = require('../middleware/task');
const project = require('../middleware/project');
/* GET home page. */
router.get('/', function (req, res) {
    res.send("Express running")
});

router.post('/user/add', user.addUser);
router.post('/task/add', task.addTask);
router.post('/project/add', project.addProject);

module.exports = router;
