import { toJS } from 'immutable';

export function fetchTaskList() {

   return fetch(`api/readTaskList`)
      .then(res => {
         if(res.status != 200) alert('通信に失敗しました。F5を押して処理をやり直してください。')
         return res.json();
      })
      .then(json => json);
};

//redux-saga使っているのにPromiseで制御ってどうなんだろう…。
export function fetchRedmineTaskList(taskListEachMember) {

   return Promise.all(taskListEachMember.members.map(member => {
      return fetch(`/testdata/issues_${member._id}.json`)
         .then(response => response.json());
      })
   ).then(function(results) {

      results.map((redmineMemTask, i) => {
         redmineMemTask.issues.forEach((oriRedmineTask, j) => {

            let redmineTask = new Object();
            redmineTask.redmineFlg = true;
            redmineTask.redmineUserId = oriRedmineTask.assigned_to.id;
            redmineTask._id = oriRedmineTask.id;
            redmineTask.taskName = oriRedmineTask.subject;
            redmineTask.dueDate = oriRedmineTask.due_date;
            redmineTask.description = oriRedmineTask.description;
            redmineTask.tempDelFlg = false;
            redmineTask.compDelFlg = false;

            //既にDBにタスクが登録済みならばリストから一旦削除して、redmineTaskをマージする。
            taskListEachMember.tasks.map((tmpTask,i) =>{
               if(tmpTask._id == redmineTask._id){
                  redmineTask = Object.assign({}, tmpTask, redmineTask);
                  taskListEachMember.tasks.splice(i,1);
               }
            })

            taskListEachMember.tasks.push(redmineTask);
         })
      })
      return taskListEachMember;

   }).catch(function(e)  {
      console.log(e);
      return taskListEachMember;
   })
}

export function updateTask(task) {
   return fetch(`api/updateTask`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task.toJS())
   }).then(res => {
      if(res.status != 200) alert('通信に失敗しました。F5を押して処理をやり直してください。')
   }).catch(err => err);
}

export function addTask(task) {
   return fetch(`api/registerTask`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task)
   }).then(res => {
      if(res.status != 200) alert('通信に失敗しました。F5を押して処理をやり直してください。')
   }).catch(err => err);
}

export function cleanTask(userId) {
   return fetch(`api/cleanTask`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({userId: userId})
   }).then(res => {
      if(res.status != 200) alert('通信に失敗しました。F5を押して処理をやり直してください。')
   }).catch(err => err);
}