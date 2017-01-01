import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {substr} from '../../lib/utils';

export default class TaskMainBox extends Component {

   //オープンしたタスクにフォーカスをあてる
   componentDidUpdate(){
      const taskNameInputDom = document.getElementById('taskNameToFocus');
      if(taskNameInputDom) taskNameInputDom.select();
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
      const normalChkBoxDOM = task.get('tempDelFlg') ?
         <span className={css(styles.taskCompBoxChecked)} onClick={::this.chgTempCompFlg}>&#x2713;</span>
         :<span className={css(styles.taskCompBox)} onClick={::this.chgTempCompFlg}></span>;

      //完了ボタン作成
      const chkBoxDOM = task.get('redmineFlg') ?
         <span className={css(styles.redmineIcon)} onClick={::this.openRedmineModal}>R</span> :
         normalChkBoxDOM;

      //完了済み処理
      const taskNameStyle = css(
         styles.taskName,
         task.get('tempDelFlg') && styles.taskNameChecked,
         (state.get('conf').get('openTaskId') && task.get('redmineFlg')) && styles.redmineTaskName);

      const cutTaskName = substr(task.get('taskName'), 82, '…');

      //タスクオープン処理
      const taskNameDOM = task.get('_id') == state.get('conf').get('openTaskId') && !task.get('redmineFlg') ?
         <input type="text"
                className={css(styles.nameInput)}
                defaultValue={task.get('taskName')}
                ref='taskName'
                id="taskNameToFocus"
                onBlur={::this.chgTaskName}
         /> :
         <span className={taskNameStyle} data-closeId={task.get('_id')} onClick={::this.openTask}>
            {cutTaskName}
         </span>

      /** レンダリング **/
      return(
         <div className={css(styles.nameBox)}>
            <div className={css(styles.taskCheckBox)}>
               <input type="checkbox" className={css(styles.taskCompCheckBox)}/>
               {chkBoxDOM}
            </div>
            <div className={css(styles.taskNameBox)}>
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
      cursor: 'default'
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