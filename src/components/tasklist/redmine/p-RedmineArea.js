import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {TogglePattern} from "react-toggle-pattern";
import RedmineHeader from'./p-RedmineHeader';
import RedmineMain from'./p-RedmineMain';
import RedmineJournal from'./p-RedmineJournal';

export default class RedmineArea extends Component {

   componentDidMount() {

      const {openRedmineModal} = this.props;

      //オープン中のレッドマインモーダルをクローズ
      const closeRedmineModal = (evt) => {
         const openRedmineDOM = document.getElementById('redmineModal');

         if(openRedmineDOM == null) return;
         if(openRedmineDOM.contains(evt.target)) return;
         if(evt.target.className.match('redmineIcon')) return;

         openRedmineModal(undefined);
      }

      document.addEventListener('click', closeRedmineModal);
   }

   render() {

      /** prop取得 **/
      const {state} = this.props;
      const openRedmineId = state.get('conf').get('openRedmineId');
      const task = state.get('tasks').filter(t => t.get('_id') == openRedmineId).get(0);

      /** レンダリング **/
      return (
         <div className={css(styles.redmineBox)} id="redmineModal">
            <RedmineHeader task={task} {...this.props}/>
            <RedmineMain task={task} {...this.props}/>
            <TogglePattern isDisp={task.get('journals') !== undefined}>
               <RedmineJournal isDisp={true} task={task} {...this.props}/>
            </TogglePattern>
         </div>
      );
      }
   }

const styles = StyleSheet.create({
   redmineBox: {
      position: 'absolute',
      top: 0,
      right: 0,
      marginRight: 180,
      width: 800,
      height: '100%',
      backgroundColor: 'white',
      border: '1px solid #a7a6a6',
      borderRadius: 4,
      zIndex: 10,
      overflow: 'auto'
   }
});