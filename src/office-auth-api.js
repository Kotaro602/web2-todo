import {List, toJS} from 'immutable';
import {Task, createTaskListFromObj, copyTaskFromRedmine} from './model/m-Task';
import {msalconfig} from './const.js';
import {REDMINE_URL} from './const';

export function callGraphApi() {

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
