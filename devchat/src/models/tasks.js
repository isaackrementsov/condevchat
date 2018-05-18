var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var taskSchema = new Schema({
    name: {type:String},
    websiteId: {type:String},
    description: {type:String},
    members: [{name:String, job:String}],
    subTasks: [{name:String, description:String, done:Boolean}],
    done: {type:Boolean},
    createdAt: {type:Date},
    endedAt: {type:Date},
    author: {type:String}
});
var Task = mongoose.model('Task', taskSchema);
module.exports = Task;