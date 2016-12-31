// Modelでもmongooseを読み込みます
var mongoose = require( 'mongoose' );
var express = require('express')
var app = express();

// MongoDBに接続
var mURI = process.env.MONGODB_URI;
//    mURI = 'mongodb://localhost/todoListDb';
mongoose.connect(mURI);

// 接続イベントを利用してログ出力
mongoose.connection.on('connected', function () {
  console.log('mongoose URI locates ' + mURI);
})

// メンバのスキーマ定義
var memberListSchema = new mongoose.Schema({
  _id: Number, //redmineUserId;
  userName: String,
  redmineKey: String,
  sortNoList:[],
  memberConf:[]
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
});

// modelへ登録
mongoose.model( 'MemberList', memberListSchema );
mongoose.model( 'TodoList', todoListSchema );