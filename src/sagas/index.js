import 'babel-polyfill';
import { takeEvery} from "redux-saga";
import { put, call, take, fork } from "redux-saga/effects";
import {Immutable, Record, List, Map, toJS, fromJS} from 'immutable';
import * as actCreater from "../actions/a-index";
import * as taskApi from "./task-api.js";
import * as accountApi from "./account-api.js";
import {mergeTasks, mergeDetailTask, mergeDetailTaskList} from '../model/m-Task';
import {setLocalStrage} from '../model/m-Member';

/** ユーザー追加 */
function* hundleReqAccount() {
   while (true) {
      const action = yield take(actCreater.REQ_ADD_ACCOUNT);
      const redmineUserInfo = yield call(accountApi.fetchRedmineUserId, action.account);
      const regAccount = action.account.set('_id', redmineUserInfo.users[0].id);
      accountApi.addAccount(regAccount); //非同期
      setLocalStrage(regAccount);
      //window.location.reload();
      yield put(actCreater.addAccount(regAccount));
   }
}

/** 通常タスク取得 */
function* hundleReqTasks() {
   while (true) {
      const action = yield take(actCreater.REQ_TASKS);
      const oriTasks = yield call(taskApi.fetchTaskList);
      yield put(actCreater.reqRedmineAll(oriTasks, action.preTaskList));
   }
}

/** Redmineユーザごとの一覧タスク取得 */
function* hundleReqRedmineAll() {
   while (true) {
      const action = yield take(actCreater.REQ_REDMINE_ALL);
      const redmineTasks = yield call(taskApi.fetchRedmineTaskList, action.oriTasks);
      const mergeObj = mergeTasks(action.oriTasks, redmineTasks);
      taskApi.updateTaskList(mergeObj.reqTasks); //マージしたRedmineTaskをDBに更新（非同期）
      yield put(actCreater.reqRedmineIssueList(mergeObj, action.preTaskList));
   }
}

/** Redmine詳細情報を全て取得 */
function* hundleReqRedmineDetailList() {
   while (true) {
      const action = yield take(actCreater.REQ_REDMINE_ISSUE_LIST);
      const issueList =  action.preTaskList === undefined ?
         yield call(taskApi.fetchRedmineTaskDetailList, action.mergeObj.tasks):
         yield call(taskApi.fetchRedmineTaskDetailList, action.mergeObj.reqDetails);
      action.mergeObj.tasks = mergeDetailTaskList(action.mergeObj, action.preTaskList, issueList);
      yield put(actCreater.recieveTasks(action.mergeObj));
   }
}

/** タスク更新実行 */
function* ReqUpdateTask(action){
   taskApi.updateTask(action.task); //非同期
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
      taskApi.updateTask(action.task); //非同期
      yield put(actCreater.updateNewFlgTask(action.task));
   }
}

/** タスク追加 */
function* hundleReqAddTask() {
   while (true) {
      const action = yield take(actCreater.REQ_ADD_TASK);
      taskApi.addTask(action.task);　//非同期
      yield put(actCreater.addTask(action.task));
   }
}

/** タスククリーニング */
function* hundleReqCleanTask() {
   while (true) {
      const action = yield take(actCreater.REQ_CLEAN_TASK);
      yield call(taskApi.cleanTask, action.userId);
      yield put(actCreater.cleanTask(action.userId));
   }
}

/** ルート **/
export default function* rootSaga() {
   yield fork(hundleReqTasks);
   yield fork(hundleReqRedmineAll);
   yield fork(hundleReqRedmineDetailList);
   yield fork(hundleReqUpdateTask);
   yield fork(hundleReqUpdNewFlg);
   yield fork(hundleReqAddTask);
   yield fork(hundleReqCleanTask);
   yield fork(hundleReqAccount);
}