import {List, toJS} from 'immutable';
import {Task, createTaskListFromObj, copyTaskFromRedmine} from '../model/m-Task';
import {REDMINE_URL} from '../const';

const ERR_MESSAGE = '通信に失敗しました。F5を押して処理をやり直してください。';

export function fetchTaskList() {

   return fetch(`api/readTaskList`)
      .then(res => {
         if(res.status != 200) alert(ERR_MESSAGE);
         return res.json();
      })
      .then(json => json);
};

//redux-saga使っているのにPromiseで制御ってどうなんだろう…。
export function fetchRedmineTaskList(taskListEachMember) {

   //RedmineURLを取得
   return Promise.all(taskListEachMember.members.map(member => {
      const redmineUrl = process.env.NODE_ENV === `production` ?
         `${REDMINE_URL}/issues.json?limit=100&key=${member.redmineKey}&assigned_to_id=${member._id}`:
         `/testdata/issues_${member._id}.json`;
      return fetch(redmineUrl).then(res => res.json());

   })).then(redmineTasks => redmineTasks)
      .catch(e => {
         console.log(e);
         return null;
      }
   )
}

export function fetchRedmineTaskDetail(redmineId){

   //RedmineIdを取得
   const redmineUrl = process.env.NODE_ENV === `production` ?
      `${REDMINE_URL}/issues/${redmineId}.json?include=attachments,journals&key=4a4606aff3f4db05dd5f391cbbaf026e7cf588c6`:
      `/testdata/detail_${redmineId}.json`;

   return fetch(redmineUrl)
      .then(res => {
         if(res.status != 200) alert(ERR_MESSAGE);
         return res.json();
      })
      .catch(err => err);
}

export function updateTask(task) {
   return fetch(`api/updateTask`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task.toJS())
   }).then(res => {
      if(res.status != 200) alert(ERR_MESSAGE);
   }).catch(err => err);
}

export function updateTaskList(taskList) {
   return fetch(`api/updateTaskList`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(taskList.toJS())
   }).then(res => {
      if(res.status != 200) alert(ERR_MESSAGE);
   }).catch(err => err);
}

export function addTask(task) {
   return fetch(`api/registerTask`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task)
   }).then(res => {
      if(res.status != 200) alert(ERR_MESSAGE);
   }).catch(err => err);
}

export function cleanTask(userId) {
   return fetch(`api/cleanTask`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({userId: userId})
   }).then(res => {
      if(res.status != 200)alert(ERR_MESSAGE)
   }).catch(err => err);
}