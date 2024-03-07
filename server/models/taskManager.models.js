const mongoose = require('mongoose');

const TaskManagerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task Title is required'],
        minlength: [2, 'Task Title must be 2 or more characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [5, 'Description must be 5 or more characters']
    },
    datetime: {
        type: Date,
    },
    repeat: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum:['low', 'medium', 'high'],
        required: true
    }
}, { timestamps: true });

const Task = mongoose.model('Task', TaskManagerSchema);

module.exports = Task;
