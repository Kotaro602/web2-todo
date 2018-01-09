/**
 * Created by ma on 2017/01/07.
 */
import {Immutable, Record, List, toJS, fromJS} from 'immutable';
import moment from 'moment';

const RedmineRecord = Record({
   user: undefined,
   createOn: undefined,
   notes: undefined
});

export default class Redmine extends RedmineRecord {

   constructor() {
      super()
   }
}