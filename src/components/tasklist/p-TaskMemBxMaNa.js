import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {substr} from '../../lib/utils';
import Immutable from 'immutable';
import {shouldComponentUpdate} from 'react-addons-pure-render-mixin'

export default class TaskMainBox extends Component {

   //defaultValueを更新する。
   componentWillReceiveProps(nextProps){
      if(nextProps.task.get('taskName') !== this.props.task.get('taskName')){
         this.refs.taskName.value = nextProps.task.get('taskName');
      }
   }

   //タスク名称変更
   chgTaskName() {
      const {task, reqUpdateTask} = this.props;
      let taskNameVal = this.refs.taskName.value;

      if(taskNameVal == '') taskNameVal = 'unnamed task';
      if(task.get('taskName') == taskNameVal) return;
      reqUpdateTask(task.set('taskName', taskNameVal));
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
      const redmineFlg = task.get('redmineFlg');
      const openFlg = task.get('_id') == state.get('conf').get('openTaskId');

      const taskSpanStyle = css(
         styles.nameSpan, styles.pointer,
         task.get('tempDelFlg') && styles.taskNameChecked,
      )

      let taskNameDOM;
      if(redmineFlg && !openFlg){ //REDMINEタスク 非オープン
         taskNameDOM = <input type="text"
                              className={css(styles.nameInput, styles.pointer)}
                              defaultValue={task.get('taskName')}
                              ref='taskName'
                              readOnly/>

      }else if(redmineFlg && openFlg){ //REDMINEタスク オープン
         taskNameDOM = <input type="text"
                              className={css(styles.nameInput, styles.pointer)}
                              defaultValue={task.get('taskName')}
                              ref='taskName'
                              readOnly/>

      }else if(!redmineFlg && !openFlg){ //ノーマルタスク 非オープン
         taskNameDOM = <span className={taskSpanStyle}
                             ref='taskName'
                             data-closeId={task.get('_id')}>{task.get('taskName')}</span>

      }else{ //ノーマルタスク オープン
         taskNameDOM = <input type="text"
                              className={css(styles.nameInput)}
                              defaultValue={task.get('taskName')}
                              ref='taskName'
                              id="taskNameToFocus"
                              onBlur={::this.chgTaskName}/>
      }

      /** レンダリング **/
      return(
         <div className={css(styles.taskMainBox)} onDoubleClick={::this.openTask}>
            {taskNameDOM}
         </div>
      );
    }
}

const styles = StyleSheet.create({
   taskMainBox:{
      display: 'inline-block',
      minWidth: '100%',
      height: 25,
      boxSizing: 'border-box',
      paddingRight: 230,
      marginRight: -230
   },
   pointer:{
      cursor: 'pointer'
   },
   taskNameChecked:{
      opacity: '0.5',
      textDecoration: 'line-through',
   },
   nameInput:{
      display: 'inline-block',
      width: '100%',
      height: '100%',
      outline: '0',
      border: '0px',
      height: 18,
      lineHeight: '16px',
      WebkitUserSelect: 'none'
   },
   nameSpan:{
      display: 'inline-block',
      width: '100%',
      height: '100%',
      outline: '0',
      border: '0px',
      paddingTop: 2,
      WebkitUserSelect: 'none'
   }
});