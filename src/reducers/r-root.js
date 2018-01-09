import { combineReducers } from 'redux-immutablejs';
import account from './r-account';
import tasks from './r-tasks';
import members from './r-members';
import channels from './r-channels';
import conf from './r-conf';
import redmine from './r-redmine';
import {reducer as form} from 'redux-form/immutable';

export default combineReducers({
   tasks,
   members,
   conf,
   account,
   channels,
   redmine,
   form
})