const mongoose = require('mongoose');
const taskSchema = require('../schema/Task');
const userSchema = require('../schema/User');
const sprintSchema = require('../schema/Sprint');

module.exports.addTask = async function (req, res, next) {
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

    try {
        const task = await newTask.save();
        const updateUser = User.updateOne({_id: newTask.user}, {$push: {tasks: task._id}});
        const updateSprint = Sprint.updateOne(
            {_id: newTask.sprint},
            {$push: {tasks: task._id}, $inc: {currentPoints: +newTask.points}});

        Promise.all([updateUser, updateSprint]).then((result) => {
            res.send(result);
        })
    } catch(err) {
        return next(err);
    }
};

module.exports.removeTask = async function(req, res, next) {
    const Task = mongoose.model('Task', taskSchema);
    const User = mongoose.model('User', userSchema);
    const Sprint = mongoose.model('Sprint', sprintSchema);

    try{
        const TaskToDelete = await Task.findById(req.params.id);

        const deleteTask = Task.deleteOne({_id: req.params.id});
        const updateUser = User.updateOne(
            { tasks: req.params.id },
            { $pull: { tasks: req.params.id}});
        const updateSprint = Sprint.updateOne(
            { tasks: req.params.id },
            { $pull: { tasks: req.params.id },
                $inc: { currentPoints: -TaskToDelete.points}});
        Promise.all([deleteTask, updateUser, updateSprint]).then(
            (result) => { res.send(result)}
        )
    } catch(error){
        return next(err);
    }
};

module.exports.editTask = async function editTask(req, res, next){
    const Task = mongoose.model('Task', taskSchema);

    try {
        const task = await Task.findById(req.body.id);
        if(!task)
            return res.status(404).end();

        task.description = req.body.description || task.description;
        task.name = req.body.name || task.name;

        await task.save();
        res.send(task);
    }
    catch(err){
        return next(err);
    }

};
