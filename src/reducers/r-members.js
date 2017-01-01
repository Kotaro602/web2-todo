import * as taskActions from '../actions/a-index';
import { Map, List, fromJS } from 'immutable';

export default function members(state=List([]), action) {

   switch(action.type){

      //タスク一覧取得
      case taskActions.RECIEVE_TASKS:
         return fromJS(action.data.members);
      
      //順序変更
      case taskActions.CHG_SORT_NO:
         let tmpState = state.setIn([findIndexById(action.dragUserId), 'sortNoList'], action.dragSortNoList);
         if(action.dragUserId != action.hoverUserId){
            tmpState = tmpState.setIn([findIndexById(action.hoverUserId), 'sortNoList'], action.hoverSortNoList);
         }
         return tmpState;

      default:
         return state;
   }

   function findIndexById(id) {
      return state.findIndex((member) => member.get('_id') == id);
   }
}