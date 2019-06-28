const mongoose = require('mongoose');
const taskSchema = require('../schema/Task');
const userSchema = require('../schema/User');
const companySchema = require('../schema/Company');
const projectSchema = require('../schema/Project');
const Project = mongoose.model('Project', projectSchema);
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const User = mongoose.model('User', userSchema);

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
        Company.updateOne(
            {_id:newProject.company},
            {$push: {projects: savedProject._id}});
        res.send(savedProject);
    }catch(err){return next(err)}
};

module.exports.editProjectUsers = async function (req, res, next) {
    try{
        const payload = await jwt.verify(req.body.token, process.env.SECRET);
        if(payload.role !== "ADMIN")
            throw new Error("401");
    const project = await Project.updateOne(
        { _id: req.body.project },
        { $set: { users: req.body.users }}).catch((err) => {return next(err)})
    res.status(200).send(project)}
    catch(err){return next(err)}

};

module.exports.getProject = async function (req, res, next) {
    try{
        console.log("getting project")
        const {_id} = req.body;
        const project = await Project.findOne({_id: _id}).populate("users").populate("sprints").exec();
        res.send(project);
    }catch(err) {return next(err)}
};

module.exports.getProjects = async function (req, res, next) {
    try{
        const {page, pageSize, token} = req.body;
        const payload = await jwt.verify(token, process.env.SECRET);
        let projects = [];
        let count = 0;
        if((payload.role === "EMPLOYEE") || (payload.role === "MANAGER")){
            projects = await Project.find({users: payload.id}).populate({path: "sprints", match: { tasks: { $not: { $size: 0}}}, populate: { path: "tasks", match: {user: payload.id}}})
        } else {
        [projects, count] = await Promise.all([
            Project.find({}).skip(pageSize*(page-1)).limit(pageSize),
            Project.countDocuments()
        ]);}
        res.send({projects, count});
    }catch(err) {return next(err)}

};

module.exports.addSprint = function (req, res) {

    Project.updateOne(
        { _id: req.params.id },
        { $addToSet: { sprints: { $each: [req.body.sprints] }}},
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