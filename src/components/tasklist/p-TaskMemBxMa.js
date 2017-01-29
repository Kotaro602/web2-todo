import React from 'react';
import TaskMemBxMaIc from './p-TaskMemBxMaIc';
import TaskName from './p-TaskMemBxMaNa';
import TaskMemBxMaDa from './p-TaskMemBxMaDa';
import TaskMemBxMaPr from './p-TaskMemBxMaPr';
import TaskMemBxMaEs from './p-TaskMemBxMaEs';
import { StyleSheet, css } from 'aphrodite/no-important';

export default class TaskMainBox extends React.Component {

   render(){

      /** prop取得 **/
      const {task} = this.props;

      /** レンダリング **/
      return(
         <div className={css(styles.taskMainBox)}>
            <TaskMemBxMaPr {...this.props} task={task}/>
            <TaskMemBxMaDa {...this.props} task={task}/>
            <TaskMemBxMaIc {...this.props} task={task}/>
            <TaskName {...this.props} task={task}/>
         </div>
      );
   }
}

const styles = StyleSheet.create({
   taskMainBox: {
      height: 25
   }
});