var mongoose = require( 'mongoose' );
var MemberList = mongoose.model( 'MemberList' );
var TodoList = mongoose.model( 'TodoList' );

/**
 * ユーザごとのタスク一覧取得用のメソッド
 **/
exports.readTaskList = function(req, res){

   MemberList.find({},{},{sort:'_id'}, function(err, memberLists) {
     if (err) console.log({'error': 'An error has occurred - ' + err});

     TodoList.find({compDelFlg: false},{},{sort:'sortValue'}, function(err, taskLists) {
        if (err) console.log({'error': 'An error has occurred - ' + err});

        res.json({
           'members': memberLists,
           'tasks': taskLists
        })
     });
   });
}

/**
 * タスクの登録用のメソッド
 **/
exports.registerTask = function(req, res){

   var task = Object.assign(new TodoList(), req.body);
   console.log(task);

   //タスク追加処理
   TodoList.update({_id: task._id}, task, {upsert: false}, function(err){
      if (err) console.log({'error': 'An error has occurred - ' + err});
   });
   res.end();
};

/**
 * タスクの更新用のメソッド
 **/
exports.updateTask = function(req, res){

   var task = Object.assign(new TodoList(), req.body);
   console.log(task);

   //タスク更新処理
   TodoList.update({_id: task._id}, task, {upsert: true}, function(err, result){
      if (err) console.log({'error': 'An error has occurred - ' + err});
   });
   res.end();
};

/**
 * タスククリーニング用ロジック
 **/
exports.cleanTask = function(req, res){

   var reqUserId = req.body.userId;

   TodoList.update(
      {redmineUserId: reqUserId, tempDelFlg: true},
      {$set: {compDelFlg: true}},
      {multi: true},
      function(err, result){
         if (err) console.log({'error': 'An error has occurred - ' + err});
      }
   );
   res.end();
};

/**
 * ソート順更新用のメソッド
 **/
exports.taskSortRegister = function(req, res){

  //ソート順 登録・更新処理
  MemberList.update({_id: req.body.redmineUserId},
                  {$set: {taskSortArray: req.body.taskSortArray}},
                  {upsert: true},
                  function(err, result){
    if (err) {
        console.log({'error': 'An error has occurred - ' + err});
    } else {
        console.log('Success: ' + result + ' document(s) insert/update');
    }
  });
  res.end();
};