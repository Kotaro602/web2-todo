import * as taskActions from '../actions/a-index';
import { Map, List, fromJS } from 'immutable';

export default function conf(state=Map([]), action) {

   switch(action.type){

      case taskActions.ADD_TASK:
         return state.set('openTaskId', action.task._id);

      case taskActions.OPEN_TASK:
         return state.set('openTaskId', action.taskId);

      case taskActions.OPEN_REDMINE_MODAL:
         return state.set('openRedmineId', action.taskId);

      default:
         return state;
   }
}