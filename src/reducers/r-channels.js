import * as taskActions from '../actions/a-index';
import * as a from '../actions/a-index';
import { Map, List, fromJS } from 'immutable';
import Channel from '../model/m-Channel';

export default function channels(state = List([]), action) {

   switch(action.type){

      case a.INIT_ACCOUNT:
         return action.channelList;

      default:
         return state;
   }
}