const mongoose = require('mongoose');
const projectSchema = require('../schema/Project');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = mongoose.model('User', require('../schema/User'));
const Task = mongoose.model('Task', require('../schema/Task'));

module.exports.addUser = async function (req, res, next) {

    const newUser =
        {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            level: req.body.level
        };

    try{
        const doc = await User.create(newUser);
        res.send(doc);
    } catch(err) {return next(err);}
};

module.exports.login = async function (req, res, next) {
     try{
         let loginErr = "Incorrect email or password";
         const user = await User.findOne({email: { $eq: req.body.email}});
         if(!user) throw loginErr;
         const compare = await bcrypt.compare(req.body.password, user.password);
         if(!compare) throw loginErr;
         const token = jwt.sign(
             {email:user.email, role: user.role, level: user.level, id: user._id},
             process.env.SECRET,
             {expiresIn:"1d"}

         );
         res.send(token);
     }
     catch(err){return next(new Error("401"))}
};

module.exports.authenticate = async function(req, res, next){
    try {
        const payload = await jwt.verify(req.body.token, process.env.SECRET);
        req.body.authPayload = payload;
        next();
    } catch(err) {return next(new Error("401"))}
};

module.exports.showTasks = async function(req, res, next){
    try{
        if(req.body.user !== req.body.authPayload.id)
            throw {message:"Unauthorized"};
        console.log(req.body);
        const userTasks = await Task.find({user: req.body.user});
        res.send(userTasks);
    }catch(err) {return next(err)}
};

module.exports.showUsers = async function(req, res, next){
    try{
         const users = await User.find({});
         res.send(users);
    }catch(err) {return next(err)}
}

//TODO
module.exports.removeUser = async function (req, res, next) {
};