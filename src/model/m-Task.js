/**
 * Created by ma on 2017/01/07.
 */
import {Immutable, Record, List, Map, toJS, fromJS} from 'immutable';
import moment from 'moment';
import koyomi from 'koyomi';

const TaskRecord = Record({
   _id: undefined, //タスクID
   redmineUserId: undefined,
   redmineFlg: undefined,
   taskName: undefined,
   tempDelFlg: undefined,
   compDelFlg: undefined,
   dueDate: undefined,
   remainDate: undefined,
   estimate: undefined,
   priority: undefined,
   taskMemo: undefined,
   privateFlg: undefined,
   createUserId: undefined,
   sortValue: undefined,
   lineFlg: undefined,
   project: undefined,
   newFlg: undefined,
   redmineUpdDate: undefined,
   startDate: undefined,
   description: undefined,
   tracker: undefined,
   status: undefined,
   updateJournalsFlg: undefined,
   journals: undefined,
   slackFlg: undefined,
   officeFlg: undefined
});

export default class Task extends TaskRecord {

   //初期データ
   constructor() {
      super()
   }

   changeDueDate(dueDate){

      const nextTask = this.set('dueDate', dueDate.format("YYYY-MM-DD"));
      return nextTask.set('remainDate', culcRemainDay(nextTask.get('dueDate')));
   }
}

/********************************** Private Method ************************************/

//DBデータを元にノーマルタスク作成
function copyTaskFromObj(task){

   let nextTask = new Task();
   nextTask = nextTask.set('_id', task._id);
   nextTask = nextTask.set('redmineUserId', task.redmineUserId);
   nextTask = nextTask.set('redmineFlg', task.redmineFlg);
   nextTask = nextTask.set('slackFlg', task.slackFlg);
   nextTask = nextTask.set('officeFlg', task.officeFlg);
   nextTask = nextTask.set('taskName', task.taskName);
   nextTask = nextTask.set('tempDelFlg', task.tempDelFlg);
   nextTask = nextTask.set('compDelFlg', task.compDelFlg);
   nextTask = nextTask.set('dueDate', task.dueDate);
   nextTask = nextTask.set('remainDate', culcRemainDay(task.dueDate));
   nextTask = nextTask.set('priority', task.priority);
   nextTask = nextTask.set('taskMemo', task.taskMemo);
   nextTask = nextTask.set('sortValue', task.sortValue);
   nextTask = nextTask.set('lineFlg', task.lineFlg);
   nextTask = nextTask.set('project', fromJS(task.project));
   nextTask = nextTask.set('redmineUpdDate', task.redmineUpdDate);
   nextTask = nextTask.set('newFlg', task.newFlg);
   nextTask = nextTask.set('updateJournalsFlg', false);

   return nextTask;
}

function getId(redmineUserId){

   var date = new Date();
   var yyyy = date.getFullYear(); // 西暦を取得
   var mm = date.getMonth() + 1;  // 月を取得（返り値は実際の月-1なので、+1する）
   var dd = date.getDate(); // 日を取得
   var hh = date.getHours();
   var mi = date.getMinutes();
   var ss = date.getSeconds(); //秒
   var ms = date.getMilliseconds() //ミリ秒

   // 一桁の場合は先頭に0をつける
   if (mm < 10) mm = "0" + mm;
   if (dd < 10) dd = "0" + dd;
   if (hh < 10) hh = "0" + hh;
   if (mi < 10) mi = "0" + mi;
   if (ss < 10) ss = "0" + ss;

   return redmineUserId + yyyy + mm + dd + hh + mi + ss + ms;
}

//オブジェクトを元にタスクリスト作成
function createTaskListFromObj(tasks){

   let taskList = List([]);
   tasks.map(task => taskList = taskList.push(copyTaskFromObj(task)));
   return taskList;
}

/**
 * Redmineタスクの新規作成
 *
 * @param task
 * @returns {Task}
 */
