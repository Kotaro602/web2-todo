import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {TogglePattern} from "react-toggle-pattern";
import RedmineHeader from'./p-RedmineHeader';
import RedmineMain from'./p-RedmineMain';
import RedmineJournal from'./p-RedmineJournal';

export default class RedmineArea extends Component {

   componentDidMount() {

   }

   render() {

      /** prop取得 **/
      const {state} = this.props;
      const openRedmineId = state.get('conf').get('openRedmineId');
      const task = state.get('tasks').filter(t => t.get('_id') === openRedmineId).get(0);
      const journals = state.get('redmine');

      /** レンダリング **/
      return (
         <div className={css(styles.redmineBox)} id="redmineModal">
            <RedmineHeader task={task} {...this.props}/>
            <RedmineMain task={task} {...this.props}/>
            {!!journals && <RedmineJournal journals={journals} task={task} {...this.props}/>}
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