
/** タスク系Action */
export const RECIEVE_TASKS = 'RECIEVE_TASKS';
export const ADD_TASK   = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const CLEAN_TASK = 'CLEAN_TASK';
export const CHG_SORT_NO = 'CHG_SORT_NO';
export function recieveTasks(data){return {type: RECIEVE_TASKS, data}};
export function addTask(task){return {type: ADD_TASK, task}};
export function updateTask(task){return {type: UPDATE_TASK, task}};
export function cleanTask(userId){return{type: CLEAN_TASK, userId}};
export function chgSortNo(dragTaskId, dragUserId, dragSortNoList, hoverUserId, hoverSortNoList) {
  return {type: CHG_SORT_NO, dragTaskId, dragUserId, dragSortNoList, hoverUserId, hoverSortNoList}};

/** メンバー系Action */

/** プロジェクト系Action */

/** 画面操作系Action */
export const OPEN_TASK = 'OPEN_TASK';
export const OPEN_REDMINE_MODAL = 'OPEN_REDMINE_MODAL';
export function openTask(taskId){return {type: OPEN_TASK, taskId}};
export function openRedmineModal(taskId){return {type: OPEN_REDMINE_MODAL, taskId}};

/** Redux-Saga系 */
export const REQ_TASKS = 'REQ_TASKS';
export const REQ_REDMINE_ALL = 'REQ_REDMINE_ALL';
export const REQ_UPDATE_TASK = 'REQ_UPDATE_TASK';
export const REQ_ADD_TASK = 'REQ_ADD_TASK';
export const REQ_CLEAN_TASK = 'REQ_CLEAN_TASK';
export function reqTasks(){return {type: REQ_TASKS}};
export function reqRedmineAll(oriTasks){return {type: REQ_REDMINE_ALL, oriTasks}};
export function reqUpdateTask(task){return {type: REQ_UPDATE_TASK, task}};
export function reqAddTask(task){return {type: REQ_ADD_TASK, task}};
export function reqCleanTask(userId){return {type: REQ_CLEAN_TASK, userId}};