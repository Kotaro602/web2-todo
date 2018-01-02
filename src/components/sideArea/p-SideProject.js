import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import channels from "../../reducers/r-channels";

export default class SideProject extends Component {

   //グループを変更する
   changeGroup(e) {
      const channelId = e.target.getAttribute('data-channel') ? e.target.getAttribute('data-channel') : undefined;
      this.props.changeGroup(channelId);
   }

   taskName = (id) => this.props.state.get('channels').find(channel => channel._id === id).channelName;

   render(){

      const {state} = this.props;

      const userName = !!state.getIn(['account', 'userName']) ? state.getIn(['account', 'userName']) : '-';
      const selectConf = state.getIn(['conf', 'selectGroup']);
      const nonActiveStyle = css(styles.projectBox);
      const activeStyle = css(styles.projectBox, styles.projectActive);

      const watchGroupList = state.getIn(['account', 'watchGroup']);

      /** レンダリング **/
      return(
         <ul className={css(styles.sideUl)}>
            <li className={css(styles.publicBox)}>
               <span className={css(styles.publicTitle)}>account</span>
            </li>
            <li className={!!selectConf ? nonActiveStyle : activeStyle} onClick={::this.changeGroup}>
               <span className={css(styles.projectTitle)}>{userName}</span>
            </li>
            <li className={css(styles.publicBox)}>
               <span className={css(styles.publicTitle)}>group</span>
            </li>
            {watchGroupList && watchGroupList.map(id => (
               <li key={id} className={selectConf === id ? activeStyle : nonActiveStyle}
                   data-channel={id} onClick={::this.changeGroup}>
                  <span data-channel={id} className={css(styles.projectTitle)}>{::this.taskName(id)}</span>
               </li>
            ))}
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
      backgroundColor: '#646971',
      color: 'white !important'
   }
});