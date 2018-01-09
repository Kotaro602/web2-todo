import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {REDMINE_URL} from './../../../const';
import Textarea from 'react-textarea-autosize';
import Collapse from 'react-collapse';

export default class RedmineHeader extends Component {

   //defaultValueを更新する。
   componentWillReceiveProps(nextProps){
      this.refs.description.value = nextProps.task.get('description');
   }

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
            <div className={css(styles.taskName)}>{task.get('taskName')}</div>
            <br/>
            <div className={css(styles.date)}>開始日：{task.get('startDate')}</div>
            <div className={css(styles.date)}>締切日：{task.get('dueDate')}</div>
            <hr className={css(styles.descHr)}/>
            <div>説明</div>
            <Textarea
               className={css(styles.description)}
               defaultValue={task.get('description')}
               ref='description'
               readOnly/>
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
   date:{
     fontSize: 13
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