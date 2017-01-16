import React from 'react';
import TaskMemSo from './p-TaskMemBx';
import {Map} from 'immutable';
import { StyleSheet, css } from 'aphrodite/no-important';
import {createNewTask} from '../../model/m-Task';

export default class TaskMemBo extends React.Component {

   /** ActionCreater呼び出し **/
   addTask() {
      const {taskList, member, reqAddTask} = this.props;
      const userId = member.get('_id');
      const project = Map({
         id : taskList.getIn([ 0, 'project', 'id']),
         name: taskList.getIn([ 0, 'project', 'name'])
      });

      reqAddTask(createNewTask(userId, project));
   }

   render(){

      /** prop取得 **/
      const {taskList} = this.props;

      /** レンダリング **/
      return(
         <div className={css(styles.borderBox)}>
            <div className={css(styles.borderLine)}>
               <span className={css(styles.borderSpan)}>{taskList.getIn([ 0, 'project', 'name'])}</span>
            </div>
            {taskList.map((task, i) => (
               <TaskMemSo task={task} key={i} {...this.props}/>
            ))}
            <div className={css(styles.addTaskArea)} onClick={::this.addTask}></div>
         </div>
      );
   }
}

const styles = StyleSheet.create({
   borderBox: {
      position: 'relative',
      marginTop: 20,
      marginLeft: 5,
      marginRight: 5,
      paddingBottom: 1,
      width: '100%'
   },
   borderLine:{
      position: 'absolute',
      top: -18,
      zIndex: 1,
      display: 'block',
      width: '100%',
      height: 1,
      backgroundColor: '#ccc'
   },
   borderSpan:{
      fontWeight: 'bold',
      position: 'relative',
      top: -7,
      left: 20,
      zIndex: 2,
      display: 'inline-block',
      padding: '0 10px',
      backgroundColor: '#fff',
      textAlign: 'left'
   },
   addTaskArea:{
      padding: 10,
      cursor: 'pointer'
   }
});