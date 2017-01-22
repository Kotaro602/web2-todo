import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {REDMINE_URL} from './../../../const';
import Textarea from 'react-textarea-autosize';
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
         <div className={css(styles.mainArea)}>
            <span className={css(styles.taskName)}>{task.get('taskName')}</span>
            <hr className={css(styles.descHr)}/>
            <div>説明</div>
            <Textarea
               className={css(styles.description)}
               defaultValue={task.get('description')}
               readOnly/>
            {/*            タスク名称：{task.get('taskName')}<br/>
             プロジェクト：{task.getIn(['project', 'name'])}<br/>
             トラッカー：{task.getIn(['tracker', 'name'])}<br/>
             ディスクリプション：{task.get('description')}<br/>
             WEB2メモ：{task.get('taskName')}<br/>
             開始日：{task.get('startDate')}<br/>
             締切日：{task.get('dueDate')}
             {task.get('description')}
             */}
         </div>
      );
   }
}

const styles = StyleSheet.create({
   mainArea:{
      backgroundColor: '#ffffe6',
      margin: '0px 10px',
      padding: 5,
      borderRadius: 4,
      border: '1px solid #d2d0d0'
   },
   taskName:{
   },
   descHr:{
      border: '1px solid rgb(204,204,204)'
   },
   descriptionBox:{
     fontSize: 12
   },
   description:{
      width: '100%',
      outline: '0',
      border: '0px',
      resize: 'none',
      backgroundColor: 'transparent'
   }
});