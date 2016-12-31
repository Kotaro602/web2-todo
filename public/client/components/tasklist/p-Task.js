import React, { Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Map, List, fromJS, toJS } from 'immutable';
import withScrolling from 'react-dnd-scrollzone';
import {TogglePattern} from "react-toggle-pattern";
import TaskMemberList from './p-TaskMem';
import TaskUser from './p-TaskUser';
import TaskButton from './p-TaskButton';
import TaskPro from './p-TaskPro';
import TaskRed from './redmine/p-TaskRed'

const ScrollZone = withScrolling('div');

export default class Task extends Component {

   componentDidMount() {
        
      //オープン中のタスクをクローズ
      const closeOpenTask = (evt) => {
         const openTaskDOM = document.getElementById(this.props.state.get('conf').get('openTaskId'));

         // 追加ボタンを押した時、タイトルを押した時に2回呼ばれるのも無効にする
         if(openTaskDOM == null) return;
         if(openTaskDOM.contains(evt.target)) return;
         if(event.target.className.match('addTaskButton')) return;
         if(this.props.state.get('conf').get('openTaskId') == evt.target.getAttribute('data-closeId')) return;

         this.props.openTask(undefined);
      }

      //オープン中のレッドマインモーダルをクローズ
      const closeRedmineModal = (evt) => {
         const openRedmineDOM = document.getElementById('redmineModal');

         if(openRedmineDOM == null) return;
         if(openRedmineDOM.contains(evt.target)) return;
         if(event.target.className.match('redmineIcon')) return;

         this.props.openRedmineModal(undefined);
      }

      //イベントハンドラに追加
      document.addEventListener('click', closeOpenTask);
      document.addEventListener('click', closeRedmineModal);

      //タスクリスト定期的に取得する
      this.props.reqTasks();
      setInterval(this.props.reqTasks, 1000000);
   }

   render() {

      /** prop取得 **/
      const {state} = this.props;

      /** レンダリング **/
      return (
         <div className={css(styles.taskAreaBox)}>
            <TaskPro />
            <ScrollZone className={css(styles.taskMainArea)}>
            {state.get('members').map((member, key) => (
               <div key={key}>
                  <TaskUser {...this.props} member={member}/>
                  <TaskMemberList {...this.props} member={member}/>
                  <TaskButton {...this.props} member={member} />
               </div>
            ))}
            </ScrollZone>
            <TogglePattern isOpenFlg={state.get('conf').get('openRedmineId') != undefined}>
               <TaskRed isOpenFlg={true} {...this.props}/>
            </TogglePattern>
         </div>
      );
   }
}


const styles = StyleSheet.create({
   taskAreaBox: {
      padding: '10px 20px 0px 15px',
      height: '100%'
   },
   taskMainArea: {
      marginTop: 45,
      marginLeft: 4,
      height: '90%',
      overflowX: 'hidden',
      overflowY: 'auto',
      '::-webkit-scrollbar':{
         overflow: 'hidden',
         width: 5,
         background: '#fafafa',
         WebkitBorderRadius: 3,
         borderRadius: 3
      },
      '::-webkit-scrollbar:horizontal':{
         height: 5
      },
      '::-webkit-scrollbar-button':{
         display: 'none'
      },
      '::-webkit-scrollbar-piece':{
         background: '#eee'
      },
      '::-webkit-scrollbar-piece:start':{
         background: '#eee'
      },
      '::-webkit-scrollbar-thumb':{
         overflow: 'hidden',
         background: '#0070a3',
         WebkitBorderRadius: 3,
         borderRadius: 3
      },
      '::-webkit-scrollbar-corner':{
         overflow: 'hidden',
         background: '#333',
         WebkitBorderRadius: 3,
         borderRadius: 3
      }
   }
});