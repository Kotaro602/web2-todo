import * as a from '../actions/a-index';
import { Map, List, fromJS } from 'immutable';

export default function task(state=List([]), action) {

   switch(action.type){

      //一覧取得
      case a.RECIEVE_TASKS:
         return fromJS(action.data.tasks);

      //追加
      case a.ADD_TASK:
         return state.push(fromJS(action.task));

      //タスク更新
      case a.UPDATE_TASK:
         return state.set(findIndexById(action.task.get('_id')), action.task);

      //完了
      case a.CLEAN_TASK:
         return state.map(task =>
            task.get('tempDelFlg') && task.get('redmineUserId') == action.userId
            ? task.set('compDelFlg', true) : task
         )

      //順序変更
      case a.CHG_SORT_NO:
         let tmpState = state;
         if(action.dragUserId != action.hoverUserId){
            tmpState = tmpState.setIn([findIndexById(action.dragTaskId), 'redmineUserId'], action.hoverUserId);
         }
         return tmpState;

      default:
         return state;
   }

   function findIndexById(id) {
      return state.findIndex((task) => task.get('_id') == id);
   }
}