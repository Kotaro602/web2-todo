import {List, toJS} from 'immutable';
import {Task, createTaskListFromObj, copyTaskFromRedmine} from '../model/m-Task';
import {REDMINE_URL} from '../const';

const ERR_MESSAGE = '通信に失敗しました。F5を押して処理をやり直してください。';

/**
 * DBから一覧情報を取得
 */
export function fetchTaskList(reqTaskId) {

   return fetch(`api/readTaskList?reqTask=` + reqTaskId.toString())
      .then(res => {
         if(res.status !== 200) alert(ERR_MESSAGE);
         return res.json();
      })
      .then(json => json);
};

/**
 * Redmineからユーザごとのタスク一覧リストを取得
 *
 * @param taskListEachMember
 * @returns {Promise|Promise.<T>}
 */
export function fetchRedmineTaskList(taskListEachMember) {

   //本番環境を再現するために、少し待たせてみる。
   if(process.env.NODE_ENV !== `production`) sleep(800);

   //RedmineURLを取得
   return Promise.all(taskListEachMember.members.map(member => {
      const redmineUrl = process.env.NODE_ENV === `production` ?
         `${REDMINE_URL}/issues.json?limit=100&key=${localStorage.redmineKey}&assigned_to_id=${member._id}`:
         `/testdata/issues_${member._id}.json`;

      return fetch(redmineUrl).then(res => res.json());

   })).then(redmineTasks => redmineTasks)
      .catch(e => {
         console.log(e);
         return null;
      }
   )
}

/**
 * Redmineからタスク詳細情報を取得
 *
 * @param redmineTaskId
 * @returns {Promise|Promise.<T>}
 */
export function fetchRedmineTaskDetail(redmineTaskId) {

   const redmineUrl = process.env.NODE_ENV === `production` ?
      `${REDMINE_URL}/issues/${redmineTaskId}.json?include=attachments,journals&key=${localStorage.redmineKey}`:
      `/testdata/detail_${redmineTaskId}.json`;

   return fetch(redmineUrl)
      .then(res => {
         if(res.status !== 200) alert(ERR_MESSAGE);
         return res.json();
      }).then(json => json);
}


/**
 * Redmineからタスク詳細情報を全て取得
 *
 * @param taskListEachMember
 * @returns {Promise|Promise.<T>}
 */
export function fetchRedmineTaskDetailList(taskList) {

   //同時にRedmineにリクエストを投げる
   return Promise.all(taskList.map(task => {
      if(task.get('redmineFlg')){

         const redmineUrl = process.env.NODE_ENV === `production` ?
            `${REDMINE_URL}/issues/${task.get('_id')}.json?include=attachments,journals&key=${localStorage.redmineKey}`:
            `/testdata/detail_${task.get('_id')}.json`;
         return fetch(redmineUrl).then(res => res.json());
      }
   })).then(redmineTasks => redmineTasks)
      .catch(e => {
            console.log(e);
            return null;
      })
}

/**
 * Slackからスタータスクを取得
 */
export function fetchSlackTaskList() {

   const slackUrl = `https://slack.com/api/stars.list?token=${localStorage.slackToken}`;

   return fetch(slackUrl)
      .then(res => {
         if(res.status !== 200) alert(ERR_MESSAGE);
         return res.json();
      }).then(json => json);
}

/**
 * Officeからタスクを取得
 */
export function fetchOfficeTaskList() {

   const officeUrl = `https://outlook.office.com/api/v2.0/me/tasks`;
   const officeToken = sessionStorage.officeToken;
   const headers = new Headers();
   const bearer = "Bearer " + officeToken;
   headers.append("Authorization", bearer);
   const options = {
      method: "GET",
      headers: headers
   };

   return fetch(officeUrl, options)
      .then(res => {
         console.log(res);
         if(res.status !== 200) {
            alert(ERR_MESSAGE);
            return undefined;
         }
         return res.json();
      }).then(json => json);
};

export function updateTask(task) {
   return fetch(`api/updateTask`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task.toJS())
   }).then(res => {
      if(res.status !== 200) alert(ERR_MESSAGE);
   }).catch(err => err);
}

export function updateTaskList(taskList) {

   if(taskList === List([])) return;

   return fetch(`api/updateTaskList`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(taskList.toJS())
   }).then(res => {
      if(res.status !== 200) alert(ERR_MESSAGE);
   }).catch(err => err);
}

export function addTask(task) {
   return fetch(`api/registerTask`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task)
   }).then(res => {
      if(res.status !== 200) alert(ERR_MESSAGE);
   }).catch(err => err);
}

export function cleanTask(userId) {
   return fetch(`api/cleanTask`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({userId: userId})
   }).then(res => {
      if(res.status !== 200)alert(ERR_MESSAGE)
   }).catch(err => err);
}

function sleep(waitMsec) {

   var startMsec = new Date();

   // 指定ミリ秒間、空ループ。CPUは常にビジー。
   while (new Date() - startMsec < waitMsec);

}