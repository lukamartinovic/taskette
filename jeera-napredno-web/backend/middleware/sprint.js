const mongoose = require('mongoose');
const sprintSchema = require('../schema/Sprint');
const userSchema = require('../schema/User');
const projectSchema = require('../schema/Project');
const Sprint = mongoose.model('Sprint', sprintSchema);
const Project = mongoose.model('Project', projectSchema);
const jwt = require('jsonwebtoken');

module.exports.addSprint = async function (req, res, next) {
    const newSprint = new Sprint(
        {
            project: req.body.project,
            points: req.body.points,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        }
    );

    try {
        console.log(newSprint)
        const payload = await jwt.verify(req.body.token, process.env.SECRET);
        if(payload.role !== "ADMIN")
            throw new Error("401");
        await newSprint.save();
        Project.updateOne({_id: req.body.project}, {$push: {sprints: newSprint._id}});
        return res.send(newSprint);
    } catch (err) {
        return next(err)
    }

};