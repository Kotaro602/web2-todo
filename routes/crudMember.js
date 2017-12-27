var mongoose = require( 'mongoose' );
var MemberList = mongoose.model( 'MemberList' );
var TodoList = mongoose.model( 'TodoList' );

/**
 * メンバー登録/更新用のメソッド
 **/
exports.registerMember = function(req, res){

    var member = Object.assign(new MemberList(), req.body);
    console.log(member);

    //メンバー追加処理
    MemberList.update({_id: member._id}, member, {upsert: true}, function(err){
        if (err) console.log({'error': 'An error has occurred - ' + err});
    });
    res.end();
};