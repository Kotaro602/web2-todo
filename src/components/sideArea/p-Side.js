import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import SideSearch from './p-SideSearch';
import SidePublic from './p-SidePublic';

export default class SideArea extends Component {

   render(){

      /** レンダリング **/
      return(
         <div>
            <div className={css(styles.titleBox)}>
               <span className={css(styles.title)}>WEB2-todo</span>
               <span className={css(styles.version)}>ver0.1</span>
            </div>
            <SideSearch {...this.props} />
            <ul className={css(styles.sideUl)}>
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
         </div>
      );
   }
}

const styles = StyleSheet.create({
   titleBox:{
      paddingTop: 10,
      width: '100%',
      height: 35,
      textAlign: 'center',
      backgroundColor: '#42464c'
   },
   title: {
      font: '18px "Comic Sans MS", Helvetica, Arial, sans-serif',
      color: '#eaeaea',
      margin: 0
   },
   version: {
      color: '#eaeaea',
      textAlign: 'right',
      paddingLeft: 5
   },
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
      color: '#869fb1'
   },
   projectTitle:{
      position: 'absolute',
      top: 10,
      left: 25
   },
   projectActive:{
      backgroundColor: '#505761',
      color: 'white !important'
   }
});