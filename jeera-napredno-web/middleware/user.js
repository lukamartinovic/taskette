const mongoose = require('mongoose');
const userSchema = require('../schema/User');
const taskSchema = require('../schema/Task');
const projectSchema = require('../schema/Project');
const User = mongoose.model('User', userSchema);

module.exports.addUser = function (req, res, next) {
    const newUser = new User(
        {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            level: req.body.level
        }
    );

    newUser.save
        .then((doc) => {return res.send(doc)})
        .catch((err) => {return next(err)})
};


//TODO
module.exports.removeUser = async function (req, res, next) {

    const Task = mongoose.model('Task', taskSchema);
    const Project = mongoose.model('Project', projectSchema);



};