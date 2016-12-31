import * as taskActions from '../actions/task';

export default function task(state={tasks : []}, action) {

  switch(action.type){
    
    case taskActions.SUBMIT_TASK:
      let tasks = state.tasks.concat([action.task]);
      return {tasks : tasks};
      
    case taskActions.RECIEVE_TASKS:
     return {tasks : action.tasks};
     
    default:
      return state;
  }
}
