import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Collapse from 'react-collapse';

export default class TaskUser extends Component {

   render() {

      /** prop取得 **/
      const {member , isOpened} = this.props;

      /** レンダリング **/
      return (
         <div className={css(styles.projectTitleBox)}>
            <a className={css(styles.titleLink)}>
               <span className={css(styles.projectTitle)}>#18MAIN</span>
               <img src="/images/underArrow.png" className={css(styles.underArrowImg)}/>
            </a>
         </div>
      );
      }
   }

const styles = StyleSheet.create({
   projectTitleBox: {
      paddingLeft: 10,
      paddingTop: 10,
      width: '100%',
      height: 35,
      borderBottom: '1px solid rgba(170, 170, 170, 0.5)',
   },
   titleLink: {
      cursor :'pointer',
      ':hover > img':{
         opacity: 1,
      },
   },
   projectTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'arial black'
   },
   underArrowImg: {
      width: 12,
      opacity: 0.3,
      position: 'relative',
      top: -3,
      left: 8
   }
});