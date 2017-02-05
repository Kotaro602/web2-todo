import React, { Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Map, List, fromJS, toJS } from 'immutable';
import withScrolling from 'react-dnd-scrollzone';
import {TogglePattern} from "react-toggle-pattern";
import Modal from 'react-modal';
import TaskMemberList from './p-TaskMem';
import TaskUser from './p-TaskUser';
import TaskButton from './p-TaskButton';
import TaskPro from '../header/p-Head';
import TaskLineModal from './p-TaskLineModal';
import RedmineArea from './redmine/p-RedmineArea'

const ScrollZone = withScrolling('div');

export default class Task extends Component {


   componentDidMount() {

      const {openTask, selectTask, reqTasks} = this.props;

      //オープン中のタスクをクローズ
      const closeOpenTask = (evt) => {
         const openTaskId = this.props.state.get('conf').get('openTaskId');
         const openTaskDOM = document.getElementById(openTaskId);

         // 追加ボタンを押した時、タイトルを押した時に2回呼ばれるのも無効にする
         if(openTaskDOM == null) return;
         if(openTaskDOM.contains(evt.target)) return;
         if(event.target.className.match('addIcon')) return;
         if(event.target.className.match('redmineIcon')) return;
         if(openTaskId == evt.target.getAttribute('data-closeId')) return;

         openTask(undefined);
      };

      //選択中のタスクをクローズ
      const closeSelectTask = (evt) => {
         const selectTaskId = this.props.state.get('conf').get('selectTaskId');
         const selectTaskDOM = document.getElementById(selectTaskId);

         // 追加ボタンを押した時、タイトルを押した時に2回呼ばれるのも無効にする
         if(selectTaskDOM == null) return;
         if(selectTaskDOM.contains(evt.target)) return;
         if(event.target.className.match('addTaskButton')) return;
         if(event.target.className.match('redmineIcon')) return;
         if(event.target.className.match('todayButton')) return;
         if(event.target.className.match('react-datepicker')) return;
         if(selectTaskId == evt.target.getAttribute('data-closeId')) return;

         selectTask(undefined);
      };

      //イベントハンドラに追加
      document.addEventListener('click', closeSelectTask);
      document.addEventListener('click', closeOpenTask);

      //タスクリスト定期的に取得する
      reqTasks(undefined);
      setInterval(() => {

         console.log(this.props.state.get('tasks'));

         //タスクがオープン中は再更新しない
         if(this.props.state.get('conf').get('openTaskId') === undefined) {
            reqTasks(this.props.state.get('tasks'));
         }
      }, 120000);
   }

   render() {

      /** prop取得 **/
      const {state} = this.props;

      /** レンダリング **/
      return (
         <div className={css(styles.taskAreaBox)}>
            <div className={css(styles.taskMainArea)}>
            {state.get('members').map((member, key) => (
               <div key={key} className={css(styles.userTaskArea)}>
                  <TaskUser {...this.props} member={member}/>
                  <TaskMemberList {...this.props} member={member}/>
               </div>
            ))}
            </div>
            <TogglePattern isOpenFlg={state.get('conf').get('openRedmineId') != undefined}>
               <RedmineArea isOpenFlg={true} {...this.props}/>
            </TogglePattern>
         </div>
      );
   }
}

const styles = StyleSheet.create({
   taskAreaBox: {
      height: '95%'
   },
   taskMainArea: {
      marginTop: 20,
      marginLeft: 10,
      marginRight: 180,
      overflowX: 'hidden',
      overflowY: 'auto',
      height: '100%',
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
   },
   userTaskArea: {
      marginBottom: 30

   }
});