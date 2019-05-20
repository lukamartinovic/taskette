const mongoose = require('mongoose');
const taskSchema = require('../schema/Task');
const userSchema = require('../schema/User');
const companySchema = require('../schema/Company');
const projectSchema = require('../schema/Project');
const Project = mongoose.model('Project', projectSchema);

const Schema = mongoose.Schema;

module.exports.addProject = async function (req, res, next) {
    const Company = mongoose.model('Company', companySchema);
    const newProject = new Project(
        {
            name: req.body.name,
            description: req.body.description,
            company: req.body.company,
            users: req.body.users
        }
    );

    try{
        const savedProject = await newProject.save();
        await Company.updateOne(
            {_id:newProject.company},
            {$push: {projects: savedProject._id}});
        res.send(savedProject);
    }catch(err){return next(err)}

};

module.exports.addUser = function (req, res, next) {

    Project.updateOne(
        { _id: req.params.id },
        { $addToSet: { users: { $each: req.body.users } }}).catch((err) => {return next(err)})
    res.status(200).send(project);

};

module.exports.addSprint = function (req, res) {

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
    const projectId = req.body.id;

    Project.remove({_id: projectId}, function(err, project){
        if (err) {
            return res.status(400).send(err);
        } else {
            res.status(200).send(project);
        }
    });
};