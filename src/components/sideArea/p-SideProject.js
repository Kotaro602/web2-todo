import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';

export default class SideProject extends Component {

   render(){

      /** レンダリング **/
      return(
         <ul className={css(styles.sideUl)}>
            <li className={css(styles.publicBox)}>
               <span className={css(styles.publicTitle)}>private</span>
            </li>
            <li className={css(styles.projectBox)}>
               <span className={css(styles.projectTitle)}>関原 光太郎</span>
            </li>
            <li className={css(styles.publicBox)}>
               <span className={css(styles.publicTitle)}>public</span>
            </li>
            <li className={css(styles.projectBox, styles.projectActive)}>
               <span className={css(styles.projectTitle)}>18Main</span>
            </li>
            <li className={css(styles.projectBox)}>
               <span className={css(styles.projectTitle)}>18Enhance</span>
            </li>
            <li className={css(styles.projectBox)}>
               <span className={css(styles.projectTitle)}>19Pre</span>
            </li>
         </ul>
      );
   }
}

const styles = StyleSheet.create({
   sideUl: {
      padding: 0,
      margin: 0
   },
   publicBox:{
      position: 'relative',
      width: '100%',
      height: 35,
      color: '#5c798f'
   },
   publicTitle:{
      position: 'absolute',
      fontSize: '16px',
      top: 10,
      left: 15
   },
   projectBox:{
      position: 'relative',
      width: '100%',
      height: 35,
      color: '#869fb1',
      cursor: 'pointer'
   },
   projectTitle:{
      position: 'absolute',
      top: 8,
      left: 30
   },
   projectActive:{
      backgroundColor: '#505761',
      color: 'white !important'
   }
});