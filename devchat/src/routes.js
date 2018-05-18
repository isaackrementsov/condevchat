var router = require("express").Router();
var home = require('./endpoints/home');
var auth = require('./endpoints/auth');
var main = require('./endpoints/main');
var tasks = require('./endpoints/tasks');
var projects = require('./endpoints/projects');
var ep = require('./util/ep-utils');
module.exports = function(app) { //Pass the main server.js file into router.js
    app.use('/', router);
    router.get('/projects/:websiteId', projects.show);
    router.post('/updProject/:attr/:websiteId', ep.notEmpty(['value'], '/projects/:websiteId'), projects.update);
    router.post('/finishProject/:websiteId', projects.finish);
    router.get('/', home.index);
    router.get('/login', ep.checkUser, auth.renderLogin);
    router.post('/login', ep.notEmpty(['username', 'password'], '/login'), auth.login);
    router.post('/logout', auth.logout);
    router.get('/home', ep.checkIn, main.home);
    router.get('/addTasks/:websiteId', tasks.renderAdd);
    router.post('/addTasks/:websiteId/:author', ep.notEmpty(['taskData', 'members', 'name', 'description'], '/tasks/add:websiteId'), tasks.add)
    router.get('/tasks/:taskId', tasks.show);
    router.post('/taskDone/:subTaskId/:taskId', tasks.done);
    router.post('/taskDelete/:taskId/:websiteId', tasks.delete);
    router.post('/addSubTask/:taskId', ep.notEmpty(['name', 'description'], '/tasks/:taskId'), tasks.addSubTask);
    router.get('/:any', auth.any);
}