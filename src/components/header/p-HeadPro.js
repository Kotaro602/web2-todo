import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Collapse from 'react-collapse';

export default class HeadPro extends Component {

   render() {

      /** prop取得 **/
      const {member , isOpened} = this.props;

      /** レンダリング **/
      return (
         <a className={css(styles.titleLink)}>
            <span className={css(styles.projectTitle)}>18Main</span>
         </a>
      );
      }
   }

const styles = StyleSheet.create({
   titleLink: {
      display: 'inline-block',
      width: 180,
      cursor :'pointer',
      ':hover > img':{
         opacity: 1,
      }
   },
   projectTitle: {
      fontSize: 18,
      position: 'relative',
      top: 7,
      left: 25
   }
   // underArrowImg: {
   //    width: 12,
   //    opacity: 0.3,
   //    position: 'relative',
   //    top: -3,
   //    left: 8,
   //    color: 'white'
   // }
});