
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();

// Modelの設定
var db = require('./db/database');

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'dist')));

var index = require('./routes/index');
var crudTask = require('./routes/crudTask');
var memberTask = require('./routes/memberTask');

//ルーティング
app.get('/', index.index);
app.get('/api/readTaskList', crudTask.readTaskList);
app.post('/api/registerTask', crudTask.registerTask);
app.post('/api/updateTask', crudTask.updateTask);
app.post('/api/updateTaskList', crudTask.updateTaskList);
app.post('/api/cleanTask', crudTask.cleanTask);
app.post('/api/changeSortTask', crudTask.changeSortTask);

app.post('/api/addMember', memberTask.registerMember);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});