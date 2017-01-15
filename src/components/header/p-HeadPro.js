import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Collapse from 'react-collapse';

export default class HeadPro extends Component {

   render() {

      /** prop取得 **/
      const {member , isOpened} = this.props;

      /** レンダリング **/
      return (
         <div>
            <a className={css(styles.titleLink)}>
               <span className={css(styles.projectTitle)}>18Main</span>
               <img src="/images/underArrow.png" className={css(styles.underArrowImg)}/>
            </a>
         </div>
      );
      }
   }

const styles = StyleSheet.create({
   titleLink: {
      position: 'absolute',
      top: 7,
      left: 20,
      cursor :'pointer',
      ':hover > img':{
         opacity: 1,
      },
   },
   projectTitle: {
      fontSize: 18
   },
   underArrowImg: {
      width: 12,
      opacity: 0.3,
      position: 'relative',
      top: -3,
      left: 8,
      color: 'white'
   }
});