import * as a from '../actions/a-index';
import { Map, List, fromJS } from 'immutable';
import Conf from '../model/m-Conf';

export default function redmine(state = List([]), action) {

   switch(action.type){

      case a.RECIEVE_REDMINE_DETAIL:
         return action.journals;

      default:
         return state;
   }
}