import * as a from '../actions/a-index';
import { Map, List, fromJS } from 'immutable';

export default function members(state=List([]), action) {

   switch(action.type){

      //タスク非表示
      case a.REST_TASKS:
         return List([]);

      //タスク一覧取得
      case a.RECIEVE_TASKS:
         return action.mergeObj.members;

      default:
         return state;
   }

   function findIndexById(id) {
      return state.findIndex((member) => member.get('_id') == id);
   }
}