var mongoose = require( 'mongoose' );
var MemberList = mongoose.model('MemberList');
var ChannelList = mongoose.model('ChannelList');
var TodoList = mongoose.model('TodoList');

/**
 * ユーザごとのタスク一覧取得用のメソッド
 **/
exports.readTaskList = function(req, res){

   const getMemberArray = () => {
      return new Promise((resolve) => {

         const taskId = req.query.reqTask;
         if(taskId.slice(0, 1) === 'c'){
            ChannelList.find({_id: taskId},{},{}, function(err, channelList) {
               resolve(channelList[0].members);
            });
         }else{
            resolve([taskId]);
         }
      });
   };

   getMemberArray().then(memberArray =>{

      MemberList.find({_id: {$in: memberArray}},{},{sort:'_id'}, function(err, memberLists) {
         if (err) console.log({'error': 'An error has occurred - ' + err});

         var memberArray = [];
         memberLists.forEach((val => memberArray.push(val._id)));

         TodoList.find(
            {$and: [{compDelFlg: false}, {'redmineUserId': {$in: memberArray}}]}
            ,{},
            {sort:'sortValue'},
            function(err, taskLists){

               if (err) console.log({'error': 'An error has occurred - ' + err});

               res.json({
                  'members': memberLists,
                  'tasks': taskLists
               })
            });
      });
   })


};

/**
 * タスクの登録用のメソッド
 **/
exports.registerTask = function(req, res){

   var task = Object.assign(new TodoList(), req.body);
   console.log(task);

   //タスク追加処理
   TodoList.update({_id: task._id}, task, {upsert: true}, function(err){
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
 * タスクの一括更新用のメソッド
 **/
exports.updateTaskList = function(req, res){

   var updateTask;
   req.body.forEach(task => {
      updateTask = Object.assign(new TodoList(), task);
      console.log(updateTask);

      //タスク更新処理
      TodoList.update({_id: updateTask._id}, updateTask, {upsert: true}, function (err) {
         if (err) console.log({'error': 'An error has occurred - ' + err});
      });
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
exports.changeSortTask = function(req, res){

   //ソート順更新処理
   var dragTask = req.body.dragTask;
   var hoverTask = req.body.hoverTask;

   TodoList.update({_id: dragTask._id}, dragTask, {upsert: true}, function(err, result){
      if (err) console.log({'error': 'An error has occurred - ' + err});
   });
   TodoList.update({_id: hoverTask._id}, hoverTask, {upsert: true}, function(err, result){
      if (err) console.log({'error': 'An error has occurred - ' + err});
   });

   res.end();
};