const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        require: 'Email address is required',
        match : [validEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        require: 'Password is required'
    }
});

UserSchema.pre('save', function(next) {
    const user = this;
    const salt = bcrypt.genSaltSync(10);
    if (!user.isModified('password')) return next();

    user.password = bcrypt.hashSync(user.password, salt);
    next();
});

module.exports = UserSchema;