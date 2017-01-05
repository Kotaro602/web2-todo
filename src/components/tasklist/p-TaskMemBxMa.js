import React from 'react';
import TaskMemBxMaIc from './p-TaskMemBxMaIc';
import TaskName from './p-TaskMemBxMaNa';
import TaskMemBxMaPr from './p-TaskMemBxMaPr';
import { StyleSheet, css } from 'aphrodite/no-important';
import DatePicker  from 'react-datepicker';
import * as Immutable from 'immutable';
import moment from 'moment';

export default class TaskMainBox extends React.Component {

   shouldComponentUpdate(nextProps) {
      const taskDiff = Immutable.is(nextProps.task, this.props.task);
      const confDiff = Immutable.is(nextProps.state.get('conf'), this.props.state.get('conf'));
      return !(taskDiff && confDiff);
   }

   componentWillReceiveProps(nextProps){
      if(nextProps.task.get('estimate') !== this.props.task.get('estimate')){
         if(nextProps.task.get('estimate') === undefined) {
            this.refs.estimate.value = "";
         }else{
            this.refs.estimate.value = nextProps.task.get('estimate');
         }
      }
   }

   /** ActionCreater呼び出し **/
   chgDueDate(date){
      const {task, reqUpdateTask} = this.props;

      if(task.get('dueDate') == date) return;
      reqUpdateTask(task.set('dueDate', date));
   }

   chgEstimateHour(){
      const {task, reqUpdateTask} = this.props;
      const estimateHour = this.refs.estimate.value;

      if((estimateHour == '') || task.get('estimate') == estimateHour) return;
      reqUpdateTask(task.set('estimate', estimateHour));
   }

   render(){

      /** prop取得 **/
      const {task} = this.props;

      /** レンダリング前処理 **/
      const dueDate = moment(task.get('dueDate'));

      /** レンダリング **/
      return(
         <div className={css(styles.taskNameBox)}>
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
            <div className={css(styles.estimateBox)}>
               <input type="number"
                      list="estimateDateInput"
                      step="0.5" min="0"
                      className={css(styles.estimateInput)}
                      placeholder="-"
                      ref='estimate'
                      defaultValue={task.get('estimate')}
                      onChange={::this.chgEstimateHour}/>
               <datalist id="estimateDateInput">
                  <option value="0.5"></option>
                  <option value="1.0"></option>
                  <option value="1.5"></option>
                  <option value="2.0"></option>
                  <option value="2.5"></option>
                  <option value="3.0"></option>
                  <option value="3.5"></option>
                  <option value="4.0"></option>
                  <option value="4.5"></option>
                  <option value="5.0"></option>
                  <option value="5.5"></option>
                  <option value="6.0"></option>
               </datalist>
            </div>
            <TaskMemBxMaPr {...this.props} task={task}/>
         </div>
      );
   }
}

const styles = StyleSheet.create({
   taskNameBox: {
      height: '21px'
   },
   dueDateBox:{
      display: 'inline-block',
         height: 21,
         width: '9%'
   },
   datepickerInput:{
      outline: 0,
      border: 0,
      width: '100%',
      cursor: 'pointer'
   },
   estimateBox:{
      display: 'inline-block',
      width: '9%'
   },
   estimateInput:{
      outline: '0',
      border: '0px',
      width: '100%'
   }
});