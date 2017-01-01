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

// const modalStyle = {
//    container : {
//       width: 770,
//       border: '1px solid rgba(3, 169, 244, 0.3)',
//       borderRadius: 10,
//       backgroundColor: 'rgb(226, 226, 226)',
//       position :'absolute',
//       zIndex : '100'
//    }
// }

const styles = StyleSheet.create({
   projectTitleBox: {
      padding: '5px 0px',
      marginTop: 10,
      width: 815,
      position: 'fixed',
      top: 0,
      backgroundColor: 'white',
      zIndex: 10,
      borderBottom: '1px solid rgba(170, 170, 170, 0.7)'
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