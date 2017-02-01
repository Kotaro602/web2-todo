import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Collapse from 'react-collapse';

export default class HeadIcon extends Component {

   actDispFilterTask() {
      alert('未作成');
   }

   actAddTask() {
      alert('未作成');
   };

   actCleanTask() {
      const {reqCleanTask} = this.props;
      reqCleanTask(549); //TODO ユーザーIDを追加する
   }

   actRefresh(){
      const {reqTasks, state} = this.props;
      reqTasks(state.get('tasks'));
   }

   render() {

      /** レンダリング **/
      return (
         <ul className={css(styles.iconArea)} >
            <li className={css(styles.iconBox)} onClick={::this.actDispFilterTask}>
               <img src="/images/funnel.png" className={css(styles.iconImage)}/>
            </li>
            <li className={css(styles.iconBox)} onClick={::this.actAddTask}>
               <img src="/images/add.png" className={css(styles.iconImage)}/>
            </li>
            <li className={css(styles.iconBox)} onClick={::this.actCleanTask}>
               <img src="/images/swipe.png" className={css(styles.iconImage)}/>
            </li>
            <li className={css(styles.iconBox)} onClick={::this.actRefresh}>
               <img src="/images/recycling.png" className={css(styles.iconImage)}/>
            </li>
         </ul>
   );
      }
   }

const styles = StyleSheet.create({
   iconArea: {
      float: 'right',
      margin: 0,
      padding: 0
   },
   iconBox:{
      display: 'inline-block',
      height: 35,
      width: 35,
      padding: '0px 5px',
      cursor: 'pointer'
   },
   iconImage: {
      width: 25,
      position: 'relative',
      top: 4
   }
});