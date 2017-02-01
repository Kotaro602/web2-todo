import React, {Component} from 'react';
import ReactDOM from 'react-dom'
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

   componentDidUpdate(nextProps){

      // console.log(this.props.task.get('_id'));
      // console.log(this.props.state.get('conf').get('openTaskId'));
      // if(this.props.task.get('_id') != this.props.state.get('conf').get('openTaskId')) return;
      //
      // console.log(ReactDOM.findDOMNode(this.refs.taskName));
      // let input = ReactDOM.findDOMNode(this.refs.taskName);
      // if(input) input.select();
      const taskNameInputDom = document.getElementById('taskNameToFocus');
      if(taskNameInputDom) {
         taskNameInputDom.select();
      }
   }


   //タスク名称変更
   chgTaskName() {
      const {task, reqUpdateTask} = this.props;
      let taskNameVal = this.refs.taskName.value;
      if(taskNameVal == '') taskNameVal = 'unnamed task';

      //カーソルを移動した場合
      if(task.get('taskName') == taskNameVal) return;
      reqUpdateTask(task.set('taskName', taskNameVal), false);
   }

   //Enterキーを押した場合は、タスク名称を変更しクローズする。
   chgAndCloseTaskName(event){

      if(event.which == 13) {

         const {task, openTask, reqUpdateTask} = this.props;
         let taskNameVal = this.refs.taskName.value;
         if(taskNameVal == '') taskNameVal = 'unnamed task';

         if(task.get('taskName') == taskNameVal) openTask(undefined);
         else reqUpdateTask(task.set('taskName', taskNameVal), true);
      }
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
         styles.nameInput, styles.pointer,
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
         // taskNameDOM = <span className={taskSpanStyle}>{task.get('taskName')}</span>
         taskNameDOM = <input type="text"
                              className={taskSpanStyle}
                              defaultValue={task.get('taskName')}
                              ref='taskName'
                              readOnly/>

      }else{ //ノーマルタスク オープン
         taskNameDOM = <input type="text"
                              className={css(styles.nameInput)}
                              defaultValue={task.get('taskName')}
                              ref='taskName'
                              id="taskNameToFocus"
                              onBlur={::this.chgTaskName}
                              onKeyDown={::this.chgAndCloseTaskName}/>
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
      paddingRight: 180,
      marginRight: -180
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
      height: 25,
      lineHeight: '16px',
      WebkitUserSelect: 'none',
      fontSize: 14,
      padding: 1
   }
});