import {List, toJS} from 'immutable';
import {Task, createTaskListFromObj, copyTaskFromRedmine} from './model/m-Task';
import {msalconfig} from './const.js';
import {REDMINE_URL} from './const';

const ERR_MESSAGE = '通信に失敗しました。F5を押して処理をやり直してください。';

export const graphAPIScopes = ["https://graph.microsoft.com/user.read", "https://graph.microsoft.com/tasks.read"];
export const graphApiAhtuUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
export const graphApiEndpoint = "https://graph.microsoft.com/v2.0/me";
export const officeUrl = "https://outlook.office.com/api/v2.0/me/tasks";

export const clientID = "0ec0e046-8ca5-49ee-8358-185aab128361";
export const scope = 'https://graph.microsoft.com/user.read';

export function callGraphApi() {

   // const urlAuth =  graphApiAhtuUrl +
   //    '?response_type=token' +
   //    '&client_id=' + "0ec0e046-8ca5-49ee-8358-185aab128361" +
   //    '&redirect_uri=' + encodeURIComponent(location.origin) +
   //    '&scope=' + encodeURIComponent('https://graph.microsoft.com/user.read');
   //
   // location.href = urlAuth;

   const popup = window.open('./popup.html',
      'oauth',
      'width=500,height=400,status=no,toolbar=no,menubar=no,scrollbars=yes');
   popup.focus();
}

export function renewToken(){

   if(!sessionStorage.getItem('officeToken')) return;

   const popup = window.open('./popup.html?updateFlg=1',
      'oauth', 'width=1,height=1,status=no');
}
