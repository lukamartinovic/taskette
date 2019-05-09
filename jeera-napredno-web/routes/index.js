var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const userSchema = require('../schema/User');



/* GET home page. */
router.get('/', function(req,res) {
  res.send("Express running")
});

router.post('/user/add', function(req,res){

  const User = mongoose.model('User', userSchema);
  const newUser = new User(
      {
        email: req.body.email,
        password: req.body.password
      }
      );

  console.log(req.body);

  newUser.save(function (err, newUser){
    if(err){
      res.send(err)
    }
    else{
      res.json(newUser).status(201);
    }
  })
});

module.exports = router;
