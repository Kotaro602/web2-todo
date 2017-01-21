/**
 * Created by ma on 2017/01/07.
 */
import {Immutable, Record, List, Map, toJS, fromJS} from 'immutable';
import moment from 'moment';

const TaskRecord = Record({
   _id: undefined, //タスクID
   redmineUserId: undefined,
   redmineFlg: undefined,
   taskName: undefined,
   tempDelFlg: undefined,
   compDelFlg: undefined,
   dueDate: undefined,
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
   journals: undefined
});

export default class Task extends TaskRecord {

   //初期データ
   constructor() {
      super()
   }
}

/********************************** Private Method ************************************/

//DBデータを元にノーマルタスク作成
function copyTaskFromObj(task){

   let nextTask = new Task();
   nextTask = nextTask.set('_id', task._id);
   nextTask = nextTask.set('redmineUserId', task.redmineUserId);
   nextTask = nextTask.set('redmineFlg', task.redmineFlg);
   nextTask = nextTask.set('taskName', task.taskName);
   nextTask = nextTask.set('tempDelFlg', task.tempDelFlg);
   nextTask = nextTask.set('compDelFlg', task.compDelFlg);
   nextTask = nextTask.set('dueDate', task.dueDate);
   nextTask = nextTask.set('estimate', task.estimate);
   nextTask = nextTask.set('priority', task.priority);
   nextTask = nextTask.set('taskMemo', task.taskMemo);
   nextTask = nextTask.set('sortValue', task.sortValue);
   nextTask = nextTask.set('lineFlg', task.lineFlg);
   nextTask = nextTask.set('project', fromJS(task.project));
   nextTask = nextTask.set('redmineUpdDate', task.redmineUpdDate);
   nextTask = nextTask.set('newFlg', task.newFlg);

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
   nextTask = nextTask.set('project', Map({id: task.project.id, name: task.project.name}));
   nextTask = nextTask.set('tempDelFlg', false);
   nextTask = nextTask.set('compDelFlg', false);
   nextTask = nextTask.set('redmineUpdDate', task.updated_on);
   nextTask = nextTask.set('newFlg', true); //初回は必ずfalseにする。

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
   nextTask = nextTask.set('project', Map({id: task.project.id, name: task.project.name}));
   nextTask = nextTask.set('redmineUpdDate', task.updated_on);

   const newFlg = preTask.get('newFlg') || preTask.get('redmineUpdDate') != task.updated_on;
   nextTask = nextTask.set('newFlg', newFlg);

   return nextTask;
}

//タスクIDを元にINDEXを取得する
function findIndexById(taskList, id) {
   return taskList.findIndex((task) => task.get('_id') == id);
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

   //RedmineTaskをDBタスクに追加/マージする。
   if(redmineTasks != null) {
      redmineTasks.map(members => {
         members.issues.forEach(task => {

            const index = findIndexById(mergeTaskList, task.id);
            if (index >= 0) {
               const mergeTask = mergeRedmineTask(mergeTaskList.get(index), task);
               mergeTaskList = mergeTaskList.set(index, mergeTask);
               reqRedmineTaskList = reqRedmineTaskList.push(mergeTask);
            } else {
               const addTask = copyTaskFromRedmine(task);
               mergeTaskList = mergeTaskList.push(addTask);
               reqRedmineTaskList = reqRedmineTaskList.push(addTask);
            }

            //完了済みのRedmineタスクを知るために、RedmineのIDリストを取得する。
            redmineIdList = redmineIdList.push(task.id);
         })
      })

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

   return mergeObj;
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

   const journals = List([]);
   issue.journals.forEach(journal => {

      journals.push(
         Map({
            id: journal.id,
            notes: journal.notes,
            createOn: journal.created_on,
            user: fromJS(journal.user)
         })
      );
   });

   nextTask = nextTask.set('journals', journals);

   return nextTask;
}

/** タスクリストをフィルタリング&ソートする。
 * フィルタリング条件：同一ユーザ＆タスク未完了
 * 第一ソートキー：プロジェクトID
 * 第二ソートキー：日付
 */
export function sortAndFilterTask(taskList, userId){

   taskList = taskList.filter(t => t.get('redmineUserId') == userId && !t.get('compDelFlg'));

   taskList = taskList.sort((a, b) => {
      if(b.get('project').get('id') !== a.get('project').get('id')){
         return b.get('project').get('id') - a.get('project').get('id');

      }else if(b.get('priority') !== a.get('priority')) {
         return b.get('priority') - a.get('priority');

      }else if(a.get('dueDate') != b.get('dueDate')){
         return a.get('dueDate') < b.get('dueDate') ? -1 : 1;

      }else{
         return a.get('_id') - b.get('_id');
      }
   });

   return taskList;
}

/**
 * Redmineのプロジェクトごとにタスクを分割する
 *
 * @param taskList
 * @returns {List<*|List<any>|List<any>>}
 */
export function sumEachProject(taskList){

   let taskProjectList = List([]);
   let tmpTaskList = List([]);

   //プロジェクトごとにListに分割する。
   taskList.map((task, i) => {

      //前のタスクと同じならば詰め替える。
      if(i != 0 && taskList.getIn([i - 1, 'project', 'id']) != task.getIn(['project', 'id'])){
         taskProjectList = taskProjectList.push(tmpTaskList);
         tmpTaskList = List([]);
      }
      tmpTaskList = tmpTaskList.push(task);
   })

   return taskProjectList.push(tmpTaskList);
}