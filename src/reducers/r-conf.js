import * as a from '../actions/a-index';
import { Map, List, fromJS } from 'immutable';
import Conf from '../model/m-Conf';

export default function conf(state = new Conf(), action) {

   switch(action.type){

      case a.ADD_TASK:
         return state.set('openTaskId', action.task._id);

      case a.OPEN_TASK:
         return state.set('openTaskId', action.taskId);

      case a.UPDATE_AND_CLOSE_TASK:
         return state.set('openTaskId', undefined);

      case a.UPDATE_TASK:
         return action.task.get('tempDelFlg') && action.task.get('taskMemo') ?
            state.set('openTaskId', action.task.get('_id')) : state.set('openTaskId', undefined);

      case a.SELECT_TASK:
         return state.set('selectTaskId', action.taskId);

      case a.UPDATE_NEW_FLG_TASK:
         return state.set('selectTaskId', action.task.get('_id'));

      case a.OPEN_REDMINE_MODAL:
         return state.set('openRedmineId', action.taskId);

      case a.OPEN_MENU_MODAL:
         return state.set('openMenuFlg', action.openMenuFlg);

      case a.OPEN_SORT_MODAL:
         return state.set('openSortFlg', action.openSortFlg);

      case a.OPEN_FILTER_MODAL:
         return state.set('openFilterFlg', action.openFilterFlg);

      case a.SORT_TASK:
         return state.set('sortKey', action.sortKey);

      case a.FILTER_TASK:
         return state.set('filterKey', action.filterKey);

      case a.ADD_ACCOUNT:
         return state.set('openMenuFlg', false);

      case a.CHANGE_GROUP:
         return state.set('selectGroup', action.groupId);

      default:
         return state;
   }
}