const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

//validation function used to check password strength and then hash the password if it passes
function validateAndHash(password){
    const passwordStrength = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if(!passwordStrength.test(password)){
        return false;
    }
    else{
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(password, salt);
    }
}

function validateLevel(level){
    if((level !== null && this.role !== "MANAGER") || (this.role === "MANAGER" && this.level === null))
        return false;
}

const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match : [validEmail, 'E-mail is invalid']
    },
    firstName:{
        type: String,
        required: true,
        maximum: 20
    },
    lastName:{
        type: String,
        required: true,
        maximum: 20
    },
    password: {
        type: String,
        required: true,
        validate: [
            validateAndHash,
            "Password does not meet requirements"
        ]
    },
    role: {
        type: String,
        uppercase: true,
        required: 'User must have a valid role',
        enum: ['EMPLOYEE', 'MANAGER', 'ADMIN'],
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "Task",
    }],
    projects:[{
        type: Schema.Types.ObjectId,
        ref: "Project"
    }],
    level: {
        type: Number,
        default: null,
        validate: [validateLevel, "Invalid user level value"]
    },
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.index({"email":"text"});

module.exports = UserSchema;