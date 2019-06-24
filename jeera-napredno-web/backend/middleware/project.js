const mongoose = require('mongoose');
const taskSchema = require('../schema/Task');
const userSchema = require('../schema/User');
const companySchema = require('../schema/Company');
const projectSchema = require('../schema/Project');
const Project = mongoose.model('Project', projectSchema);
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
module.exports.addProject = async function (req, res, next) {

    const Company = mongoose.model('Company', companySchema);
    const {company, users, description, name, token} = req.body;
    const newProject = new Project(
        {
            name: name,
            description: description,
            company: company,
            users: users
        }
    );

    try{
        const payload = await jwt.verify(token, process.env.SECRET);
        if(payload.role !== "ADMIN")
            throw new Error("401");
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

module.exports.getProjects = async function (req, res, next) {
    try{
        const {page, pageSize, token} = req.body;
        const payload = await jwt.verify(token, process.env.SECRET);
        //TODO: add authorization
        const [projects, count] = await Promise.all([
            Project.find({}).skip(pageSize*(page-1)).limit(pageSize),
            Project.countDocuments()
        ]);
        res.send({projects, count});
    }catch(err) {return next(err)}

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