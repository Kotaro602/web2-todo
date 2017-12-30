var mongoose = require('mongoose');
var ChannelList = mongoose.model('ChannelList');
var TodoList = mongoose.model('TodoList');


/**
 * チャンネル読み込み用メソッド
 **/
exports.readChannel = function(req, res){

   ChannelList.find({},{}, {}, function(err, channelList){

         if (err) console.log({'error': 'An error has occurred - ' + err});
         res.json(channelList);
      });
};

/**
 * チャンネル登録/更新用のメソッド
 **/
exports.registerChannel = function(req, res){

    var channel = Object.assign(new ChannelList(), req.body);
    console.log(channel);

    //チャンネル追加処理
    ChannelList.update({_id: channel._id}, channel, {upsert: true}, function(err){
        if (err) console.log({'error': 'An error has occurred - ' + err});
    });
    res.end();
};

/**
 * チャンネルメンバー登録/削除用のメソッド
 **/
exports.registerChannel = function(req, res){

   var channelId = req.query.channelId;
   var memberId = req.query.memberIds;
   console.log(channel);

   //チャンネル追加処理
   ChannelList.update({_id: req.query.channelId}, {$set: {members:req.query.memberIds}}, {upsert: true}, function(err){
      if (err) console.log({'error': 'An error has occurred - ' + err});
   });
   res.end();
};