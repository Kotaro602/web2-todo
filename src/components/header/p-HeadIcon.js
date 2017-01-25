import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Collapse from 'react-collapse';

export default class HeadIcon extends Component {

   actCleanTask() {
      const {reqCleanTask} = this.props;
      reqCleanTask(549);
   }

   render() {

      /** レンダリング **/
      return (
         <div className={css(styles.iconArea)} >
            <div className={css(styles.iconBox)}>
               <img src="/images/sort-alphabet.png" className={css(styles.iconImage)}/>
            </div>
            <div className={css(styles.iconBox)} onClick={::this.actCleanTask}>
               <img src="/images/recycling.png" className={css(styles.iconImage)}/>
            </div>
         </div>
      );
      }
   }

const styles = StyleSheet.create({
   iconArea: {
      float: 'right',
      marginRight: 10
   },
   iconBox:{
      display: 'inline-block',
      height: 35,
      width: 35,
      margin: '0px 5px'
   },
   iconImage: {
      width: 28,
      position: 'relative',
      top: 2,
      cursor: 'pointer'
   }
});