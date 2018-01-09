import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {REDMINE_URL} from './../../../const';
import Collapse from 'react-collapse';

export default class RedmineHeader extends Component {

   openRedmineUrl(){
      const {task} = this.props;
      const url = REDMINE_URL + '/issues/' + task.get('_id');
      window.open(url);
   }

   render() {

      /** prop取得 **/
      const {task} = this.props;

      /** レンダリング **/
      return (
         <div className={css(styles.headerArea)}>
            <h3 className={css(styles.redmineId)}>
               #{task.get('_id')} {task.getIn(['tracker', 'name'])}
            </h3>
            <a href="javascript:void(0)" onClick={::this.openRedmineUrl}>
               <span className={css(styles.redmineLink)}>
                  Redmineで確認する
               </span>
            </a>
         </div>
      );
   }
}

const styles = StyleSheet.create({
   headerArea: {
      margin: 10
   },
   redmineId:{
      display: 'inline-block',
      margin: 0,
      width: 600
   },
   redmineLink:{
      display: 'inline-block',
      verticalAlign: 'bottom',
      ':hover':{
         textDecoration: 'underline'
      }
   },
   mainArea:{
      backgroundColor: '#ffffe6',
      width: '100%',
      height: 300
   },
});