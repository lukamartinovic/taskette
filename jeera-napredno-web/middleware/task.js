const mongoose = require('mongoose');
const taskSchema = require('../schema/Task');
const userSchema = require('../schema/User');
const sprintSchema = require('../schema/Sprint');

module.exports.addTask = function (req, res) {
    const Task = mongoose.model('Task', taskSchema);
    const User = mongoose.model('User', userSchema);
    const Sprint = mongoose.model('Sprint', sprintSchema);

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
            User.updateOne(
                { _id: newTask.user },
                { $push: { tasks: newTask._id } },
                function(err, user){
                    if(err) res.status(400).send(err);
                });
            Sprint.updateOne(
                { _id: newTask.sprint },
                { $push: { tasks: newTask._id } },
                function(err, sprint){
                    if(err) {
                        res.status(400).send(err);
                    } else {
                        res.status(200).send(newTask);
                    }

            }
            )

        }
    });
};

module.exports.removeTask = function (req, res) {
    const Task = mongoose.model('Task', taskSchema);
    const User = mongoose.model('User', userSchema);
    const Sprint = mongoose.model('Sprint', sprintSchema);

    Task.deleteOne(
        {_id: req.params.id},
        function (err) {
            if(err) {
                res.status(400).send(err)
            } else {
                User.updateOne(
                    { tasks: req.params.id },
                    { $pull: { tasks: req.params.id}},
                    function (err) {
                        if(err){
                            res.status(400).send(err)
                        }
                    });
                Sprint.updateOne(
                    { tasks: req.params.id },
                    { $pull: { tasks: req.params.id }},
                    function (err, succ) {
                        if(err){
                            res.status(400).send(err);
                        } else {
                            res.status(200).send(succ);
                        }
                    }
                )
            }

        }
    )

};