function copyTaskFromRedmine(task){

   let nextTask = new Task();
   nextTask = nextTask.set('_id', task.id);
   nextTask = nextTask.set('redmineUserId',task.assigned_to.id);
   nextTask = nextTask.set('redmineFlg', true);
   nextTask = nextTask.set('taskName', task.subject);
   nextTask = nextTask.set('dueDate', task.due_date);
   nextTask = nextTask.set('remainDate', culcRemainDay(task.due_date));
   nextTask = nextTask.set('project', Map({id: task.project.id, name: task.project.name}));
   nextTask = nextTask.set('tempDelFlg', false);
   nextTask = nextTask.set('compDelFlg', false);
   nextTask = nextTask.set('redmineUpdDate', task.updated_on);
   nextTask = nextTask.set('newFlg', true); //初回は必ずfalseにする。
   nextTask = nextTask.set('startDate', task.start_date);
   nextTask = nextTask.set('description', task.description);
   nextTask = nextTask.set('tracker', Map({id: task.tracker.id, name: task.tracker.name}));
   nextTask = nextTask.set('status', Map({id: task.status.id, name: task.status.name}));
   nextTask = nextTask.set('updateJournalsFlg', true);

   return nextTask;
}

/**
 * DBから取得したデータにRedmineタスクをマージする
 *
 * @param preTask
 * @param task
 * @returns {*}
 */
function mergeRedmineTask(preTask, task){

   let nextTask = preTask;
   nextTask = nextTask.set('redmineUserId',task.assigned_to.id);
   nextTask = nextTask.set('taskName', task.subject);
   nextTask = nextTask.set('dueDate', task.due_date);
   nextTask = nextTask.set('remainDate', culcRemainDay(task.due_date));
   nextTask = nextTask.set('project', Map({id: task.project.id, name: task.project.name}));
   nextTask = nextTask.set('redmineUpdDate', task.updated_on);
   nextTask = nextTask.set('startDate', task.start_date);
   nextTask = nextTask.set('description', task.description);
   nextTask = nextTask.set('tracker', Map({id: task.tracker.id, name: task.tracker.name}));
   nextTask = nextTask.set('status', Map({id: task.status.id, name: task.status.name}));
   nextTask = nextTask.set('updateJournalsFlg', preTask.get('redmineUpdDate') != task.updated_on);
   nextTask = nextTask.set('newFlg', preTask.get('newFlg') || preTask.get('redmineUpdDate') != task.updated_on);

   return nextTask;
}

/**
 * タスクIDからINDEXを取得する
 * @param taskList
 * @param id
 */
function findIndexById(taskList, id) {
   return taskList.findIndex((task) => task.get('_id') === id);
}

/**
 *
 * @param oriJournals
 * @returns {*|List<T>|List<any>}
 */
function formatJournals(oriJournals){

   let journalList = List([]);
   oriJournals.map(journal => {

      if(journal.notes == '') return;

      journalList = journalList.push(
         Map({
            id: journal.id,
            notes: journal.notes,
            createOn: moment(journal.created_on).format('MM/DD HH:mm'),
            user: fromJS(journal.user)
         })
      );
   });

   return journalList;
}

/**
 * Slackタスクを新規作成
 */
function createSlackTask(task){

   let nextTask = new Task();
   nextTask = nextTask.set('_id', Number(task.date_create));
   nextTask = nextTask.set('redmineUserId',Number(localStorage._id));
   nextTask = nextTask.set('redmineFlg', false);
   nextTask = nextTask.set('slackFlg', true);
   nextTask = nextTask.set('taskName', task.message.text);
   nextTask = nextTask.set('project', Map({id: 1, name: 'slack'}));
   nextTask = nextTask.set('tempDelFlg', false);
   nextTask = nextTask.set('compDelFlg', false);
   nextTask = nextTask.set('dueDate', moment().add("days", 7).format("YYYY-MM-DD"));

   return nextTask;
}

/**
 * Officeタスクを新規作成
 */
