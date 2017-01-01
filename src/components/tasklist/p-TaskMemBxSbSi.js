import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';

export default class TaskMemBxSbSi extends Component {

   render(){

   /** prop取得 **/
   const {task} = this.props; 

   /** レンダリング **/
   return(
      <div className={css(styles.taskSubSideBox)}>
         <a className={css(styles.imgBx)}>
            <img src="/images/Excel_D.png" className={css(styles.img, styles.nonActive)}/>
         </a>
         <a className={css(styles.imgBx)}>
            <img src="/images/unlock.png" className={css(styles.img, styles.nonActive)}/>
         </a>
         <a className={css(styles.imgBx)}>
            <img src="/images/clock.png" className={css(styles.img)}/>
         </a>
         <a className={css(styles.imgBx)}>
            <img src="/images/info.png" className={css(styles.img)}/>
         </a>
      </div>
      );
   }
}

const styles = StyleSheet.create({
   taskSubSideBox: {
      marginRight: 20,
      width: 70,
      float: 'right'
   },
   imgBx:{
      margin: 4,
      float: 'right',
      cursor: 'pointer'
   },
   img:{
      width: 18,
      height: 18
   },
   button: {
      display: 'block',
      margin: 8,
      width: 70,
      border: 'solid 1px #0070a3',
      color: '#000000',
      borderRadius: '4px',
      textAlign: 'center',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      fontSize: '12px',
      ':hover':{
         backgroundColor: 'rgba(187, 216, 251, 0.4)'
      }
   },
   nonActive:{
      opacity: 0.3
   }
});