const mongoose = require('mongoose');
const sprintSchema = require('../schema/Sprint');
const userSchema = require('../schema/User');
const projectSchema = require('../schema/Project');


module.exports.addSprint = function (req, res) {
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

    newSprint.save(function (err, newSprint) {
        if (err) {
            return res.status(400).send(err);
        } else {
            Project.updateOne(
                { _id: req.body.project },
                { $push: { sprints: newSprint._id }},
                function (err, project) {
                    if(err) {
                        return res.status(400).send(err);
                    } else {
                        res.status(200).send(newSprint);
                    }
                }
            );

        }
    });
};