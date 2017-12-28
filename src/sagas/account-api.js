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

   const redmineUrl = process.env.NODE_ENV === `production` ?
      `${REDMINE_URL}/users.json?name=${redmineLoginId}&key=${redmineLoginId}`:
      `/testdata/user_sekihara_kotaro.json`;

   return fetch(redmineUrl).then(res => res.json())
   .then(json => json);
}

export function addAccount(account) {
   return fetch(`/api/addMember`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(account.toJS())
   }).then(res => {
      if(res.status != 200) alert(ERR_MESSAGE);
   }).catch(err => err);
}