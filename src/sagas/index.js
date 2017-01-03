import 'babel-polyfill';
import { takeEvery} from "redux-saga";
import { put, call, take, fork } from "redux-saga/effects";
import * as actCreater from "../actions/a-index";
import * as API from "./task-api.js";

/** 通常タスク取得 */
function* hundleReqTasks() {
   while (true) {
      yield take(actCreater.REQ_TASKS);
      const oriTasks = yield call(API.fetchTaskList);
      yield put(actCreater.reqRedmineAll(oriTasks));
   }
}

/** Redmineタスク取得 */
function* hundleReqRedmineAll() {
   while (true) {
      const action = yield take(actCreater.REQ_REDMINE_ALL);
      const data = yield call(API.fetchRedmineTaskList, action.oriTasks);
      yield put(actCreater.recieveTasks(data));
   }
}

function* ReqUpdateTask(action){
   API.updateTask(action.task); //非同期
   yield put(actCreater.updateTask(action.task));
}

/** タスク変更 */
function* hundleReqUpdateTask() {
   yield takeEvery(actCreater.REQ_UPDATE_TASK, ReqUpdateTask);
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

/** ソート順更新 */
function* hundleReqChgTaskSort() {
   while (true) {
      const action = yield take(actCreater.REQ_CHG_SORT_TASK);
      API.chgTaskSort(action.dragTask, action.hoverTask);//非同期
   }
}

/** ルート **/
export default function* rootSaga() {
   yield fork(hundleReqTasks);
   yield fork(hundleReqRedmineAll);
   yield fork(hundleReqUpdateTask);
   yield fork(hundleReqAddTask);
   yield fork(hundleReqCleanTask);
   yield fork(hundleReqChgTaskSort);
}