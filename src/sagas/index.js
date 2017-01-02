import 'babel-polyfill';
import { takeEvery} from "redux-saga";
import { put, call, take, fork } from "redux-saga/effects";
import * as actCreater from "../actions/a-index";
import * as API from "./task-api.js";

function* hundleReqTasks() {
   while (true) {
      yield take(actCreater.REQ_TASKS);
      const oriTasks = yield call(API.fetchTaskList);
      yield put(actCreater.reqRedmineAll(oriTasks));
   }
}

function* hundleReqRedmineAll() {
   while (true) {
      const action = yield take(actCreater.REQ_REDMINE_ALL);
      const data = yield call(API.fetchRedmineTaskList, action.oriTasks);
      yield put(actCreater.recieveTasks(data));
   }
}

/**
 * yield call(API.updateTask, action.task);
 * どうせサーバサイドでエラーハンドリングなんてしてないんだし、逆に非同期にしてみました。
 * エラー出たらPromiseの中でアラートだします。
 */
function* ReqUpdateTask(action){
   API.updateTask(action.task);
   yield put(actCreater.updateTask(action.task));
}

function* hundleReqUpdateTask() {
   yield takeEvery(actCreater.REQ_UPDATE_TASK, ReqUpdateTask);
}

function* hundleReqAddTask() {
   while (true) {
      const action = yield take(actCreater.REQ_ADD_TASK);
      API.addTask(action.task);
      yield put(actCreater.addTask(action.task));
   }
}

function* hundleReqCleanTask() {
   while (true) {
      const action = yield take(actCreater.REQ_CLEAN_TASK);
      yield call(API.cleanTask, action.userId);
      yield put(actCreater.cleanTask(action.userId));
   }
}

function* hundleReqCleanTask() {
   while (true) {
      const action = yield take(actCreater.REQ_CLEAN_TASK);
      //ここは後で見直す
      yield call(API.cleanTask, action.userId);
      yield put(actCreater.cleanTask(action.userId));
   }
}

function* hundleReqChgTaskSort() {
   while (true) {
      const action = yield take(actCreater.REQ_CHG_SORT_TASK);
      API.chgTaskSort(action.dragTask, action.hoverTask);
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