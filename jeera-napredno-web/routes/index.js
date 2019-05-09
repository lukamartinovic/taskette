var express = require('express');
var router = express.Router();
const user = require('../middleware/user');

/* GET home page. */
router.get('/', function (req, res) {
    res.send("Express running")
});

router.post('/user/add', user.addUser);

module.exports = router;
