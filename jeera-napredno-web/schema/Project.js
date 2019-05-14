const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    },
    sprints: {
        type: Schema.Types.ObjectId,
        ref: "Sprint"
    }
});

module.exports = ProjectSchema;