import * as a from '../actions/a-index';
import { Map, List, fromJS } from 'immutable';
import {Conf} from '../model/m-Conf';

export default function conf(state=Map([]), action) {

   switch(action.type){

      case a.ADD_TASK:
         return state.set('openTaskId', action.task._id);

      case a.OPEN_TASK:
         return state.set('openTaskId', action.taskId);

      case a.UPDATE_AND_CLOSE_TASK:
         return state.set('openTaskId', undefined);

      case a.SELECT_TASK:
         return state.set('selectTaskId', action.taskId);

      case a.UPDATE_NEW_FLG_TASK:
         return state.set('selectTaskId', action.task.get('_id'));

      case a.OPEN_REDMINE_MODAL:
         return state.set('openRedmineId', action.taskId);

      case a.ADD_LINE_MODAL:
         return state.set('lineModalUserId', action.userId);

      default:
         return state;
   }
}