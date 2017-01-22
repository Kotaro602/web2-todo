import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {REDMINE_URL} from './../../../const';
import Textarea from 'react-textarea-autosize';
import Collapse from 'react-collapse';

export default class RedmineJournal extends Component {

   openRedmineUrl(){
      const {task} = this.props;
      const url = REDMINE_URL + '/issues/' + task.get('_id');
      window.open(url);
   }

   render() {


      // journals.push(
      //    Map({
      //       id: journal.id,
      //       notes: journal.notes,
      //       createOn: journal.created_on,
      //       user: fromJS(journal.user)
      //    })
      // );

      /** prop取得 **/
      const {task} = this.props;

      console.log(task.get('journals'));

      /** レンダリング **/
      return (
         <div className={css(styles.journalArea)}>
            {}
            <div>履歴</div>
            {task.get('journals').map(journal => {
               return (
                  <div className={css(styles.journal)} key={journal.get('id')}>
                     <h7 className={css(styles.name)}>{journal.getIn(['user', 'name'])}</h7>
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
      color: 'blue'
   },
   notes:{
      width: '100%',
      outline: '0',
      border: '0px',
      resize: 'none',
      backgroundColor: 'transparent'
   }
});