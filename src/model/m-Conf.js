/**
 * Created by ma on 2017/01/07.
 */
import {Immutable, Record, List, toJS, fromJS} from 'immutable';
import moment from 'moment';

const ConfRecord = Record({
   selectTaskId: undefined,
   openTaskId: undefined,
   openRedmineId: undefined,
   openMenuFlg: false,
   menuType: 'account',
   openSortFlg: false,
   openFilterFlg: false,
   sortKey: 'date',
   filterKey: 'non',
   selectGroup: undefined,
   officeConnecedFlg: false
});

export default class Conf extends ConfRecord {

   constructor() {
      super()
   }
}