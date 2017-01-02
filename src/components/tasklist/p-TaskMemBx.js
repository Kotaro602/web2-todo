import React from 'react'
import { findDOMNode } from 'react-dom';
import Immutable from 'immutable';
import {TogglePattern} from "react-toggle-pattern";
import {DropTarget,DragSource} from 'react-dnd'
import {TASK_SORT} from './../../const'
import { StyleSheet, css } from 'aphrodite/no-important';
import TaskMainBox from './p-TaskMemBxMa'
import TaskSubBox from './p-TaskMemBxSb'

const taskSource = {
   beginDrag: function (props) {
      return {
         task: props.task
      };
   },endDrag: function(props, monitor){
      //props.chgSortNo(props.task, monitor.getItem().task);
   }
}
const taskTarget = {

   hover(hoverProps, monitor, component) {

      //drag中のタスクと、hoverしているタスクを取得
      let dragTask = monitor.getItem().task;
      let hoverTask = hoverProps.task;

      const dragTaskId = dragTask.get('_id');
      const hoverTaskId = hoverTask.get('_id');
      if (dragTaskId === hoverTaskId) return; //同一タスク上ならば即リターン

      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      const dragSortVal = dragTask.get('sortValue');
      const hoverSortVal = hoverTask.get('sortValue');
      const dragUserId = dragTask.get('redmineUserId');
      const hoverUserId = hoverTask.get('redmineUserId');

      const upwardsFlg = hoverSortVal < dragSortVal;

      //ソートValが同じだったら、ホバー先を一つ変える。

      if(dragUserId == hoverUserId) {
         //同じ人物のタスクにソートした場合
         if (upwardsFlg && hoverClientY > hoverMiddleY) return;
         if (!upwardsFlg && hoverClientY < hoverMiddleY) return;

         const nextSortVal = upwardsFlg ? hoverSortVal + 1 : hoverSortVal - 1;
         dragTask = dragTask.set('sortValue', hoverSortVal);
         hoverTask = hoverTask.set('sortValue', dragSortVal);

         hoverProps.chgSortNo(dragTask, hoverTask);
      }else{
         //別人物のタスクにソートした場合
         dragTask = dragTask.set('redmineUserId', hoverUserId);
         dragTask = dragTask.set('sortValue', hoverSortVal - 1);

      }
      monitor.getItem().task = dragTask;
   }
};

function arePropsEqual(nextProps, props){

   const taskDiff = Immutable.is(nextProps.task, props.task);
   const confDiff = Immutable.is(nextProps.state.get('conf'), props.state.get('conf'));
   return taskDiff && confDiff;
}

function areDropPropsEqual(nextProps, props){

   const taskDiff = Immutable.is(nextProps.task, props.task);
   const confDiff = Immutable.is(nextProps.state.get('conf'), props.state.get('conf'));
   return taskDiff && confDiff;
}

@DropTarget(TASK_SORT, taskTarget, connect => ({
   connectDropTarget: connect.dropTarget()
}))
@DragSource(TASK_SORT, taskSource, (connect, monitor) => {
   const isDraggingTaskId = monitor.getItem() != undefined ? monitor.getItem().task.get('_id') : undefined;
   return {
      connectDragSource: connect.dragSource(),
      isDraggingTaskId: isDraggingTaskId
   }
},{arePropsEqual})

export default class TaskMemSo extends React.Component {

   shouldComponentUpdate(nextProps) {
      const taskDiff = Immutable.is(nextProps.task, this.props.task);
      const confDiff = Immutable.is(nextProps.state.get('conf'), this.props.state.get('conf'));
      const isDragging = this.props.isDraggingTaskId === nextProps.isDraggingTaskId;
      return !(taskDiff && isDragging && confDiff);
   }

   render(){

      /** prop取得 **/
      const {state, task, connectDragSource, connectDropTarget, isDraggingTaskId} = this.props;
      const openTaskId = state.get('conf').get('openTaskId');

      const taskBoxClass = css(
         styles.taskListBox,
         openTaskId != task.get('_id') ? styles.taskNoOpen : styles.taskOpen,
         openTaskId != task.get('_id') && styles.hover,
         isDraggingTaskId == task.get('_id') && styles.taskDraggingLi
      )

      /** レンダリング **/
      return(
         connectDragSource(connectDropTarget(
            <li id={task.get('_id')} className={taskBoxClass}>
               <TaskMainBox  {...this.props}/>
               <TogglePattern isTaskOpen={openTaskId == task.get('_id')}>
                  <TaskSubBox {...this.props} isTaskOpen={true}/>
               </TogglePattern>
            </li>
         ))
      );
   }
}

const styles = StyleSheet.create({
   hover: {
      ':hover': {
         backgroundColor: 'rgba(170, 229, 255, 0.33)'
      }
   },
   taskListBox:{
      borderRadius: '5px',
      width: '99%',
      tableLayout: 'fixed',
      backgroundColor: 'white'
   },
   taskNoOpen:{
      padding: '1px'
   },
   taskOpen:{
      padding: '0px',
      backgroundColor: 'rgba(170, 229, 255, 0.23)',
      border: 'solid 1px #aaa'
   },
   taskDraggingLi: {
      opacity: '0.3'
   }
});

