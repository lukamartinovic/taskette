const mongoose = require('mongoose');
const projectSchema = require('../schema/Project');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = mongoose.model('User', require('../schema/User'));
const Task = mongoose.model('Task', require('../schema/Task'));

module.exports.getSubEmployees = async function (req, res, next) {
    try{
        const {token, searchString, n} = req.body;
        const payload = await jwt.verify(token, process.env.SECRET);
        if (payload.role !== "MANAGER")
            throw new Error("401");
        const users = await User.find({
            $or: [{role: "EMPLOYEE"}, {$and:[{role:"MANAGER"}, {level: { $gt: payload.level}}]}]
        });
        res.send(users);
    }catch(err) {return next(err)}
};

module.exports.addUser = async function (req, res, next) {

    const newUser =
        {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            role: req.body.role,
            level: req.body.level
        };

    try{
        const doc = await User.create(newUser);
        res.send(doc);
    } catch(err) {return next(err);}
};

module.exports.getUsersById = async function (req, res, next){
    try{
        const users = await User.find({_id: req.params._ids});
        users.forEach(user => delete user.password);
        res.send(users);
        }
    catch(err){return next(err)
    }
};

module.exports.login = async function (req, res, next) {
     try{
         let loginErr = "Incorrect email or password";
         const user = await User.findOne({email: { $eq: req.body.email}});
         if(!user) throw loginErr;
         const compare = await bcrypt.compare(req.body.password, user.password);
         if(!compare) throw loginErr;
         const token = jwt.sign(
             {email:user.email, role: user.role, level: user.level, _id: user._id, firstName: user.firstName},
             process.env.SECRET,
             {expiresIn:"1d"}

         );
         res.send({token, level: user.level, email: user.email, _id: user._id, role: user.role, firstName: user.firstName});
     }
     catch(err){return next(new Error("401"))}
};

module.exports.authenticate = async function(req, res, next){
    try {
        const payload = await jwt.verify(req.body.token || req.headers.authorization, process.env.SECRET);
        req.body.authPayload = payload;
        next();
    } catch(err) {return next(new Error("401"))}
};

module.exports.validateToken = async function(req, res, next){
    try {
        const payload = await jwt.verify(req.body.token, process.env.SECRET);
        res.send(payload);
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
        const {page, pageSize} = req.query;
        const token = req.headers.authorization;
        const payload = await jwt.verify(token, process.env.SECRET);
        if (payload.role !== "ADMIN")
            throw {message:"Unauthorized"};
         const [users, count] = await Promise.all([
                 User.find({}).skip(pageSize*(page-1)).limit(pageSize),
                 User.countDocuments()
         ]);
         console.log(users);
         res.send({users, count});
    }catch(err) {return next(err)}
};

module.exports.showUsers = async function(req, res, next){

    try{
        const {page, pageSize} = req.body;
        if (req.body.authPayload.role !== "ADMIN")
            throw {message:"Unauthorized"};
        const [users, count] = await Promise.all([
            User.find({}).skip(pageSize*(page-1)).limit(pageSize),
            User.countDocuments()
        ]);
        res.send({users, count});
    }catch(err) {return next(err)}
};

module.exports.searchUsers = async function(req, res, next){
    try{
        const {searchString, n} = req.query;
        if (req.body.authPayload.role !== "ADMIN")
            throw {message:"Unauthorized"};
        const users = await User.find({"email": {$regex: `.*${searchString}.*`}}).limit(parseInt(n));
        res.send(users);
    }catch(err) {return next(err)}
};

module.exports.getId = async function(req, res, next){
  try{
      const user = await User.findOne({email: req.body.email});
      res.send(user._id)
  }  catch(err) {return next(err)}
};

//TODO
module.exports.removeUser = async function (req, res, next) {
};