function createOfficeTask(task, officeId){

   const dueDate = task.DueDateTime !== null ?
      task.DueDateTime.DateTime : moment().add("days", 7).format("YYYY-MM-DD");

   let nextTask = new Task();
   nextTask = nextTask.set('_id', officeId);
   nextTask = nextTask.set('redmineUserId',Number(localStorage._id));
   nextTask = nextTask.set('officeFlg', true);
   nextTask = nextTask.set('taskName', task.Subject);
   nextTask = nextTask.set('project', Map({id: 2, name: 'Mail'}));
   nextTask = nextTask.set('tempDelFlg', false);
   nextTask = nextTask.set('compDelFlg', false);
   nextTask = nextTask.set('dueDate', dueDate);

   return nextTask;
}

/**
 * 締切日までの残り営業日を計算するメソッド
 * 当日は1, 締切を過ぎていたら0を返却する。
 *
 * @param dueDate
 */
function culcRemainDay(dueDate){
   return koyomi.biz(moment().format("YYYY-MM-DD"), dueDate);
}

/********************************** Public Method ************************************/

//新規タスク作成
export function createNewTask(userId, project){

   let newTask = new Task();
   newTask = newTask.set('_id', getId(userId));
   newTask = newTask.set('redmineUserId', parseFloat(userId));
   newTask = newTask.set('redmineFlg', false);
   newTask = newTask.set('taskName', '');
   newTask = newTask.set('tempDelFlg', false);
   newTask = newTask.set('compDelFlg', false);
   newTask = newTask.set('dueDate', moment().add("days", 7).format("YYYY-MM-DD"));
   newTask = newTask.set('priority', 0);
   newTask = newTask.set('project', project);

   return newTask;
}

//DBから取得したタスクとREDMINEから取得したタスクをマージする
export function mergeTasks(dbMemberAndTask, redmineTasks){

   //DBTaskリストをTaskRecordに変換
   let mergeTaskList = createTaskListFromObj(dbMemberAndTask.tasks);
   let redmineIdList = List([]);
   let reqRedmineTaskList = List([]);
   let reqRedmineDetailList = List([]);

   //RedmineTaskをDBタスクに追加/マージする。
   if(redmineTasks != null) {
      redmineTasks.map(members => {
         members.issues.forEach(task => {

            const index = findIndexById(mergeTaskList, task.id);

            //更新時刻が更新されていたら詳細情報を取得する
            if(mergeTaskList.getIn([index, 'redmineUpdDate']) !== task.updated_on){
               reqRedmineDetailList = reqRedmineDetailList.push(mergeTaskList.get(index));
            }

            if (index >= 0) {
               //既にDBに登録済みのRedmineタスク
               const mergeTask = mergeRedmineTask(mergeTaskList.get(index), task);
               mergeTaskList = mergeTaskList.set(index, mergeTask);
               reqRedmineTaskList = reqRedmineTaskList.push(mergeTask);

            } else {
               //Redmine未登録のタスク
               const addTask = copyTaskFromRedmine(task);
               mergeTaskList = mergeTaskList.push(addTask);
               reqRedmineTaskList = reqRedmineTaskList.push(addTask);
               reqRedmineDetailList = reqRedmineDetailList.push(addTask);
            }

            //完了済みのRedmineタスクを知るために、RedmineのIDリストを取得する。
            redmineIdList = redmineIdList.push(task.id);
         })
      });

      //完了済みのRedmineタスクを調べる
      mergeTaskList.map((task, taskIndex) => {

         //Redmineタスクでなければスキップ
         if (task.get('redmineFlg') === false) return;

         //完了済みのタスクを更新する
         const redmineIndex = redmineIdList.indexOf(task.get('_id'));
         if (redmineIndex === -1) {
            const compTask = mergeTaskList.get(taskIndex).set('compDelFlg', true);
            mergeTaskList = mergeTaskList.set(taskIndex, compTask);
            reqRedmineTaskList = reqRedmineTaskList.push(compTask);
         }
      });
   }

   //DB情報とRedmine情報をマージしてreducerに渡す
   const mergeObj = new Object();
   mergeObj.members = fromJS(dbMemberAndTask.members);
   mergeObj.tasks = mergeTaskList;
   mergeObj.reqTasks = reqRedmineTaskList;
   mergeObj.reqDetails = reqRedmineDetailList;

   return mergeObj;
}

