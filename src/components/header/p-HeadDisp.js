import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Collapse from 'react-collapse';

export default class HeadDisp extends Component {

   render() {

      /** prop取得 **/
      const {member , isOpened} = this.props;

      /** レンダリング **/
      return (
         <div className={css(styles.parentBox)}>
            <div className={css(styles.selectBox, styles.selectedBox)}>
               <span className={css(styles.selectName, styles.selectedTag)}>tasks</span>
            </div>
            <div className={css(styles.selectBox)}>
               <span className={css(styles.selectName)}>bord</span>
            </div>
            <div className={css(styles.selectBox)}>
               <span className={css(styles.selectName)}>Report</span>
            </div>
            <div className={css(styles.selectBox)}>
               <span className={css(styles.selectName)}>history</span>
            </div>
         </div>
      );
      }
   }

const styles = StyleSheet.create({
   parentBox:{
      display: 'inline-block'
   },
   selectBox: {
      display: 'inline-block',
      left: 230,
      height: '100%',
      width: 100,
      textAlign: 'center',
      color: '#dfe2e4'
   },
   selectName: {
      position: 'relative',
      top: 7,
      fontSize: 16
   },
   selectedBox: {
      backgroundColor: '#57bbef',
      color: 'white'
   },
   selectedTag: {
      fontSize: '18px'
   }
});