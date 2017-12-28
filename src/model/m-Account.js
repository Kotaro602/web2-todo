/**
 * Created by ma on 2017/01/07.
 */
import {Immutable, Record, List, toJS, fromJS} from 'immutable';
import moment from 'moment';

const AccountRecord = Record({
   _id: undefined,
   redmineLoginId: undefined,
   userName: undefined,
   redmineKey: undefined,
   slackToken: undefined
});

export default class Account extends AccountRecord {

   constructor() {
      super()
   }
}

export function setLocalStrage(account){

   localStorage._id = account.get('_id');
   localStorage.redmineLoginId = account.get('redmineLoginId');
   localStorage.userName = account.get('userName');
   localStorage.redmineKey = account.get('redmineKey');
   localStorage.slackToken = account.get('slackToken');
}

export function getLocalStrage(){

   let account = new Account();
   account = account.set('_id', localStorage._id);
   account = account.set('redmineLoginId', localStorage.redmineLoginId);
   account = account.set('userName', localStorage.userName);
   account = account.set('redmineKey', localStorage.redmineKey);
   account = account.set('slackToken', localStorage.slackToken);

   return account;
}

export function isRegistered(){
   const storage = localStorage;
   return !!localStorage._id;
}