import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Collapse from 'react-collapse';

export default class RedmineArea extends Component {

   componentDidMount(){
      const {state, reqRedmineDetail} = this.props;
      const openRedmineId = state.get('conf').get('openRedmineId');
      const task = state.get('tasks').filter(t => t.get('_id') == openRedmineId).get(0);

      reqRedmineDetail(task);
   }


   render() {

      /** prop取得 **/
      const {state} = this.props;
      const openRedmineId = state.get('conf').get('openRedmineId');
      const task = state.get('tasks').filter(t => t.get('_id') == openRedmineId).get(0);

      /** レンダリング **/
      return (
         <div className={css(styles.redmineBox)} id="redmineModal">
            <h3 className={css(styles.title)}>{task.getIn(['tracker', 'name'])} #{task.get('_id')}</h3>
            <div className={css(styles.mainArea)}>
               {task.get('description')}
            {/*            タスク名称：{task.get('taskName')}<br/>
            プロジェクト：{task.getIn(['project', 'name'])}<br/>
            トラッカー：{task.getIn(['tracker', 'name'])}<br/>
            ディスクリプション：{task.get('description')}<br/>
            WEB2メモ：{task.get('taskName')}<br/>
            開始日：{task.get('startDate')}<br/>
            締切日：{task.get('dueDate')}
*/}
            </div>
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
      backgroundColor: 'white',
      border: '1.5px solid #a7a6a6',
      borderRadius: 4,
      zIndex: 10
   },
   title:{

   },
   mainArea:{
      backgroundColor: '#ffffe6',
      width: '100%',
      height: 300
   },
});