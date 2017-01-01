import { combineReducers } from 'redux-immutablejs';
import tasks from './r-tasks';
import members from './r-members';
import projects from './r-projects';
import conf from './r-conf';

export default combineReducers({
   tasks,
   members,
   projects,
   conf
})