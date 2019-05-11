const mongoose = require('mongoose');
const taskSchema = require('../schema/Task');
const userSchema = require('../schema/User');
const companySchema = require('../schema/Company');
const projectSchema = require('../schema/Project');

module.exports.addProject = function (req, res) {
    const Project = mongoose.model('Project', projectSchema);

    const newProject = new Project(
        {
            name: req.body.name,
            description: req.body.description,
            company: req.body.company,
            users: req.body.users
        }
    );

    newProject.save(function (err, newProject) {
        if (err) {
            return res.status(400).send(err);
        } else {
            res.status(200).send(newProject);
        }
    });
};


module.exports.addUserToProject = function (req, res) {
    const User = mongoose.model('User', userSchema);
    const Project = mongoose.model('Project', projectSchema)
};