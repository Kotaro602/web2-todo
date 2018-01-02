import React from 'react'
import { findDOMNode } from 'react-dom';
import Immutable from 'immutable';
import {TogglePattern,ToggleAndPattern} from "react-toggle-pattern";
import {DropTarget,DragSource} from 'react-dnd'
import {TASK_SORT} from './../../const'
import { StyleSheet, css } from 'aphrodite/no-important';
import TaskMainBox from './p-TaskMemBxMa'
import TaskSubBox from './p-TaskMemBxSb'
import TaskMemBxBo from './p-TaskMemBo'
import {shouldComponentUpdate} from 'react-addons-pure-render-mixin'

// const taskSource = {
//    beginDrag: function (props) {
//       return {
//          task: props.task
//       };
//    },endDrag: function(props, monitor){
//       props.reqChgSortList(props.task, monitor.getItem().task);
//    }
// }
// const taskTarget = {
//
//    hover(hoverProps, monitor, component) {
//
//       //drag中のタスクと、hoverしているタスクを取得
//       let dragTask = monitor.getItem().task;
//       let hoverTask = hoverProps.task;
//
//       const dragTaskId = dragTask.get('_id');
//       const hoverTaskId = hoverTask.get('_id');
//       if (dragTaskId === hoverTaskId) return; //同一タスク上ならば即リターン
//
//       const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
//       const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
//       const clientOffset = monitor.getClientOffset();
//       const hoverClientY = clientOffset.y - hoverBoundingRect.top;
//
//       let dragSortVal = dragTask.get('sortValue');
//       const hoverSortVal = hoverTask.get('sortValue');
//       const dragUserId = dragTask.get('redmineUserId');
//       const hoverUserId = hoverTask.get('redmineUserId');
//
//       const upwardsFlg = hoverSortVal < dragSortVal;
//
//       //同じ値のSortValが存在した場合、まず間違いなく変な動きするはずだけど一旦無視する。
//       if(dragSortVal == hoverSortVal) dragSortVal =  hoverSortVal - Math.random();
//
//       if(dragUserId == hoverUserId) {
//          //同じ人物のタスクにソートした場合
//          if (upwardsFlg && hoverClientY > hoverMiddleY) return;
//          if (!upwardsFlg && hoverClientY < hoverMiddleY) return;
//
//          dragTask = dragTask.set('sortValue', hoverSortVal);
//          hoverTask = hoverTask.set('sortValue', dragSortVal);
//       }else{
//          //別人物のタスクにソートした場合
//          console.log('別人物になったよ')
//          const nextDragSortVal = upwardsFlg ? hoverSortVal - Math.random() : hoverSortVal + Math.random();
//          dragTask = dragTask.set('redmineUserId', hoverUserId);
//          dragTask = dragTask.set('sortValue', nextDragSortVal);
//          console.log('dragTaskVal:'+ nextDragSortVal);
//          console.log('hoverTaskVal:'+ hoverSortVal);
//       }
//       monitor.getItem().task = dragTask;
//       hoverProps.chgSortNo(dragTask, hoverTask);
//    }
// };
//
// function arePropsEqual(nextProps, props){
//
//    const taskDiff = Immutable.is(nextProps.task, props.task);
//    const confDiff = Immutable.is(nextProps.state.get('conf'), props.state.get('conf'));
//    return taskDiff && confDiff;
// }
//
// function areDropPropsEqual(nextProps, props){
//
//    const taskDiff = Immutable.is(nextProps.task, props.task);
//    const confDiff = Immutable.is(nextProps.state.get('conf'), props.state.get('conf'));
//    return taskDiff && confDiff;
// }
//
// @DropTarget(TASK_SORT, taskTarget, connect => ({
//    connectDropTarget: connect.dropTarget()
// }))
// @DragSource(TASK_SORT, taskSource, (connect, monitor) => {
//    const isDraggingTaskId = monitor.getItem() != undefined ? monitor.getItem().task.get('_id') : undefined;
//    return {
//       connectDragSource: connect.dragSource(),
//       isDraggingTaskId: isDraggingTaskId
//    }
// },{arePropsEqual})

export default class TaskMemSo extends React.Component {

   shouldComponentUpdate(nextProps) {
      const taskSameFlg = Immutable.is(nextProps.task, this.props.task);

      const thisTaskId = this.props.task.get('_id');
      const preTaskSelectedId = nextProps.state.get('conf').get('selectTaskId');
      const nextTaskSelectedId = this.props.state.get('conf').get('selectTaskId');
      const preTaskOpenId = nextProps.state.get('conf').get('openTaskId');
      const nextTaskOpenId = this.props.state.get('conf').get('openTaskId');

      const taskOpenChgFlg = nextTaskOpenId === thisTaskId || preTaskOpenId === thisTaskId;
      const taskSelectChgFlg = nextTaskSelectedId === thisTaskId || preTaskSelectedId === thisTaskId;

      return !taskSameFlg || taskSelectChgFlg || taskOpenChgFlg;
   }

   render(){

      /** prop取得 **/
      const {state, task, isDraggingTaskId} = this.props;
      const selectedFlg = task.get('_id') === state.get('conf').get('selectTaskId');
      const openTaskFlg = state.get('conf').get('openTaskId') === task.get('_id');

      const taskBoxClass = css(
         styles.taskListBox,
         task.get('newFlg') && styles.newTask,
         selectedFlg && styles.selectedTask,
         openTaskFlg ? styles.taskOpen : styles.taskNoOpen,
         isDraggingTaskId === task.get('_id') && styles.taskDraggingLi
      );

      /** レンダリング **/
      return(
         <li id={task.get('_id')}
             className={taskBoxClass}>
            <TaskMainBox {...this.props}/>
            <ToggleAndPattern isTaskOpen={openTaskFlg}>
               <TaskSubBox isTaskOpen={true} {...this.props}/>
            </ToggleAndPattern>
         </li>
      );
   }
}

const styles = StyleSheet.create({
   taskListBox:{
      borderRadius: '5px',
      width: '100%',
      backgroundColor: 'white'
   },
   newTask:{
      backgroundColor: '#FFFDE7'
   },
   selectedTask:{
      backgroundColor: 'rgb(235, 249, 255) !important'
   },
   taskNoOpen:{
      padding: 1
   },
   taskOpen:{
      padding: 0,
      backgroundColor: 'rgb(235, 249, 255) !important',
      border: 'solid 1px #aaa'
   },
   taskDraggingLi: {
      opacity: '0.3'
   }
});

