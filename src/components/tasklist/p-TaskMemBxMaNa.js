import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {substr} from '../../lib/utils';
import Immutable from 'immutable';
import {shouldComponentUpdate} from 'react-addons-pure-render-mixin'

export default class TaskMainBox extends Component {

   shouldComponentUpdate = shouldComponentUpdate;

   //オープンしたタスクにフォーカスをあてる
   componentDidUpdate(prevProps){
      //最初にタスクがオープンした時のみフォーカスをあてる
      const prevOpenTaskId = prevProps.state.get('conf').get('openTaskId');
      const nowOpenTaskId = this.props.state.get('conf').get('openTaskId');
      const taskNameInputDom = document.getElementById('taskNameToFocus');

      if(taskNameInputDom && prevOpenTaskId != nowOpenTaskId) taskNameInputDom.focus();
   }

   componentWillReceiveProps(nextProps){
      if(nextProps.task.get('taskName') !== this.props.task.get('taskName')){
         this.refs.taskName.value = nextProps.task.get('taskName');
      }
   }

   //タスク一時完了
   chgTempCompFlg() {
      const {task, reqUpdateTask} = this.props;
      const nextTempDelFlg = !task.get('tempDelFlg');
      reqUpdateTask(task.set('tempDelFlg', nextTempDelFlg));
   }

   //タスク名称変更
   chgTaskName() {
      const {task, reqUpdateTask} = this.props;
      const taskNameVal = this.refs.taskName.value;

      if(task.get('taskName') == taskNameVal) return;
      const nextTaskName = taskNameVal != '' ? taskNameVal: '<タスク名を入力してください>';
      reqUpdateTask(task.set('taskName', nextTaskName));
   }

   //Redmineモーダルを開く
   openRedmineModal() {
      const {state, task, openRedmineModal} = this.props;
      const preOpenId = state.get('conf').get('openRedmineId');

      //既に開いているボタンならば閉じる
      const nextOpenId = preOpenId == task.get('_id') ? undefined : task.get('_id');
      openRedmineModal(nextOpenId);
   }

   //タスクを開く
   openTask() {
      const {state, task, openTask} = this.props;
      const preOpenId = state.get('conf').get('openTaskId');

      //既に開いているならばスキップする。
      if(preOpenId == task.get('_id')) return;
      openTask(task.get('_id'))
   }

   render(){

      /** prop取得 **/
      const {state, task} = this.props;

      /** レンダリング前処理 **/
      //チェックボックスアイコン
      let chkBoxDOM;
      if(task.get('redmineFlg')){
         chkBoxDOM = <span className={css(styles.redmineIcon)} onClick={::this.openRedmineModal}>R</span>;
      }else if(task.get('tempDelFlg')){
         chkBoxDOM = <span className={css(styles.taskCompBoxChecked)} onClick={::this.chgTempCompFlg}>&#x2713;</span>;
      }else{
         chkBoxDOM = <span className={css(styles.taskCompBox)} onClick={::this.chgTempCompFlg}></span>;
      }

      const redmineFlg = task.get('redmineFlg');
      const openFlg = task.get('_id') == state.get('conf').get('openTaskId');

      let taskNameDOM;
      if(redmineFlg && !openFlg){
         //REDMINEタスク 非オープン
         taskNameDOM = <input type="text" className={css(styles.nameInput, styles.redmineTaskName)}
                              defaultValue={task.get('taskName')} ref='taskName'
                              onClick={::this.openTask} readOnly/>

      }else if(redmineFlg && openFlg){
         //REDMINEタスク オープン
         taskNameDOM = <input type="text" className={css(styles.nameInput, styles.redmineTaskName)}
                              ref='taskName' defaultValue={task.get('taskName')}  readOnly/>

      }else if(!redmineFlg && !openFlg){
         //ノーマルタスク 非オープン
         taskNameDOM = <input type="text" className={css(styles.nameInput, styles.redmineTaskName)}
                              defaultValue={task.get('taskName')}
                              ref='taskName'  readOnly/>

      }else{
         //ノーマルタスク オープン
         taskNameDOM = <input type="text" className={css(styles.nameInput)}
                              defaultValue={task.get('taskName')}
                              ref='taskName' id="taskNameToFocus" onBlur={::this.chgTaskName}/>
      }

      /** レンダリング **/
      return(
         <div className={css(styles.nameBox)}>
            <div className={css(styles.taskCheckBox)}>
               <input type="checkbox" className={css(styles.taskCompCheckBox)}/>
               {chkBoxDOM}
            </div>
            <div className={css(styles.taskNameBox)} onClick={::this.openTask}>
               {taskNameDOM}
            </div>
         </div>
      );
    }
}

const styles = StyleSheet.create({
   nameBox: {
      display: 'inline-block',
      width: '74%'
   },
   taskCheckBox:{
      float: 'left'
   },
   redmineIcon: {
      width: '16px',
      height: '16px',
      marginRight: '2px',
      marginLeft: '4px',
      display: 'inline-block',
      backgroundColor: '#d80a1f',
      borderRadius: '3px',
      cursor: 'pointer',
      verticalAlign: 'middle',
      textAlign: 'center',
      color: '#fafafa',
      fontSize: '14px'
   },
   taskCompCheckBox: {
      display: 'none'
   },
   taskCompBox: {
      width: '11.5px',
      height: '11.5px',
      marginRight: '4px',
      marginLeft: '4px',
      display: 'inline-block',
      backgroundColor: '#fff',
      borderRadius: '3px',
      border: 'solid 2px #3baae3',
      cursor: 'pointer',
      verticalAlign: 'middle'
   },
   taskCompBoxChecked: {
      width: '11.5px',
      height: '11.5px',
      marginRight: '4px',
      marginLeft: '4px',
      display: 'inline-block',
      backgroundColor: '#fff',
      borderRadius: '3px',
      border: 'solid 2px #3baae3',
      cursor: 'pointer',
      verticalAlign: 'middle',
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#3baae3',
      opacity: '0.5'
   },
   taskNameBox:{
      width:' 100%',
      marginLeft: '28px'
   },
   taskName:{
      cursor: 'pointer',
      width: '100%',
      display: 'block',
      height: '100%',
      whiteSpace: 'nowrap'
   },
   redmineTaskName:{
      cursor: 'pointer'
   },
   taskNameChecked:{
      opacity: '0.5',
      textDecoration: 'line-through',
   },
   nameInput:{
      display: 'inline-block',
      width: '90%',
      height: '100%',
      outline: '0',
      border: '0px'
   }
});