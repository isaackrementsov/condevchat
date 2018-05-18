var Website = require('../models/websites');
var User = require('../models/users');
var Job = require('../models/jobs');
var Task = require('../models/tasks');
var fs = require('fs');
var models = {
    User: User,
    Website: Website,
    Job: Job,
    Task: Task
}
var del = function(model, data, callback){
    models[model].remove(data, function(err){
        if(err){
            fs.writeFile('../../logs/db.json', err, function(err){})
        }
        if(callback){
            callback(err)
        }
    })
}
module.exports = {
    del:del
}