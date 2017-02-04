/**
 * Created by ma on 2017/01/07.
 */
import {Immutable, Record, List, toJS, fromJS} from 'immutable';
import moment from 'moment';

const AccountRecord = Record({
   selectTaskId: undefined
})

export default class Account extends AccountRecord {

   constructor() {
      super()
   }
}