/**
 * Redmineの詳細情報を全てマージする。
 *
 * @param mergeObj
 * @param preTaskList
 * @param issueList
 */
export function mergeDetailTaskList(mergeObj, preTaskList, issueList){

   let mergeList = mergeObj.tasks;

   //最初に元の履歴を全部コピーする
   if(preTaskList !== undefined) {
      preTaskList.map(task => {

         //Redmineタスク以外はスキップ
         if(!task.get('redmineFlg')) return;

         const index = findIndexById(mergeList, task.get('_id'));
         if (index === -1) return;

         mergeList = mergeList.setIn([index, 'journals'], task.get('journals'));
      })
   }

   //更新リストをマージする。
   issueList.map((data) =>{

      if(data === undefined) return;
      const index = findIndexById(mergeList, data.issue.id);
      mergeList = mergeList.setIn([index, 'journals'], formatJournals(data.issue.journals));
   });

   return mergeList;
}

/**
 * Redmineモーダルの詳細情報を取得しマージする。
 *
 * @param preTask
 * @param issue
 * @returns {*}
 */
export function mergeDetailTask(preTask, issue){

   let nextTask = preTask;
   nextTask = nextTask.set('startDate', issue.start_date);
   nextTask = nextTask.set('description', issue.description);
   nextTask = nextTask.set('tracker', Map({id: issue.tracker.id, name: issue.tracker.name}));
   nextTask = nextTask.set('status', Map({id: issue.status.id, name: issue.status.name}));

   let journals = List([]);
   issue.journals.forEach(journal => {

      journals = journals.push(
         Map({
            id: journal.id,
            notes: journal.notes,
            createOn: moment(journal.created_on).format('MMDD HH:mm'),
            user: fromJS(journal.user)
         })
      );
   });
   nextTask = nextTask.set('journals', journals);

   return nextTask;
}

/**
 * Slackタスクをマージ
 * @param mergeObj
 * @param slackObj
 * @returns {*}
 */
export function mergeSlackTaskList(mergeObj, slackTasks){

   let mergeTaskList = mergeObj.tasks;
   let reqSlackTaskList = mergeObj.reqTasks;
   let slackIdList = List([]);

   //Slackタスクを追加
   slackTasks.items.forEach(task => {

      if(task.type !== 'message') return;

      const index = findIndexById(mergeTaskList, Number(task.date_create));

      if(index === -1){
         //DB未登録のSlackタスク
         const addTask = createSlackTask(task);
         mergeTaskList = mergeTaskList.push(addTask);
         reqSlackTaskList = reqSlackTaskList.push(addTask);
      }

      slackIdList = slackIdList.push(Number(task.date_create));
   });

   //完了済のSlackタスクを調べる
   mergeTaskList.map((task, taskIndex) => {

      if (!task.get('slackFlg')) return;

      //完了済みのタスクを更新する
      const slackIndex = slackIdList.indexOf(task.get('_id'));
      if (slackIndex === -1) {
         const compTask = mergeTaskList.get(taskIndex).set('compDelFlg', true);
         mergeTaskList = mergeTaskList.set(taskIndex, compTask);
         reqSlackTaskList = reqSlackTaskList.push(compTask);
      }
   });

   mergeObj.tasks = mergeTaskList;
   mergeObj.reqTasks = reqSlackTaskList;

   return mergeObj;
}

/**
 * Officeタスクをマージ
 * @param mergeObj
 * @param slackObj
 * @returns {*}
 */
