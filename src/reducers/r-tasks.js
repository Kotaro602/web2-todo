import * as a from '../actions/a-index';
import { Map, List, fromJS } from 'immutable';
import {Task, createTaskListFromObj} from '../model/m-Task';

export default function task(state=List([]), action) {

   switch(action.type){

      //一覧取得
      case a.RECIEVE_TASKS:
         return action.data.tasks;

      //追加
      case a.ADD_TASK:
         return state.push(action.task);

      //タスク更新
      case a.UPDATE_TASK:
      case a.UPDATE_NEW_FLG_TASK:
      case a.UPDATE_AND_CLOSE_TASK:
          return state.set(findIndexById(action.task.get('_id')), action.task);
          return state.set(findIndexById(action.task.get('_id')), action.task);

      //完了
      case a.CLEAN_TASK:
         return state.map(task =>
            task.get('tempDelFlg') && task.get('redmineUserId') == action.userId
            ? task.set('compDelFlg', true) : task
         )

      //順序変更
      case a.CHG_SORT_NO:
         state = state.set(findIndexById(action.dragTask.get('_id')), action.dragTask);
         return state.set(findIndexById(action.hoverTask.get('_id')), action.hoverTask);

      default:
         return state;
   }

   function findIndexById(id) {
      return state.findIndex((task) => task.get('_id') == id);
   }
}