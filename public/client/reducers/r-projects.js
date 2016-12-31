import * as taskActions from '../actions/a-index';
import { Map, List, fromJS } from 'immutable';

export default function projects(state=List([]), action) {

   switch(action.type){

      default:
         return state;
   }

   function findIndexOfTaskById(id) {
      return state.findIndex((task) => task.get('_id') == id);
   }
}