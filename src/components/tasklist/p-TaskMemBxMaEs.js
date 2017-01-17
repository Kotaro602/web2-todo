import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import * as Immutable from 'immutable';

export default class TaskMemBxMaEs extends React.Component {

   componentWillReceiveProps(nextProps){
      if(nextProps.task.get('estimate') !== this.props.task.get('estimate')){
         if(nextProps.task.get('estimate') === undefined) this.refs.estimate.value = undefined;
         else this.refs.estimate.value = nextProps.task.get('estimate').toFixed(1);
      }
   }

   chgEstimateHour(){
      const {task, reqUpdateTask} = this.props;
      const estimateHour = parseFloat(this.refs.estimate.value);

      if((estimateHour == '') || task.get('estimate') == estimateHour) return;
      reqUpdateTask(task.set('estimate', estimateHour));
   }

   render(){

      /** prop取得 **/
      const {task} = this.props;
      const estimate = task.get('estimate') === undefined ? undefined : task.get('estimate').toFixed(1);

      /** レンダリング **/
      return(
         <div className={css(styles.estimateBox)}>
            <input type="number"
               list="estimateDateInput"
               step="0.5" min="0.0"
               className={css(styles.estimateInput)}
               placeholder="-"
               ref='estimate'
               defaultValue={estimate}
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
      );
   }
}

const styles = StyleSheet.create({
   estimateBox:{
      display: 'inline-block',
      width: 45,
      marginLeft: 15
   },
   estimateInput:{
      outline: '0',
      border: '0px',
      width: '100%'
   }
});