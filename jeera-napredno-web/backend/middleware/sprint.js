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
            name: req.body.name,
            project: req.body.project,
            points: req.body.points,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        }
    );

    try {
        const payload = await jwt.verify(req.body.token, process.env.SECRET);
        if(payload.role !== "ADMIN")
            throw new Error("401");
        const savedSprint = await newSprint.save();
        const updatedProject = await Project.updateOne(
            {_id: savedSprint.project},
            {$push: {sprints: savedSprint._id}});
        return res.send(newSprint);
    } catch (err) {
        return next(err)
    }

};

module.exports.getSprints = async function (req, res, next) {
    try {
        const sprints = await Sprint.find({}).populate("tasks");
        return res.send(sprints);
    } catch (err) {
        return next(err)
    }

};

