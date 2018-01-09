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
   if(!!account.get('slackToken')) localStorage.slackToken = account.get('slackToken');
   if(!!account.get('watchGroup')) localStorage.watchGroup = account.get('watchGroup');
}

export function getFromStrage(){

   let account = new Account();
   account = account.set('_id', Number(localStorage._id));
   account = account.set('redmineLoginId', localStorage.redmineLoginId);
   account = account.set('userName', localStorage.userName);
   account = account.set('redmineKey', localStorage.redmineKey);
   if(!!localStorage.slackToken) account = account.set('slackToken', localStorage.slackToken);
   if(!!localStorage.officeToken) account = account.set('officeToken', sessionStorage.officeToken);
   if(!!localStorage.watchGroup){
      account = account.set('watchGroup', localStorage.watchGroup.split(","));
   }

   return account;
}

export function isRegistered(){
   const storage = localStorage;
   return !!localStorage._id;
}