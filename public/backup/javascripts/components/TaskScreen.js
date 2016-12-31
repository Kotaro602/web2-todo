import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

import TaskMemberList from './TaskMemberList'

export default class TaskScreen extends React.Component {
    
    //コンストラクタ
    constructor(){
        super()
        this.state = {
            memberTaskLists: []
        } 
    }
    
    //初期処理
    componentDidMount() {
        $.ajax({
            url: 'fetchTaskList',
            dataType: 'json',
            cache: false,
            async: false,
            success: (memberTaskLists) => { 
                
                for(var i=0; i< memberTaskLists.length; i++) {
                    
                    //ユーザごとにREDMINEからタスクを取得する。
                    $.ajax({
                        type: 'GET',
                        url: '/testdata/issues_' + memberTaskLists[i]._id + '.xml',
                        dataType: 'xml',
                        async: false,
                        success : function(xml){
                            
                            $(xml).find('issue').each(function(){
                                
                                var redmineTask = new Object();
                                redmineTask.redmineFlg = true;
                                redmineTask._id = $(this).find('id').text();
                                redmineTask.taskName = $(this).find('subject').text();
                                redmineTask.dueDate = $(this).find('due_date').text().slice(5).replace('-','/');
                                redmineTask.taskMemo = $(this).find('description').text();
                                memberTaskLists[i].task.push(redmineTask)
                                
                            });
                        },
                        error:function(){
            			    alert("xmlファイルの読み込み失敗");
                        }
                    })
                    
                    //ソート順通りにタスクリストを並び変える。(汚すぎるので後で何とか検討)
                    //ソートリストを最後から順に回す
                    SORT_LIST_LOOP : for(var j=memberTaskLists[i].taskSortArray.length - 1; j >= 0; j--) {
                        for(var k=0; k<memberTaskLists[i].task.length; k++) {
                        
                            if(memberTaskLists[i].taskSortArray[j] == memberTaskLists[i].task[k]._id){
            
                                //一致した要素を先頭に移動
                                memberTaskLists[i].task.unshift(memberTaskLists[i].task[k]);
                                memberTaskLists[i].task.splice(k + 1, 1);
                                continue SORT_LIST_LOOP;
                            }
                        }
                    }
                }
                this.setState({memberTaskLists: memberTaskLists});
            },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
            }
        });
    }
    
    //レンダリング処理
    render(){
        
        //スタイル指定
        const style = {
            userNameBox: {
                width: '100%'
            },
            userName:{
                display: 'inline-block',
                boxSizing: 'border-box',
                width: '100%',
                padding: '3px 8px',
                marginBottom: '2px',
                textAlign: 'left',
                color: '#222',
                borderLeft: '6px solid #ccc',
                borderBottom: '2px solid #aaa',
                font: '20px Tahoma',
                fontWeight: 'bold'
            },
            taskFooterBox:{
                paddingBottom: '35px'
            },
            addTask:{
                
            },
            cleaningTask:{
                
            }
        }
        
        const memberListDOM = this.state.memberTaskLists.map((member)=> {
            return(
                <div>
                    <div style={style.userName}>
                        <span style={style.userNameBox}>{member.userName}</span>
                    </div>
                    <TaskMemberList member={member}/>
                    <div style={style.taskFooterBox}>
                        <button>新規作成</button>
                        <button>クリーニング</button>
                    </div>
                </div>
            );
        });
        return (<div>{memberListDOM}</div>);
    }
}