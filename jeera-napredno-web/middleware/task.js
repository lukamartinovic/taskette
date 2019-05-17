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
                { $push: { tasks: newTask._id }, $inc: {currentPoints: +newTask.points}  },
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

module.exports.removeTask = async function (req, res) {
    const Task = mongoose.model('Task', taskSchema);
    const User = mongoose.model('User', userSchema);
    const Sprint = mongoose.model('Sprint', sprintSchema);

    try{
        const DelTask = await Task.findById(req.params.id);
        if(!DelTask)
            return res.status(404).send("Task not found");
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
                        { $pull: { tasks: req.params.id },
                            $inc: { currentPoints: -DelTask.points}},
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
    }
    catch(error){
        return res.status(400).send(error)
    }
};

module.exports.editTask = async function editTask(req, res){
    const Task = mongoose.model('Task', taskSchema);

    try {
        const task = await Task.findById(req.body.id);
        if(!task)
            return res.status(404).end();
        console.log(task);
        task.description = req.body.description || task.description;
        task.name = req.body.name || task.name;
        await task.save();
        res.send(task);
    }
    catch(err){
        res.status(400).send(err);
    }

};
