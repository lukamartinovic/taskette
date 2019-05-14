const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        enum: ["To Do", "In progress", "Done"],
        default: "To Do"

    },
    points: {
        type: Number,
        required: true
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
    }
});

module.exports = TaskSchema;