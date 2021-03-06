import React, { Component} from 'react';
import {Map} from 'immutable';
import { StyleSheet, css } from 'aphrodite/no-important';
import {createNewTask} from '../../model/m-Task';

export default class TaskButton extends Component {

   addTask() {
      const {member, reqAddTask} = this.props;
      const userId = member.get('_id');
      const project = Map({ id : 0, name: 'その他'});
      reqAddTask(createNewTask(userId, project));
   }

   actCleanTask() {
      const {reqCleanTask, member} = this.props;
      reqCleanTask(member.get('_id'));
   }

   render() {

      /** レンダリング **/
      return (
         <div className={css(styles.taskFooterBox)}>
            <button onClick={::this.addTask} className={css(styles.buttonCommon, styles.addTaskButton)}>＋ ADD</button>
            <button onClick={::this.actCleanTask} className={css(styles.buttonCommon, styles.cleaningTask)}>－ CLEAN</button>
         </div>
      );
   }
}

const styles = StyleSheet.create({
   taskFooterBox: {
      marginBottom: '50px'
   },
   buttonCommon: {
      background: '#FFF',
      fontSize: '14px',
      WebkitBorderRadius: '4px',
      lineHeight: '16px',
      textAlign: 'center',
      width: '96px',
      cursor: 'pointer'
   },
   addTaskButton: { //ここのclass名はp-Taskコンポーネントで使用中
      border: 'solid 2px #0070a3',
      color: '#0070a3',
      marginLeft: '68%'
   },
   cleaningTask: {
      border: 'solid 2px rgba(255, 0, 0, 0.60)' ,
      color: 'rgba(255, 0, 0, 0.90)',
      marginLeft: '3%'
   },
   groupTask: {
      border: '2px solid rgba(123, 117, 117, 1.0)' ,
      color: '(123, 117, 117, 1.0)',
      marginLeft: '3%'
   }
});