/** アカウント系Action */
export const INIT_ACCOUNT = 'INIT_ACCOUNT';
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export function initAccount(account){return {type: INIT_ACCOUNT, account}};
export function addAccount(account){return {type: ADD_ACCOUNT, account}};

/** タスク系Action */
export const RECIEVE_TASKS = 'RECIEVE_TASKS';
export const ADD_TASK   = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const UPDATE_AND_CLOSE_TASK = 'UPDATE_AND_CLOSE_TASK';
export const UPDATE_NEW_FLG_TASK = 'UPDATE_NEW_FLG_TASK';
export const CLEAN_TASK = 'CLEAN_TASK';
export const CHG_SORT_NO = 'CHG_SORT_NO';
export function recieveTasks(mergeObj){return {type: RECIEVE_TASKS, mergeObj}};
export function addTask(task){return {type: ADD_TASK, task}};
export function updateTask(task){return {type: UPDATE_TASK, task}};
export function updateNewFlgTask(task){return {type: UPDATE_NEW_FLG_TASK, task}};
export function updateAndCloseTask(task){return {type: UPDATE_AND_CLOSE_TASK, task}};
export function cleanTask(userId){return{type: CLEAN_TASK, userId}};

/** メンバー系Action */

/** プロジェクト系Action */

/** 画面操作系Action */
export const SELECT_TASK = 'SELECT_TASK';
export const OPEN_TASK = 'OPEN_TASK';
export const OPEN_REDMINE_MODAL = 'OPEN_REDMINE_MODAL';
export const OPEN_MENU_MODAL = 'OPEN_MENU_MODAL';
export const OPEN_SORT_MODAL = 'OPEN_SORT_MODAL';
export const OPEN_FILTER_MODAL = 'OPEN_FILTER_MODAL';
export const SORT_TASK = 'SORT_TASK';
export const FILTER_TASK = 'FILTER_TASK';
export function selectTask(taskId){return {type: SELECT_TASK, taskId}};
export function openTask(taskId){return {type: OPEN_TASK, taskId}};
export function openRedmineModal(taskId){return {type: OPEN_REDMINE_MODAL, taskId}};
export function openMenuModal(openMenuFlg){return {type: OPEN_MENU_MODAL, openMenuFlg}};
export function openSortModal(openSortFlg){return {type: OPEN_SORT_MODAL, openSortFlg}};
export function openFilterModal(openFilterFlg){return {type: OPEN_FILTER_MODAL, openFilterFlg}};
export function sortTask(sortKey){return {type: SORT_TASK, sortKey}};
export function filterTask(filterKey){return {type: FILTER_TASK, filterKey}};

/** Redux-Saga系 */
export const REQ_TASKS = 'REQ_TASKS';
export const REQ_REDMINE_ALL = 'REQ_REDMINE_ALL';
export const REQ_UPDATE_TASK = 'REQ_UPDATE_TASK';
export const REQ_ADD_TASK = 'REQ_ADD_TASK';
export const REQ_CLEAN_TASK = 'REQ_CLEAN_TASK';
export const REQ_UPD_NEW_FLG = 'REQ_UPD_NEW_FLG';
export const REQ_REDMINE_ISSUE_LIST = 'REQ_REDMINE_ISSUE_LIST';
export const REQ_ADD_ACCOUNT = 'REQ_ADD_ACCOUNT';
export function reqTasks(preTaskList){return {type: REQ_TASKS, preTaskList}};
export function reqRedmineAll(oriTasks, preTaskList){return {type: REQ_REDMINE_ALL, oriTasks, preTaskList}};
export function reqRedmineIssueList(mergeObj, preTaskList){return {type: REQ_REDMINE_ISSUE_LIST, mergeObj, preTaskList}};
export function reqUpdateTask(task, closeFlg){return {type: REQ_UPDATE_TASK, task, closeFlg}};
export function reqUpdNewFlg(task){return {type: REQ_UPD_NEW_FLG, task}};
export function reqAddTask(task){return {type: REQ_ADD_TASK, task}};
export function reqCleanTask(userId){return {type: REQ_CLEAN_TASK, userId}};
export function reqAddAccount(account){return {type: REQ_ADD_ACCOUNT, account}};