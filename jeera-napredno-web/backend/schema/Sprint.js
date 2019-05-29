const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function validateStartDate(startDate){
    if(startDate > this.endDate){
        return false;
    }
}

const SprintSchema = mongoose.Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    points: {
        type: Number,
        required: true,
        min: 0,
    },
    currentPoints: {
        type: Number,
        max: this.points,
        min: 0,
        default: 0
    },
    startDate: {
        type: Date,
        required: true,
        validate: [validateStartDate, "Invalid date"]
    },
    endDate: {
        type: Date,
        required: true
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "Task"
    }]
});

module.exports = SprintSchema;