const mongoose = require('mongoose');
const taskSchema = require('../schema/Task');
const userSchema = require('../schema/User');

module.exports.addTask = function (req, res) {
    const Task = mongoose.model('Task', taskSchema);
    const User = mongoose.model('User', userSchema);

    const newTask = new Task(
        {
            name: req.body.name,
            description: req.body.description,
            points: req.body.points,
            user: req.body.user,
            sprint: req.body.sprint
        }
    );

    newTask.save(function (err, newTask) {
        if (err) {
            return res.status(400).send(err);
        } else {
            User.update(
                { _id: newTask.user },
                { $push: { tasks: newTask._id } },
                function(err, user){
                    if(err) res.status(400).send(err);
                    else res.status(200).send(newTask);
                });
        }
    });






};