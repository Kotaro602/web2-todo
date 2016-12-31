import React, { Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {createFormatDate} from '../../lib/utils';

export default class TaskButton extends Component {

   /** ActionCreater呼び出し **/
   actOpenTask(e) {
      const {reqAddTask} = this.props;

      let addTaskObject = new Object();
      let redmineUserId = e.currentTarget.getAttribute('data-id');
      addTaskObject.redmineUserId = parseFloat(redmineUserId);
      addTaskObject._id = redmineUserId + createFormatDate();
      addTaskObject.redmineFlg = false;

      reqAddTask(addTaskObject);
   }

   actCleanTask() {
      const {reqCleanTask, member} = this.props;
      reqCleanTask(member.get('_id'));
   }

   render() {

   /** prop取得 **/
   const {member} = this.props;

   /** レンダリング **/
   return (
      <div className={css(styles.taskFooterBox)}>
         <button onClick={::this.actOpenTask}
         data-id={member.get('_id')}
         className={css(styles.buttonCommon, styles.addTaskButton)}>＋ ADD</button>
         <button className={css(styles.buttonCommon, styles.groupTask)}>∟ GROUP</button>
         <button onClick={::this.actCleanTask}
         className={css(styles.buttonCommon, styles.cleaningTask)}>－ CLEAN</button>
      </div>
   );
   }
}

const styles = StyleSheet.create({
   taskFooterBox: {
      paddingBottom: '35px'
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
      marginLeft: '56%'
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