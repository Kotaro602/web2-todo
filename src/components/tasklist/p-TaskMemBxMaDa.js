import React from 'react';
import TaskMemBxMaIc from './p-TaskMemBxMaIc';
import TaskName from './p-TaskMemBxMaNa';
import TaskMemBxMaPr from './p-TaskMemBxMaPr';
import TaskMemBxMaEs from './p-TaskMemBxMaEs';
import { StyleSheet, css } from 'aphrodite/no-important';
import DatePicker  from 'react-datepicker';
import * as Immutable from 'immutable';
import moment from 'moment';

export default class TaskMemBxMaDa extends React.Component {

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
      const remainDays = dueDate.diff(moment(), 'days');

      const inputStyle = css(
         styles.datepickerInput,
         remainDays < 0 && styles.limitOver,
      )

      /** レンダリング **/
      return(
         <div className={css(styles.dueDateBox)}>
            <DatePicker
               selected={dueDate}
               onChange={::this.chgDueDate}
               dateFormat="MM/DD"
               placeholderText="03/01"
               minDate={moment()}
               className={inputStyle}
               popoverTargetOffset='12px -30px'/>
         </div>
      );
   }
}

const styles = StyleSheet.create({
   dueDateBox:{
      display: 'inline-block',
      height: 25,
      width: 50,
      margin: '0px 10px'
   },
   datepickerInput:{
      outline: 0,
      border: 0,
      width: '100%',
      cursor: 'pointer'
   },
   limitWarning:{
      color:'#e68100'
   },
   limitOver:{
      color: 'red !important'
   }
});