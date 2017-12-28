/**
 * Created by ma on 2017/01/07.
 */
import {Immutable, Record, List, toJS, fromJS} from 'immutable';
import moment from 'moment';

const MemberRecord = Record({
   _id: undefined,
   redmineLoginId: undefined,
   userName: undefined,
   redmineKey: undefined,
   slackToken: undefined
})

export class Member extends MemberRecord {

   constructor() {
      super()
   }
}

export function setLocalStrage(member){

   localStorage._id = member.get('_id');
   localStorage.redmineLoginId = member.get('redmineLoginId');
   localStorage.userName = member.get('userName');
   localStorage.redmineKey = member.get('redmineKey');
   localStorage.slackToken = member.get('slackToken');
}

export function getLocalStrage(){

   let member = new Member();
   member = member.set('_id', localStorage._id);
   member = member.set('redmineLoginId', localStorage.redmineLoginId);
   member = member.set('userName', localStorage.userName);
   member = member.set('redmineKey', localStorage.redmineKey);
   member = member.set('slackToken', localStorage.slackToken);

   return member;
}

export function isRegistered(){
   const storage = localStorage;
   return !!localStorage._id;
}