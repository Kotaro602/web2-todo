import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';

import { DragDropContext } from 'react-dnd';
import ReactDnDHTML5Backend from 'react-dnd-html5-backend'

import TaskMemSo from './p-TaskMemBx'

@DragDropContext(ReactDnDHTML5Backend)
export default class TaskMemberList extends React.Component {

   render(){

      /** prop取得 **/
      const {state, member} = this.props;

      /** ユーザごとのタスク取得 & ソート処理 */
      const userId = member.get('_id');
      let taskList = state.get('tasks');
      taskList = taskList.filter(t => t.get('redmineUserId') == userId && !t.get('compDelFlg'));
      taskList= taskList.sort((a, b) => a.get('sortValue') - b.get('sortValue'));

      /** レンダリング **/
      return(
         <ul className={css(styles.taskListUl)} >
         {taskList.map((task, i)=> (
            <TaskMemSo key={i} task={task} {...this.props} />
         ))}
         </ul>
      )
   }
}

const styles = StyleSheet.create({
   taskListUl: {
      listStyle: 'none',
      marginTop: '5px',
      padding: '0px'
   }
})