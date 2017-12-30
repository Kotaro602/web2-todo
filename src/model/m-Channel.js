/**
 * Created by ma on 2017/01/07.
 */
import {Immutable, Record, List, toJS, fromJS} from 'immutable';
import moment from 'moment';

const ChannelRecord = Record({
   _id: undefined,
   channelName: undefined,
   members: undefined
});

export default class Channel extends ChannelRecord {

   constructor() {
      super()
   }
}