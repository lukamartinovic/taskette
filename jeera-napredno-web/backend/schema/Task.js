const mongoose = require('mongoose');
const sprintSchema = require('./Sprint');
const Schema = mongoose.Schema;


async function validatePoints(points){
    const Sprint = mongoose.model('Sprint', sprintSchema);
    const sprintPromise = Sprint.find({_id: this.sprint}).exec();
    const sprint = await sprintPromise;
    console.log(this.points)
    return(sprint[0].points - sprint[0].currentPoints >= this.points);
}

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        uppercase: true,
        enum: ["TO DO", "IN PROGRESS", "DONE"],
        default: "TO DO"
    },
    points: {
        type: Number,
        min: 1,
        required: true,
        validate: [validatePoints, "invalid number of points"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sprint: {
        type: Schema.Types.ObjectId,
        ref: "Sprint",
        required: true
    },
    due: {
        type: Date,
        required: true
    }
});



module.exports = TaskSchema;