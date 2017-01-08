import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Collapse from 'react-collapse';

export default class TaskUser extends Component {

    render() {

       /** prop取得 **/
       const {member , isOpened} = this.props;

       /** レンダリング **/
       return (
          <div className={css(styles.userNameBox)}>
             <div className={css(styles.userLine)}></div>
             <span className={css(styles.userName)}>{member.get('userName')}</span>
          </div>
       );
    }
}

const styles = StyleSheet.create({
   userNameBox: {
      position: 'relative',
      display: 'inline-block',
      width: '100%',
      padding: '3px 0px',
      marginBottom: 2,
      marginLeft:5,
      borderBottom: '1px solid rgba(170, 170, 170, 0.55)',
      font: '20px Tahoma',
      fontWeight: 'bold'
   },
   userLine:{
      position: 'absolute',
      top: 5,
      left: 2,
      width: 6,
      height: 24,
      backgroundColor: '#3498db',
      borderRadius: 4
   },
   userName: {
      marginLeft: 20,
      lineHeight: 1.4
   },
   configButton: {
      display: 'inline-block',
      width: '40px',
      marginLeft: '600px',
      position: 'relative',
      top: '3px',
      cursor: 'pointer',
      ':hover': {
         borderRadius: '4px',
         backgroundColor: 'rgb(226, 226, 226)'
      }
   },
   configIcon: {
      width: '16px',
      position: 'relative',
      top: '1px',
      left: '2px',
   },
   iconTriangle:{
      position: 'relative',
      top: '12px',
      left: '8px',
      width: '0',
      height: '0',
      border: '5px solid transparent',
      borderTop: '5px solid #858585',
   }
});