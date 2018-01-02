import 'babel-polyfill';
import { takeEvery} from "redux-saga";
import { put, call, take, fork } from "redux-saga/effects";
import {Immutable, Record, List, Map, toJS, fromJS} from 'immutable';
import * as actCreater from "../actions/a-index";
import * as taskApi from "./task-api.js";
import * as accountApi from "./account-api.js";
import * as channelApi from "./channel-api.js";
import * as officeApi from './../office-auth-api';
import {mergeTasks, mergeOfficeTaskList, mergeDetailTaskList, mergeSlackTaskList} from '../model/m-Task';
import {setLocalStrage} from '../model/m-Account';
import {isExistAccountUser} from '../model/m-Member';


/** 初期設定 */
function* hundleReqInit(){
   while (true) {
      const action = yield take(actCreater.REQ_INIT);
      const channels = yield call(channelApi.fetchChannelList);
      yield put(actCreater.initAccount(action.account, channels));
   }
}

/** ユーザー追加 */
function* hundleReqAccount() {
   while (true) {
      const action = yield take(actCreater.REQ_ADD_ACCOUNT);

      //RedmineからUserIDを取得
      const redmineUserInfo = yield call(accountApi.fetchRedmineUserId, action.account.get('redmineLoginId'));
      let regAccount = action.account.set('_id', redmineUserInfo.users[0].id);

      //サーバにアカウント情報を登録
      accountApi.addAccount(regAccount);

      //ローカルストレージに登録
      setLocalStrage(regAccount);

      yield put(actCreater.addAccount(regAccount));
   }
}

/** 通常タスク取得 */
function* hundleReqTasks() {
   while (true) {
      const action = yield take(actCreater.REQ_TASKS);

      //DBタスクを取得
      const oriTasks = yield call(taskApi.fetchTaskList, action.reqTask);

      //Redmine一覧タスク取得
      const redmineTasks = yield call(taskApi.fetchRedmineTaskList, oriTasks);
      let mergeObj = mergeTasks(oriTasks, redmineTasks);

      //Redmine詳細情報取得
      const demandTaskDetailList = !action.preTaskList ? mergeObj.tasks : mergeObj.reqDetails;
      const issueList = yield call(taskApi.fetchRedmineTaskDetailList, demandTaskDetailList);
      mergeObj.tasks = mergeDetailTaskList(mergeObj, action.preTaskList, issueList);

      console.log(mergeObj);

      if(isExistAccountUser(mergeObj.members)){

         //Slack情報取得
         if(localStorage.slackToken){
            const slackTasks = yield call(taskApi.fetchSlackTaskList);
            mergeObj = mergeSlackTaskList(mergeObj, slackTasks);
         }

         //Officeタスク情報を取得
         if(!!sessionStorage.officeToken){
            const officeTasks = yield call(taskApi.fetchOfficeTaskList);
            mergeObj = mergeOfficeTaskList(mergeObj, officeTasks);
         }
      }

      //マージしたRedmineTaskをDBに更新（非同期）
      taskApi.updateTaskList(mergeObj.reqTasks);

      yield put(actCreater.recieveTasks(mergeObj));

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
   yield fork(hundleReqInit);
   yield fork(hundleReqTasks);
   yield fork(hundleReqUpdateTask);
   yield fork(hundleReqUpdNewFlg);
   yield fork(hundleReqAddTask);
   yield fork(hundleReqCleanTask);
   yield fork(hundleReqAccount);
}