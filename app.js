
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
var db = require('./model/database');

// all environments
if ('development' == app.get('env')) {
  app.set('port', process.env.PORT || 8080);
}else{
  app.set('port', 8080);
}
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var crudTask = require('./routes/crudTask');

//development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }


//ルーティング
app.get('/api/readTaskList', crudTask.readTaskList);
app.post('/api/registerTask', crudTask.registerTask);
app.post('/api/updateTask', crudTask.updateTask);
app.post('/api/cleanTask', crudTask.cleanTask);
// app.post('/api/tempDeleteTask', crudTask.tempDeleteTask);
// app.post('/api/completeDeleteTaskList', crudTask.completeDeleteTaskList);
// app.post('/api/taskSortRegister', crudTask.taskSortRegister);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});