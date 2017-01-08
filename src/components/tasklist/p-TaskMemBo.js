import React from 'react';
import TaskMemBxMaIc from './p-TaskMemBxMaIc';
import TaskName from './p-TaskMemBxMaNa';
import TaskMemBxMaPr from './p-TaskMemBxMaPr';
import TaskMemBxMaEs from './p-TaskMemBxMaEs';
import { StyleSheet, css } from 'aphrodite/no-important';
import DatePicker  from 'react-datepicker';
import * as Immutable from 'immutable';
import moment from 'moment';

export default class TaskMemBo extends React.Component {

   render(){

      /** prop取得 **/
      const {task} = this.props;

      /** レンダリング **/
      return(
         <div className={css(styles.borderBox)}>
            <div className={css(styles.borderLine)}>
               <span className={css(styles.borderSpan)}>{task.getIn(['project', 'name'])}</span>
            </div>
         </div>
      );
   }
}

const styles = StyleSheet.create({
   borderBox: {
      position: 'relative',
      marginTop: 25,
      marginBottom: 20,
      marginLeft: 5,
      marginRight: 5,
      paddingBottom: 1,
      width: '100%'
   },
   borderLine:{
      position: 'absolute',
      top: '50%',
      zIndex: 1,
      display: 'block',
      width: '100%',
      height: 1,
      backgroundColor: '#ccc'
   },
   borderSpan:{
      fontWeight: 'bold',
      position: 'relative',
      top: -7,
      left: 20,
      zIndex: 2,
      display: 'inline-block',
      padding: '0 10px',
      backgroundColor: '#fff',
      textAlign: 'left'
   }
});