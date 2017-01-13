/**
 * Created by ma on 2017/01/07.
 */
import {Immutable, Record, List, toJS, fromJS} from 'immutable';
import moment from 'moment';

const MemberRecord = Record({
   _id: undefined,
   userName: undefined,
   redmineKey: undefined
})

export default class Member extends MemberRecord {

   constructor() {
      super()
   }
}