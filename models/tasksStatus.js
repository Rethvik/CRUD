const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskSchema = new Schema({
    description:{
        type: String,
        required:true
    },
    completed:{
        type: Boolean,
        required:true
    },
},{ timestamps : true });

const Task = mongoose.model('task',taskSchema);
module.exports =Task;