import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Collapse from 'react-collapse';

export default class TaskUser extends Component {

   constructor(props) {
      super(props)
      this.state = {
         isOpened: false
      };
   }

   isOpen(e) {
      e.preventDefault();
      this.setState({ isOpened : !this.state.isOpened});
   }

    render() {

       /** prop取得 **/
       const {member , isOpened} = this.props;

       /** レンダリング **/
       return (
          <div>
             <div className={css(styles.userNameBox)}>
                <img src="/images/slack-icon.png" className={css(styles.userIcon)}/>
                <span className={css(styles.userName)}>{member.get('userName')}</span>
                <div href="#" className={css(styles.configButton)} onClick={this.isOpen.bind(this)}>
                   <img src="/images/configure.png" className={css(styles.configIcon)}/>
                   <span  className={css(styles.iconTriangle)}></span>
                </div>
             </div>
             <Collapse
                style={modalStyle.container}
                isOpened={this.state.isOpened}
                keepCollapsedContent={false}
             >
                <div style={{padding: 10, height: 200}}>ユーザごとのタスク表示設定エリア</div>
            </Collapse>
          </div>
       );
    }
}

const modalStyle = {
   container : {
      width: 770,
      border: '1px solid rgba(3, 169, 244, 0.3)',
      borderRadius: 10,
      backgroundColor: 'rgb(226, 226, 226)',
      position :'absolute',
      zIndex : '100'
   }
}

const styles = StyleSheet.create({
   userNameBox: {
      display: 'inline-block',
      width: '100%',
      padding: '3px 0px',
      marginBottom: 2,
      borderBottom: '1px solid rgba(170, 170, 170, 0.55)',
      font: '20px Tahoma',
      fontWeight: 'bold'
   },
   userIcon:{
      verticalAlign: 'bottom',
      width: '22px'
   },
   userName: {
      marginLeft: 5
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