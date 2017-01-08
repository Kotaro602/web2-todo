import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';


export default class TaskUser extends Component {

    render() {

       /** prop取得 **/
       const {member} = this.props;

       /** レンダリング **/
       return (
          <div className={css(styles.userNameBox)}>
             <span className={css(styles.userName)}>{member.get('userName')}</span>
             <div href="#" className={css(styles.configButton)}>
                <img src="/images/configure.png" className={css(styles.configIcon)}/>
                <span  className={css(styles.iconTriangle)}></span>

             </div>
          </div>
       );
    }
}


const styles = StyleSheet.create({
   userNameBox: {
      display: 'inline-block',
      boxSizing: 'border-box',
      width: '100%',
      padding: '3px 8px',
      marginBottom: '2px',
      textAlign: 'left',
      color: '#222',
      borderLeft: '6px solid #ccc',
      borderBottom: '2px solid #aaa',
      font: '20px Tahoma',
      fontWeight: 'bold'
   },
   userName: {
      width: '100%'
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
      top: '18px',
      left: '8px',
      width: '0',
      height: '0',
      border: '5px solid transparent',
      borderTop: '8px solid #858585',
   }
});