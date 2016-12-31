import React from 'react'
import {List} from 'immutable';

import { DragDropContext } from 'react-dnd';
import ReactDnDHTML5Backend from 'react-dnd-html5-backend'

import TaskMemSo from './p-TaskMemBx'

@DragDropContext(ReactDnDHTML5Backend)
export default class TaskMemberList extends React.Component {

   render(){

      /** style取得 **/
      const style = getStyle();

      /** prop取得 **/
      const {state, member} = this.props;
      const tasks = state.get('tasks');
      const sortNoList = member.get('sortNoList');

      const getfilterAndSortTasks = (() => {

         let filterAndSortTasks = List([]);
         for(let i = 0; i < sortNoList.size; i++){
            const taskIndex = tasks.findIndex(task => task.get('_id') === sortNoList.get(i));
            if(taskIndex !== -1 && !tasks.get(taskIndex).get('compDelFlg')){
               filterAndSortTasks = filterAndSortTasks.push(tasks.get(taskIndex));
            }
         }
         return filterAndSortTasks;
      })();

        /** レンダリング **/
        return(
            <ul style={style.taskListUl} >
            {getfilterAndSortTasks.map((task, i)=> (
               <TaskMemSo key={i} task={task} {...this.props} />
            ))}
            </ul>
        );

        function getStyle() {
            return {
                taskListUl: {
                    listStyle:'none',
                    marginTop:'5px',
                    padding:'0px'
                }
            };
        }
    }
}