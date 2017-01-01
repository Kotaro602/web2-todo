import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import TaskMemBxSbSi from './p-TaskMemBxSbSi'

export default class TaskSubBox extends Component {

   chgTaskMemo(){
      const {task, reqUpdateTask} = this.props;
      const taskMemoVal = this.refs.taskMemo.value;

      if(task.get('taskMemo') == taskMemoVal) return;
      reqUpdateTask(task.set('taskMemo', taskMemoVal));
   }

   render(){

      /** prop取得 **/
      const {task} = this.props;

      /** レンダリング **/
      return(
         <div className={css(styles.subBx)}>
            <div className={css(styles.memoIconBox)}>
               <img src="/images/memo-icon.png" className={css(styles.memoIcon)}/>
            </div>
            <div className={css(styles.memoTextBox)}>
               <textarea className={css(styles.memoText)}
                         defaultValue={task.get('taskMemo')}
                         ref='taskMemo'
                         rows="4" cols="10"
                         placeholder="Notes"
                         onBlur={::this.chgTaskMemo}/>
            </div>
            <TaskMemBxSbSi {...this.props} task={task}/>
         </div>
      );
   }
}

const styles = StyleSheet.create({
   subBx: {
      marginTop: 7
   },
   memoIconBox: {
      display: 'inline-block',
      verticalAlign: 'middle',
      marginLeft: '4px'
   },
   memoIcon: {
      width: '20px'
   },
   memoTextBox: {
      display: 'inline-block',
      verticalAlign: 'middle',
      width: 630,
      marginLeft: 10
   },
   memoText: {
      width: '100%',
      outline: '0',
      border: '0px',
      resize: 'none',
      backgroundColor: 'transparent'
   }
});