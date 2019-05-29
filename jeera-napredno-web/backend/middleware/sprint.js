const mongoose = require('mongoose');
const sprintSchema = require('../schema/Sprint');
const userSchema = require('../schema/User');
const projectSchema = require('../schema/Project');


module.exports.addSprint = async function (req, res, next) {
    const Sprint = mongoose.model('Sprint', sprintSchema);
    const Project = mongoose.model('Project', projectSchema);
    const newSprint = new Sprint(
        {
            project: req.body.project,
            points: req.body.points,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        }
    );

    try{
    await newSprint.save();
    Project.updateOne( { _id: req.body.project }, { $push: { sprints: newSprint._id }})
    return res.send(newSprint);
    } catch(err){
        return next(err)
    }

};