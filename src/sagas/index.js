import 'babel-polyfill';
import { takeEvery} from "redux-saga";
import { put, call, take, fork } from "redux-saga/effects";
import * as actCreater from "../actions/a-index";
import * as API from "./task-api.js";
import {mergeTasks, mergeDetailTask} from '../model/m-Task';

/** 通常タスク取得 */
function* hundleReqTasks() {
   while (true) {
      yield take(actCreater.REQ_TASKS);
      const oriTasks = yield call(API.fetchTaskList);
      yield put(actCreater.reqRedmineAll(oriTasks));
   }
}

/** Redmine一覧タスク取得 */
function* hundleReqRedmineAll() {
   while (true) {
      const action = yield take(actCreater.REQ_REDMINE_ALL);
      const redmineTasks = yield call(API.fetchRedmineTaskList, action.oriTasks);
      const mergeObj = mergeTasks(action.oriTasks, redmineTasks);
      API.updateTaskList(mergeObj.reqTasks); //マージしたRedmineTask更新処理
      yield put(actCreater.recieveTasks(mergeObj));
   }
}

/** Redmine詳細タスクを取得 */
function* hundleReqRedmineDetail() {
   while (true) {
      const action = yield take(actCreater.REQ_REDMINE_DETAIL);
      const data = yield call(API.fetchRedmineTaskDetail, action.task.get('_id'));
      const mergeTask = mergeDetailTask(action.task, data.issue);
      yield put(actCreater.updateTask(mergeTask));
   }
}

/** タスク更新実行 */
function* ReqUpdateTask(action){
   API.updateTask(action.task); //非同期
   if(action.closeFlg) yield put(actCreater.updateAndCloseTask(action.task));
   else yield put(actCreater.updateTask(action.task));
}

/** タスク更新ハンドラ */
function* hundleReqUpdateTask() {
   yield takeEvery(actCreater.REQ_UPDATE_TASK, ReqUpdateTask);
}

/** タスクnewFlgを更新 */
function* hundleReqUpdNewFlg() {
   while (true) {
      const action = yield take(actCreater.REQ_UPD_NEW_FLG);
      API.updateTask(action.task); //非同期
      yield put(actCreater.updateNewFlgTask(action.task));
   }
}

/** タスク追加 */
function* hundleReqAddTask() {
   while (true) {
      const action = yield take(actCreater.REQ_ADD_TASK);
      API.addTask(action.task);　//非同期
      yield put(actCreater.addTask(action.task));
   }
}

/** タスククリーニング */
function* hundleReqCleanTask() {
   while (true) {
      const action = yield take(actCreater.REQ_CLEAN_TASK);
      yield call(API.cleanTask, action.userId);
      yield put(actCreater.cleanTask(action.userId));
   }
}

/** ルート **/
export default function* rootSaga() {
   yield fork(hundleReqTasks);
   yield fork(hundleReqRedmineAll);
   yield fork(hundleReqRedmineDetail);
   yield fork(hundleReqUpdateTask);
   yield fork(hundleReqUpdNewFlg);
   yield fork(hundleReqAddTask);
   yield fork(hundleReqCleanTask);
}