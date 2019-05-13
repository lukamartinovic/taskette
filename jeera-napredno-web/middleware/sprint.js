const mongoose = require('mongoose');
const sprintSchema = require('../schema/Sprint');
const userSchema = require('../schema/User');

module.exports.addSprint = function (req, res) {
    const Sprint = mongoose.model('Sprint', sprintSchema);

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
            res.status(200).send(newSprint);
        }
    });
};