export function mergeOfficeTaskList(mergeObj, officetask){

   if(!officetask) return mergeObj;

   let mergeTaskList = mergeObj.tasks;
   let reqOfficeTaskList = mergeObj.reqTasks;
   let officeIdList = List([]);

   //完了済タスクを除外する
   officetask = officetask.value.filter(task => task.Status !== 'Completed');

   console.log(officetask);

   //Officeタスクを追加
   officetask.forEach(task => {

      const officeId = Number(moment(task.CreatedDateTime).format('YYYYMMDDHHmmssSSS'));
      const index = findIndexById(mergeTaskList, officeId);

      if(index === -1){
         //DB未登録のSlackタスク
         const addTask = createOfficeTask(task, officeId);
         mergeTaskList = mergeTaskList.push(addTask);
         reqOfficeTaskList = reqOfficeTaskList.push(addTask);
      }

      officeIdList = officeIdList.push(officeId);
   });

   //完了済のSlackタスクを調べる
   mergeTaskList.map((task, taskIndex) => {

      if (!task.get('officeFlg')) return;

      console.log(task.get('_id'));

      //完了済みのタスクを更新する
      const officeIndex = officeIdList.indexOf(task.get('_id'));
      if (officeIndex === -1) {
         const compTask = mergeTaskList.get(taskIndex).set('compDelFlg', true);
         mergeTaskList = mergeTaskList.set(taskIndex, compTask);
         reqOfficeTaskList = reqOfficeTaskList.push(compTask);
      }
   });

   mergeObj.tasks = mergeTaskList;
   mergeObj.reqTasks = reqOfficeTaskList;

   return mergeObj;
}

/**
 * タスクをフィルタリングする
 *
 * @param taskList
 * @param userId
 * @param filterKey
 */
export function filterTask(taskList, userId, filterKey){

   //0件ならばスキップ
   if(taskList.size === 0) return List([]);

   return taskList.filter(t => {

      switch (filterKey){

         case 'priority':
            return t.get('redmineUserId') == userId && !t.get('compDelFlg')
               && t.get('priority') == 1

         case '1day':
            return t.get('redmineUserId') == userId && !t.get('compDelFlg')
               && t.get('remainDate') <= 1

         case '3day':
            return t.get('redmineUserId') == userId && !t.get('compDelFlg')
               && t.get('remainDate') <= 3

         case '5day':
            return t.get('redmineUserId') == userId && !t.get('compDelFlg')
               && t.get('remainDate') <= 5

         default:
            return t.get('redmineUserId') == userId && !t.get('compDelFlg')
      }
   });
}

export function sortTask(taskList, sortKey){

   if(taskList.size === 0) return List([]);

   if(sortKey == 'priority') {
      //優先度を第一ソートキートしてソートする
      taskList = taskList.sort((a, b) => {

         if (b.get('project').get('id') !== a.get('project').get('id')) {
            return b.get('project').get('id') - a.get('project').get('id');

         } else if (b.get('priority') !== a.get('priority')) {
            return b.get('priority') - a.get('priority');

         } else if (a.get('dueDate') != b.get('dueDate')) {
            return a.get('dueDate') < b.get('dueDate') ? -1 : 1;

         } else {
            return a.get('_id') - b.get('_id');
         }
      });

   }else{
      //締切日を第一ソートキートしてソートする。
      taskList = taskList.sort((a, b) => {

         if (b.get('project').get('id') !== a.get('project').get('id')) {
            return b.get('project').get('id') - a.get('project').get('id');

         } else if (a.get('dueDate') != b.get('dueDate')) {
            return a.get('dueDate') < b.get('dueDate') ? -1 : 1;

         } else {
            return a.get('_id') - b.get('_id');
         }
      });
   }

   return taskList;
}

/**
 * Redmineのプロジェクトごとにタスクを分割する
 *
 * @param taskList
 * @returns {Immutable.List<*>}
 */
export function sumEachProject(taskList){

   if(taskList.size === 0) return List([]);

   let taskProjectList = List([]);
   let tmpTaskList = List([]);

   //プロジェクトごとにListに分割する。
   taskList.map((task, i) => {

      //前のタスクと同じならば詰め替える。
      if(i !== 0 && taskList.getIn([i - 1, 'project', 'id']) !== task.getIn(['project', 'id'])){
         taskProjectList = taskProjectList.push(tmpTaskList);
         tmpTaskList = List([]);
      }
      tmpTaskList = tmpTaskList.push(task);
   });

   return taskProjectList.push(tmpTaskList);
}
