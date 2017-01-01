
// indexコントローラ
exports.index = function(req, res){

   var fs = require('fs');
   fs.readFile(__dirname + '/build/index.html', 'utf-8',function(err,data) {
      res.writeHead(200,{'content-Type': 'text/html'});
      res.write(data);
      res.end();
   });
};