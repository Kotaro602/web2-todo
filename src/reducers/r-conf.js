import * as t from '../actions/a-index';
import { Map, List, fromJS } from 'immutable';
import {Conf} from '../model/m-Conf';

export default function conf(state=Map([]), action) {

   switch(action.type){

      case t.ADD_TASK:
         return state.set('openTaskId', action.task._id);

      case t.SELECT_TASK:
         return state.set('selectTaskId', action.taskId);

      case t.OPEN_TASK:
         return state.set('openTaskId', action.taskId);

      case t.OPEN_REDMINE_MODAL:
         return state.set('openRedmineId', action.taskId);

      case t.ADD_LINE_MODAL:
         return state.set('lineModalUserId', action.userId);

      default:
         return state;
   }
}