import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Collapse from 'react-collapse';

export default class RedmineArea extends Component {

   render() {

      /** prop取得 **/
      const {state} = this.props;
      const openRedmineId = state.get('conf').get('openRedmineId');
      const task = state.get('tasks').filter(t => t.get('_id') == openRedmineId).get(0);

      /** レンダリング **/
      return (
         <div className={css(styles.redmineBox)} id="redmineModal">
            {task.get('taskName')}<br/>
            <br/>
            {task.get('description')}
            <br/>
            プロジェクト<br/>
            トラッカー<br/>
            起票者<br/>
            ディスクリプション<br/>
            WEB2メモ<br/>
            開始日<br/>
            締切日
         </div>
      );
      }
   }

const styles = StyleSheet.create({
   redmineBox: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 800,
      height: '100%',
      backgroundColor: '#ffffe6',
      border: '1.5px solid #a7a6a6',
      borderRadius: 4,
      zIndex: 10
   }
});