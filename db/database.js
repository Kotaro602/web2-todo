// Modelでもmongooseを読み込みます
var mongoose = require( 'mongoose' );
var express = require('express')

// MongoDBに接続
var mURI = process.env.MONGODB_URI || 'mongodb://localhost/todoListDb';
mongoose.connect(mURI);

// 接続イベントを利用してログ出力
mongoose.connection.on('connected', function () {
  console.log('mongoose URI locates ' + mURI);
});

// メンバのスキーマ定義
var memberListSchema = new mongoose.Schema({
   _id: Number, //redmineUserId
   userName: String
});

// チャンネルのスキーマ定義
var channelListSchema = new mongoose.Schema({
   _id: String,
   channelName: String,
   members:[]
});

// タスクのスキーマ定義
var todoListSchema = new mongoose.Schema({
   _id: Number,
   redmineUserId: Number,
   createUserId: Number,
   belongedProjectId: Number,
   taskName: String,
   startDate: String,
   dueDate: String,
   taskMemo: String,
   tempDelFlg:{type: Boolean ,default: false},
   compDelFlg:{type: Boolean ,default: false},
   estimate: Number,
   priority: {type: Number ,default: 0},
   privateFlg: {type: Boolean ,default: false},
   sortValue: Number,
   redmineFlg: {type: Boolean ,default: false},
   project: {id: Number, name: String},
   newFlg: {type: Boolean ,default: false},
   redmineUpdDate: String,
   slackFlg: {type: Boolean ,default: false},
   officeFlg: {type: Boolean ,default: false}
});

// modelへ登録
mongoose.model('MemberList', memberListSchema);
mongoose.model('ChannelList', channelListSchema);
mongoose.model('TodoList', todoListSchema);