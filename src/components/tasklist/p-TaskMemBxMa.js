import React from 'react';
import TaskMemBxMaIc from './p-TaskMemBxMaIc';
import TaskName from './p-TaskMemBxMaNa';
import TaskMemBxMaPr from './p-TaskMemBxMaPr';
import TaskMemBxMaEs from './p-TaskMemBxMaEs';
import { StyleSheet, css } from 'aphrodite/no-important';
import DatePicker  from 'react-datepicker';
import * as Immutable from 'immutable';
import moment from 'moment';

export default class TaskMainBox extends React.Component {

   /** ActionCreater呼び出し **/
   chgDueDate(date){
      const {task, reqUpdateTask} = this.props;

      if(task.get('dueDate') == date) return;
      if(task.get('redmineFlg')){
         alert('まだREDMINEから締切日を変更するロジックは未作成です');
         return;
      }
      reqUpdateTask(task.set('dueDate', date.format("YYYY-MM-DD")));
   }

   render(){

      /** prop取得 **/
      const {task} = this.props;

      /** レンダリング前処理 **/
      const dueDate = moment(task.get('dueDate'));

      /** レンダリング **/
      return(
         <div className={css(styles.taskMainBox)}>
            <TaskMemBxMaIc {...this.props} task={task}/>
            <TaskName {...this.props} task={task}/>
            <div className={css(styles.dueDateBox)}>
               <DatePicker
                  selected={dueDate}
                  onChange={::this.chgDueDate}
                  dateFormat="MM/DD"
                  placeholderText="03/01"
                  minDate={moment()}
                  className={css(styles.datepickerInput)}
                  popoverTargetOffset="12px -30px"/>
            </div>
            <TaskMemBxMaEs {...this.props} task={task}/>
            <TaskMemBxMaPr {...this.props} task={task}/>
         </div>
      );
   }
}

const styles = StyleSheet.create({
   taskMainBox: {
      height: 25
   },
   dueDateBox:{
      display: 'inline-block',
      height: 25,
      width: 40,
      margin: '0px 15px'
   },
   datepickerInput:{
      outline: 0,
      border: 0,
      width: '100%',
      cursor: 'pointer'
   }
});