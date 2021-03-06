import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {REDMINE_URL} from './../../../const';
import Textarea from 'react-textarea-autosize';
import moment from 'moment';
import Collapse from 'react-collapse';

export default class RedmineJournal extends Component {

   openRedmineUrl(){
      const {task} = this.props;
      const url = REDMINE_URL + '/issues/' + task.get('_id');
      window.open(url);
   }

   render() {

      /** prop取得 **/
      const {journals} = this.props;

      /** レンダリング **/
      return (
         <div className={css(styles.journalArea)}>
            {journals.size > 0 && <div>履歴</div>}
            {journals.map((journal, i) => {
               return (
                  <div className={css(styles.journal)} key={i}>
                     <a className={css(styles.name)}>
                        <span>
                           {journal.getIn(['user', 'name'])}
                        </span>
                        <span className={css(styles.createOn)}>
                           {moment(journal.get('created_on')).format('YYYY-MM-DD hh:mm')}
                        </span>
                     </a>
                     <Textarea
                        className={css(styles.notes)}
                        defaultValue={journal.get('notes')}
                        readOnly/>
                  </div>
               )
            })}
         </div>
      );
   }
}

const styles = StyleSheet.create({
   journalArea:{
      margin: 10,
      marginBottom: 40
   },
   journal:{
      marginTop: 5

   },
   name:{
      color: 'blue',
      fontSize: 13
   },
   createOn:{
      marginLeft: 10,
     fontSize: 12
   },
   notes:{
      marginTop: 5,
      marginBottom: 10,
      width: '100%',
      outline: '0',
      border: '0px',
      resize: 'none',
      backgroundColor: 'transparent'
   }
});