const mongoose = require('mongoose');
const userSchema = require('../schema/User');

module.exports.addUser = function (req, res) {
    const User = mongoose.model('User', userSchema);
    const newUser = new User(
        {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            level: req.body.level
        }
    );

    newUser.save(function (err, newUser) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.json(newUser).status(201);
        }
    })
};