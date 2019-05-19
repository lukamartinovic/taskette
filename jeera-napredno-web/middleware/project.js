const mongoose = require('mongoose');
const taskSchema = require('../schema/Task');
const userSchema = require('../schema/User');
const companySchema = require('../schema/Company');
const projectSchema = require('../schema/Project');

const Schema = mongoose.Schema;

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

module.exports.addUser = function (req, res) {
    const Project = mongoose.model('Project', projectSchema);

    Project.updateOne(
        { _id: req.params.id },
        { $addToSet: { users: { $each: req.body.users } }},
        function(err, project){
            if(err) {
                return res.status(400).send(err);
            } else {
                res.status(200).send(project);
            }
        })

};

module.exports.addSprint = function (req, res) {
    const Project = mongoose.model('Project', projectSchema);

    Project.updateOne(
        { _id: req.params.id },
        { $addToSet: { sprints: { $each: req.body.sprints }}},
        function (err, project) {
            if(err) {
                return res.status(400).send(err);
            } else {
                res.status(200).send(project);
            }
        }
    )

};

module.exports.removeProject = function (req, res) {
    const Project = mongoose.model('Project', projectSchema);
    const projectId = req.body.id;

    Project.remove({_id: projectId}, function(err, project){
        if (err) {
            return res.status(400).send(err);
        } else {
            res.status(200).send(project);
        }
    });
};