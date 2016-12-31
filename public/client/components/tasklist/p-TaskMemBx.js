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
      console.log('ここでActionに投げる');
   }
}
const taskTarget = {

   hover(hoverProps, monitor, component) {

      const dragTask = monitor.getItem().task;

      const dragTaskId = dragTask.get('_id');
      const dragUserId = dragTask.get('redmineUserId');
      const hoverTaskId = hoverProps.task.get('_id');
      const hoverUserId = hoverProps.task.get('redmineUserId');

      if (dragTaskId === hoverTaskId) return;

      const members = hoverProps.state.get('members');
      let dragSortNoList = members.filter(m => m.get('_id') == dragUserId).get(0).get('sortNoList');
      const dragTaskIndex = dragSortNoList.indexOf(dragTaskId);
      let hoverSortNoList = members.filter(m => m.get('_id') == hoverUserId).get(0).get('sortNoList');
      const hoverTaskIndex = hoverSortNoList.indexOf(hoverTaskId);

      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if(dragUserId == hoverUserId){
         //同じ人物のタスクにソートした場合
         const upwardsFlg = dragTaskIndex > hoverTaskIndex;
         if (upwardsFlg && hoverClientY > hoverMiddleY) return;
         if (!upwardsFlg && hoverClientY < hoverMiddleY) return;

         if(upwardsFlg) {
            dragSortNoList = dragSortNoList.splice(dragTaskIndex-1, 2, dragSortNoList.get(dragTaskIndex), dragSortNoList.get(dragTaskIndex-1));
         }else {
            dragSortNoList = dragSortNoList.splice(dragTaskIndex, 2, dragSortNoList.get(dragTaskIndex+1), dragSortNoList.get(dragTaskIndex));
         }

      }else{
         //別人物のタスクにソートした場合
         const upwardsFlg = dragTaskIndex < hoverTaskIndex;

         dragSortNoList = dragSortNoList.splice(dragTaskIndex, 1);
         if(upwardsFlg) {
            hoverSortNoList = hoverSortNoList.push(dragTaskId);
         }else {
            hoverSortNoList = hoverSortNoList.unshift(dragTaskId);
         }

         //monitor(ドラッグ中のtask)を更新する
         monitor.getItem().task = dragTask.set('redmineUserId', hoverUserId);
      }

      //Actionにソート結果を投げる
      hoverProps.chgSortNo(dragTaskId, dragUserId, dragSortNoList, hoverUserId, hoverSortNoList);
   }
};

function arePropsEqual(nextProps, props){

   const taskDiff = Immutable.is(nextProps.task, props.task);
   const confDiff = Immutable.is(nextProps.state.get('conf'), props.state.get('conf'));
   return taskDiff && confDiff;
}

@DropTarget(TASK_SORT, taskTarget, connect => ({
   connectDropTarget: connect.dropTarget()
}))
@DragSource(TASK_SORT, taskSource, (connect, monitor) => {
   const isDraggingTaskId = monitor.getItem() != null ? monitor.getItem().task.get('_id') : null;
   return {
      connectDragSource: connect.dragSource(),
      isDraggingTaskId: isDraggingTaskId
   }
},{arePropsEqual})

export default class TaskMemSo extends React.Component {

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

