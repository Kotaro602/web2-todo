import * as a from '../actions/a-index';
import { Map, List, fromJS } from 'immutable';
import Account from '../model/m-Account';

export default function account(state = new Account(), action) {

   switch(action.type){

      default:
         return state;
   }
}