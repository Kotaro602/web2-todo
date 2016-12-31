var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var node = require('node-dev');
var source = require('vinyl-source-stream');
var exec = require('child_process').exec;
var sourcemaps  = require("gulp-sourcemaps");
var uglify  = require("gulp-uglify");
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

function errorHandler(err) {
  console.log('Error: ' + err.message);
}

// 自動ブラウザリロード
gulp.task('browser-sync', function() {
  browserSync({
    proxy: {
      target: 'localhost'
    }
  });
});

// Javascriptへのビルド
// ES6かつJSXなファイル群をbuild/bundle.jsへ変換する
gulp.task('build', function () {
  return gulp.src('')
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest('./public/build'));
});

gulp.task('rebuild', ['build'], function(){
  browserSync.reload();
});

//lockファイルの除却
gulp.task('removeFile', function() {
   exec('del /q "data\mongod.lock"', function () {
      console.log('rm lock file');
   });
});

//ローカルDBの軌道
gulp.task('db', ['removeFile'], function() {
    exec('mongod --dbpath=data --nojournal', function () {
       console.log('db start');
    });
});

// ローカルサーバーの起動 , ['db']
gulp.task('server', function() {
  exec('node app.js', function(){
    console.log('web server start');
  })
});

// ファイル監視
// ファイルに更新があったらビルドしてブラウザをリロードする
gulp.task('watch', function() {
  gulp.watch('./public/client/*.js', ['build', 'rebuild']);
  gulp.watch('./public/client/*/*.js', ['build', 'rebuild']);
  gulp.watch('./public/client/*/*/*.js', ['build', 'rebuild']);
});

// gulpコマンドで起動したときのデフォルトタスク
gulp.task('default', [ 'server', 'build', 'watch', 'browser-sync']);