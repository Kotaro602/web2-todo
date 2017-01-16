import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Collapse from 'react-collapse';

export default class HeadIcon extends Component {

   render() {

      /** prop取得 **/
      const {member , isOpened} = this.props;

      /** レンダリング **/
      return (
         <div className={css(styles.iconArea)}>
            <img src="/images/refresh-icon.png" className={css(styles.refreshImg)}/>
         </div>
      );
      }
   }

const styles = StyleSheet.create({
   iconArea: {
      float: 'right',
      width: 30,
      height: '100%'
   },
   refreshImg: {

   }
});