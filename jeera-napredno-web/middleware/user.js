const mongoose = require('mongoose');
const userSchema = require('../schema/User');
const taskSchema = require('../schema/Task');
const projectSchema = require('../schema/Project');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = mongoose.model('User', userSchema);

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
             {email:user.email, role: user.role, level: user.level},
             process.env.SECRET,
             {expiresIn:"1d"}

         );
         res.send(token);
     }
     catch(err){return next(err)}
};

module.exports.authenticate = async function(req, res, next){
    try {
        await jwt.verify(req.body.token, process.env.SECRET);
        next();
    } catch(err) {return next(err)};
};


//TODO
module.exports.removeUser = async function (req, res, next) {

    const Task = mongoose.model('Task', taskSchema);
    const Project = mongoose.model('Project', projectSchema);



};