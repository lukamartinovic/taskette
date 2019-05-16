const mongoose = require('mongoose');
const userSchema = require('../schema/User');
const taskSchema = require('../schema/Task');
const projectSchema = require('../schema/Project');

module.exports.addUser = function (req, res) {
    const User = mongoose.model('User', userSchema);
    const newUser = new User(
        {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            level: req.body.level
        }
    );

    newUser.save(function (err, newUser) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.json(newUser).status(201);
        }
    })
};


//TODO
module.exports.removeUser = function (req,res) {
    const User = mongoose.model('User', userSchema);
    const Task = mongoose.model('Task', taskSchema);
    const Project = mongoose.model('Project', projectSchema);
    User.deleteOne({_id: req.params.id}, function(err, succ) {
        if(err){
            res.status(400).send(err)
        } else {
            Task.deleteMany(
                {user: req.params.id},
                (err) => { if(err) return res.status(400).send(err);}
                );
            Project.updateMany(
                {users: req.params.id},
                { $pull: { users: req.params.id}},
                (err) => { if(err) return res.status(400).send(err);}
            );
            res.status(200).send(succ);
        }
    })
};