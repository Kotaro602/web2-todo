import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {substr} from '../../lib/utils';
import Immutable from 'immutable';
import {shouldComponentUpdate} from 'react-addons-pure-render-mixin'

export default class TaskMemBxMaIc extends Component {

   shouldComponentUpdate = shouldComponentUpdate;

   //タスク一時完了
   chgTempCompFlg() {
      const {task, reqUpdateTask} = this.props;
      const nextTempDelFlg = !task.get('tempDelFlg');

      reqUpdateTask(task.set('tempDelFlg', nextTempDelFlg));
   }

   //Redmineモーダルを開く
   openRedmineModal(e) {

      const {state, task, openRedmineModal, reqRedmineDetail} = this.props;
      const openId = task.get('_id');

      openRedmineModal(openId);
      reqRedmineDetail(openId);
   }

   render(){

      /** prop取得 **/
      const {task} = this.props;

      /** レンダリング前処理 **/
      let chkBoxDOM;
      if(task.get('redmineFlg')) {
         chkBoxDOM = <span className={css(styles.redmineIcon)} onClick={::this.openRedmineModal}>R</span>;
      }else if(task.get('slackFlg')){
            chkBoxDOM = <span className={css(styles.slackIcon)}>S</span>;
      }else if(task.get('officeFlg')){
         chkBoxDOM = <span className={css(styles.mailIcon)}>M</span>;
      }else if(task.get('tempDelFlg')){
         chkBoxDOM = <span className={css(styles.taskCompBoxChecked)} onClick={::this.chgTempCompFlg}>&#x2713;</span>;
      }else{
         chkBoxDOM = <span className={css(styles.taskCompBox)} onClick={::this.chgTempCompFlg}></span>;
      }

      /** レンダリング **/
      return(
         <div className={css(styles.taskCheckBox)}>
            <input type="checkbox" className={css(styles.taskCompCheckBox)}/>
            {chkBoxDOM}
         </div>
      );
    }
}

const styles = StyleSheet.create({
   taskCheckBox:{
      display: 'inline-block',
      width: 28,
      marginTop: 4
   },
   redmineIcon: {
      width: '16px',
      height: '16px',
      marginRight: '2px',
      marginLeft: '4px',
      display: 'inline-block',
      backgroundColor: '#d80a1f',
      borderRadius: '3px',
      cursor: 'pointer',
      verticalAlign: 'middle',
      textAlign: 'center',
      color: '#fafafa',
      fontSize: '14px',
      WebkitUserSelect: 'none'
   },
   slackIcon:{
      width: '16px',
      height: '16px',
      marginRight: '2px',
      marginLeft: '4px',
      display: 'inline-block',
      backgroundColor: '#6506d8',
      borderRadius: '3px',
      cursor: 'pointer',
      verticalAlign: 'middle',
      textAlign: 'center',
      color: '#fafafa',
      fontSize: '14px',
      WebkitUserSelect: 'none'
   },
   mailIcon:{
      width: '16px',
      height: '16px',
      marginRight: '2px',
      marginLeft: '4px',
      display: 'inline-block',
      backgroundColor: '#074fd8eb',
      borderRadius: '3px',
      cursor: 'pointer',
      verticalAlign: 'middle',
      textAlign: 'center',
      color: '#fafafa',
      fontSize: '14px',
      WebkitUserSelect: 'none'
   },
   taskCompCheckBox: {
      display: 'none'
   },
   taskCompBox: {
      width: '11.5px',
      height: '11.5px',
      marginRight: '4px',
      marginLeft: '4px',
      display: 'inline-block',
      backgroundColor: '#fff',
      borderRadius: '3px',
      border: 'solid 2px #3baae3',
      cursor: 'pointer',
      verticalAlign: 'middle'
   },
   taskCompBoxChecked: {
      width: '11.5px',
      height: '11.5px',
      marginRight: '4px',
      marginLeft: '4px',
      display: 'inline-block',
      backgroundColor: '#fff',
      borderRadius: '3px',
      border: 'solid 2px #3baae3',
      cursor: 'pointer',
      verticalAlign: 'middle',
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#3baae3',
      opacity: '0.5'
   },
   pointer:{
      cursor: 'pointer'
   }
});