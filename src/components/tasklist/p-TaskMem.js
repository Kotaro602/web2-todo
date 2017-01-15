import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import Immutable from 'immutable';
import {TogglePattern} from "react-toggle-pattern";
import {sortAndFilterTask} from '../../model/m-Task';
import { DragDropContext } from 'react-dnd';
import ReactDnDHTML5Backend from 'react-dnd-html5-backend'
import TaskMemBo from './p-TaskMemBo'
import TaskMemSo from './p-TaskMemBx'

// @DragDropContext(ReactDnDHTML5Backend)
export default class TaskMemberList extends React.Component {

   shouldComponentUpdate(nextProps) {
      const stateDiff = Immutable.is(nextProps.state, this.props.state);
      return !stateDiff;
   }

   render(){

      /** prop取得 **/
      const {state, member} = this.props;

      /** ユーザごとのタスク取得 & ソート処理 */
      const taskList = sortAndFilterTask(state.get('tasks'), member.get('_id'));

      /** レンダリング **/
      return(
         <ul className={css(styles.taskListUl)} >
            {taskList.map((t, i)=> (
               <div key={i}>
                  <TogglePattern
                     isBorder={i == 0 || taskList.getIn([i - 1, 'project', 'id']) != t.getIn(['project', 'id'])}>
                     <TaskMemBo isBorder={true} task={t} {...this.props}/>
                  </TogglePattern>
                  <TaskMemSo task={t} {...this.props}/>
               </div>
            ))}
         </ul>
      )
   }
}

const styles = StyleSheet.create({
   taskListUl: {
      listStyle: 'none',
      marginTop: 10,
      marginLeft: 10,
      padding: '0px'
   }
})