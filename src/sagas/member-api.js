import {List, toJS} from 'immutable';
import {Task, createTaskListFromObj, copyTaskFromRedmine} from '../model/m-Task';
import {REDMINE_URL} from '../const';

const ERR_MESSAGE = '通信に失敗しました。F5を押して処理をやり直してください。';

/**
 * RedmineからRedmineUserIdを取得
 *
 * @param taskListEachMember
 */
export function fetchRedmineUserId(redmineLoginId) {

   const redmineUrl = `${REDMINE_URL}/users.json?name=${redmineLoginId}&key=${redmineLoginId}` ;

   return fetch(redmineUrl)
      .then(res => {
         if(res.status != 200) alert(ERR_MESSAGE);
         return res.json();
      })
      .then(json => json);
}


// /**
//  * DBから一覧情報を取得
//  */
// export function fetchTaskList() {
//
//    return fetch(`api/readTaskList`)
//       .then(res => {
//          if(res.status != 200) alert(ERR_MESSAGE);
//          return res.json();
//       })
//       .then(json => json);
// };
//
// /**
//  * Redmineからユーザごとのタスク一覧リストを取得
//  *
//  * @param taskListEachMember
//  * @returns {Promise|Promise.<T>}
//  */
// export function fetchRedmineTaskList(taskListEachMember) {
//
//    //RedmineURLを取得
//    return Promise.all(taskListEachMember.members.map(member => {
//       const redmineUrl = process.env.NODE_ENV !== `production` ?
//          `${REDMINE_URL}/issues.json?limit=100&key=${member.redmineKey}&assigned_to_id=${member._id}`:
//          `/testdata/issues_${member._id}.json`;
//       return fetch(redmineUrl).then(res => res.json());
//
//    })).then(redmineTasks => redmineTasks)
//       .catch(e => {
//          console.log(e);
//          return null;
//       }
//    )
// }
//
// /**
//  * Redmineからタスク詳細情報を全て取得
//  *
//  * @param taskListEachMember
//  * @returns {Promise|Promise.<T>}
//  */
// export function fetchRedmineTaskDetailList(taskList) {
//
//    //同時にRedmineにリクエストを投げる
//    return Promise.all(taskList.map(task => {
//       if(task.get('redmineFlg')){
//
//          const redmineUrl = process.env.NODE_ENV !== `production` ?
//             `${REDMINE_URL}/issues/${task.get('_id')}.json?include=attachments,journals&key=4a4606aff3f4db05dd5f391cbbaf026e7cf588c6`:
//             `/testdata/detail_${task.get('_id')}.json`;
//          return fetch(redmineUrl).then(res => res.json());
//       }
//
//    })).then(redmineTasks => redmineTasks)
//       .catch(e => {
//             console.log(e);
//             return null;
//          }
//       )
// }
//
// export function updateTask(task) {
//    return fetch(`api/updateTask`,{
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(task.toJS())
//    }).then(res => {
//       if(res.status != 200) alert(ERR_MESSAGE);
//    }).catch(err => err);
// }
//
// export function updateTaskList(taskList) {
//    return fetch(`api/updateTaskList`,{
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(taskList.toJS())
//    }).then(res => {
//       if(res.status != 200) alert(ERR_MESSAGE);
//    }).catch(err => err);
// }
//
// export function addTask(task) {
//    return fetch(`api/registerTask`,{
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(task)
//    }).then(res => {
//       if(res.status != 200) alert(ERR_MESSAGE);
//    }).catch(err => err);
// }
//
// export function cleanTask(userId) {
//    return fetch(`api/cleanTask`,{
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({userId: userId})
//    }).then(res => {
//       if(res.status != 200)alert(ERR_MESSAGE)
//    }).catch(err => err);
// }