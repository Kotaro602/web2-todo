import { combineReducers } from 'redux-immutablejs';
import tasks from './r-tasks';
import members from './r-members';
import projects from './r-projects';
import conf from './r-conf';
import { reducer as form } from 'redux-form/immutable';

export default combineReducers({
   tasks,
   members,
   projects,
   conf,
   form
})