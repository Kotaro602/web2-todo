/**
 * Created by ma on 2017/01/07.
 */
import {Immutable, Record, List, toJS, fromJS} from 'immutable';
import moment from 'moment';

const MemberRecord = Record({
   _id: undefined,
   userName: undefined
})

export class Member extends MemberRecord {

   constructor() {
      super()
   }
}

export function isExistAccountUser(members){
   return members.findIndex(member => member.get('_id') === Number(localStorage._id)) >= 0;
}