
/** タスク系Action */
export const RECIEVE_TASKS = 'RECIEVE_TASKS';
export const ADD_TASK   = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const UPDATE_AND_CLOSE_TASK = 'UPDATE_AND_CLOSE_TASK';
export const UPDATE_NEW_FLG_TASK = 'UPDATE_NEW_FLG_TASK';
export const CLEAN_TASK = 'CLEAN_TASK';
export const CHG_SORT_NO = 'CHG_SORT_NO';
export function recieveTasks(data){return {type: RECIEVE_TASKS, data}};
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
export const ADD_LINE_MODAL = 'ADD_LINE_MODAL';
export function selectTask(taskId){return {type: SELECT_TASK, taskId}};
export function openTask(taskId){return {type: OPEN_TASK, taskId}};
export function openRedmineModal(taskId){return {type: OPEN_REDMINE_MODAL, taskId}};
export function addLineModal(userId){return {type: ADD_LINE_MODAL, userId}};

/** Redux-Saga系 */
export const REQ_TASKS = 'REQ_TASKS';
export const REQ_REDMINE_ALL = 'REQ_REDMINE_ALL';
export const REQ_REDMINE_DETAIL = 'REQ_REDMINE_DETAIL';
export const REQ_UPDATE_TASK = 'REQ_UPDATE_TASK';
export const REQ_ADD_TASK = 'REQ_ADD_TASK';
export const REQ_CLEAN_TASK = 'REQ_CLEAN_TASK';
export const REQ_CHG_SORT_TASK = 'REQ_CHG_SORT_TASK';
export const REQ_UPD_NEW_FLG = 'REQ_UPD_NEW_FLG';
export function reqTasks(){return {type: REQ_TASKS}};
export function reqRedmineAll(oriTasks){return {type: REQ_REDMINE_ALL, oriTasks}};
export function reqRedmineDetail(task){return {type: REQ_REDMINE_DETAIL, task}}
export function reqUpdateTask(task, closeFlg){return {type: REQ_UPDATE_TASK, task, closeFlg}};
export function reqUpdNewFlg(task){return {type: REQ_UPD_NEW_FLG, task}};
export function reqAddTask(task){return {type: REQ_ADD_TASK, task}};
export function reqCleanTask(userId){return {type: REQ_CLEAN_TASK, userId}};
