
// indexコントローラ
exports.index = function(req, res){

  var mongoose = require( 'mongoose' );
  var TodoList = mongoose.model( 'TodoList' );
  
  // Engineerモデルのfindメソッドで一覧を取得
  TodoList.find({}, function(error, todoLists) {
    if(!error){
  	  res.render('index', { 
  	    todoLists: todoLists
  	  });
    }
  });
};