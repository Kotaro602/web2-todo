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

   //オープンしたタスクにフォーカスをあてる
   componentDidUpdate(prevProps){

      const taskNameInputDom = document.getElementById('taskNameToFocus');
      if(taskNameInputDom) taskNameInputDom.select();
   }

   componentDidMount() {
      //オープン中のタスクをクローズ
      const closeOpenTask = (evt) => {
         const openTaskDOM = document.getElementById(this.props.state.get('conf').get('openTaskId'));

         // 追加ボタンを押した時、タイトルを押した時に2回呼ばれるのも無効にする
         if(openTaskDOM == null) return;
         if(openTaskDOM.contains(evt.target)) return;
         if(event.target.className.match('addTaskArea')) return;
         if(event.target.className.match('redmineIcon')) return;
         if(this.props.state.get('conf').get('openTaskId') == evt.target.getAttribute('data-closeId')) return;

         this.props.openTask(undefined);
      }

      //選択中のタスクをクローズ
      const closeSelectTask = (evt) => {
         const selectTaskDOM = document.getElementById(this.props.state.get('conf').get('selectTaskId'));

         // 追加ボタンを押した時、タイトルを押した時に2回呼ばれるのも無効にする
         if(selectTaskDOM == null) return;
         if(selectTaskDOM.contains(evt.target)) return;
         if(event.target.className.match('addTaskButton')) return;
         if(event.target.className.match('redmineIcon')) return;
         if(this.props.state.get('conf').get('selectTaskId') == evt.target.getAttribute('data-closeId')) return;

         this.props.selectTask(undefined);
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
      document.addEventListener('click', closeSelectTask);
      document.addEventListener('click', closeOpenTask);
      document.addEventListener('click', closeRedmineModal);

      //タスクリスト定期的に取得する
      this.props.reqTasks(true);
      setInterval(this.props.reqTasks, 3000000);
   }

   // closeLineModal(){
   //    this.props.addLineModal(undefined);
   // }

   render() {

      /** prop取得 **/
      const {state} = this.props;
      const showLineModal = state.get('conf').get('lineModalUserId') !== undefined;

      /** レンダリング **/
      return (
         <div className={css(styles.taskAreaBox)}>
            <ScrollZone className={css(styles.taskMainArea)}>
            {state.get('members').map((member, key) => (
               <div key={key} >
                  <TaskUser {...this.props} member={member}/>
                  <TaskMemberList {...this.props} member={member}/>
                  <TaskButton {...this.props} member={member} />
               </div>
            ))}
            </ScrollZone>
            <TogglePattern isOpenFlg={state.get('conf').get('openRedmineId') != undefined}>
               <RedmineArea isOpenFlg={true} {...this.props}/>
            </TogglePattern>
            {/*<Modal isOpen={showLineModal}*/}
                   {/*contentLabel="onRequestClose Example"*/}
                   {/*onRequestClose={::this.closeLineModal}*/}
                   {/*shouldCloseOnOverlayClick={true}*/}
                   {/*overlayClassName={css(styles.addLinePopupOverLay)}*/}
                   {/*className={css(styles.addLinePopup)}>*/}
               {/*<TaskLineModal {...this.props}/>*/}
            {/*</Modal>*/}
         </div>
      );
   }
}

const styles = StyleSheet.create({
   taskAreaBox: {
      height: '100%'
   },
   taskMainArea: {
      paddingTop: 15,
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
   addLinePopupOverLay:{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(162, 159, 159, 0.74902)'
   },
   addLinePopup: {
      position: 'absolute',
      top: '40%',
      left: '50%',
      marginTop: -125,
      marginLeft: -300,
      border: '2px solid rgb(154, 153, 156)',
      background: 'rgb(255, 255, 255)',
      overflow: 'auto',
      borderRadius: '4px',
      outline: 'none',
      width: 600,
      height: 250
   }
});