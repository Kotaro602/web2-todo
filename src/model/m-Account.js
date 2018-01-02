/**
 * Created by ma on 2017/01/07.
 */
import {Immutable, Record, List, toJS, fromJS} from 'immutable';
import moment from 'moment';
import {getToken} from './../office-auth-api';

const AccountRecord = Record({
   _id: undefined,
   redmineLoginId: undefined,
   userName: undefined,
   redmineKey: undefined,
   slackToken: undefined,
   officeToken: undefined,
   watchGroup: []
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
   localStorage.watchGroup = account.get('watchGroup');
}

export function getFromStrage(){

   let account = new Account();
   account = account.set('_id', localStorage._id);
   account = account.set('redmineLoginId', localStorage.redmineLoginId);
   account = account.set('userName', localStorage.userName);
   account = account.set('redmineKey', localStorage.redmineKey);
   account = account.set('slackToken', localStorage.slackToken);
   account = account.set('officeToken', sessionStorage.officeToken);
   if(!!localStorage.watchGroup){
      account = account.set('watchGroup', localStorage.watchGroup.split(","));
   }

   return account;
}

export function setWatchGroupToStorage(groupArray){
   localStorage.watchGroup = groupArray;
}

export function isRegistered(){
   const storage = localStorage;
   return !!localStorage._id;
}