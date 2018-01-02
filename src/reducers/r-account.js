import * as a from '../actions/a-index';
import { Map, List, fromJS, toJS } from 'immutable';
import Account from '../model/m-Account';

export default function account(state = new Account(), action) {

   switch(action.type){

      case a.INIT_ACCOUNT:
         return action.account;

      case a.ADD_ACCOUNT:
         return action.account;

      case a.OFFICE_CONNECTED:
         return state.set('officeToken', action.token);

      default:
         return state;
   }
}