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
   project: undefined
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

//RedmineAPIを元にRedmineタスクを生成
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
   //nextTask = nextTask.set('taskMemo', task.description);

   return nextTask;
}

function mergeRedmineTask(preTask, task){

   let nextTask = preTask;
   nextTask = nextTask.set('redmineUserId',task.assigned_to.id);
   nextTask = nextTask.set('taskName', task.subject);
   nextTask = nextTask.set('dueDate', task.due_date);
   nextTask = nextTask.set('project', Map({id: task.project.id, name: task.project.name}));

   return nextTask;
}

//タスクIDを元にINDEXを取得する
function findIndexById(taskList, id) {
   return taskList.findIndex((task) => task.get('_id') == id);
}

/********************************** Public Method ************************************/

//新規タスク作成
export function createNewTask(userId){

   let newTask = new Task();
   newTask = newTask.set('_id', getId(userId));
   newTask = newTask.set('redmineUserId', parseFloat(userId));
   newTask = newTask.set('redmineFlg', false);
   newTask = newTask.set('taskName', '');
   newTask = newTask.set('tempDelFlg', false);
   newTask = newTask.set('compDelFlg', false);
   newTask = newTask.set('dueDate', moment().add("days", 7).format("YYYY-MM-DD"));
   newTask = newTask.set('priority', 0);
   newTask = newTask.set('project',Map({id : 999, name: 'その他'}));

   return newTask;
}

//DBから取得したタスクとREDMINEから取得したタスクをマージする
export function mergeTasks(dbMemberAndTask, redmineTasks){

   //DBTaskリストをTaskRecordに変換
   let mergeTaskList = createTaskListFromObj(dbMemberAndTask.tasks);
   let redmineIdList = List([]);
   let reqRedmineTaskList = List([]);

   //RedmineTaskをDBタスクに追加/マージする。
   redmineTasks.map(members => {
      members.issues.forEach(task => {

         const index = findIndexById(mergeTaskList, task.id);
         if(index >= 0){
            const mergeTask = mergeRedmineTask(mergeTaskList.get(index), task);
            mergeTaskList = mergeTaskList.set(index, mergeTask);
            reqRedmineTaskList = reqRedmineTaskList.push(mergeTask);
         }else{
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
      if(task.get('redmineFlg') === false) return;

      //完了済みのタスクを更新する
      const redmineIndex = redmineIdList.indexOf(task.get('_id'));
      if(redmineIndex === -1){
         const compTask = mergeTaskList.get(taskIndex).set('compDelFlg', true);
         mergeTaskList = mergeTaskList.set(taskIndex, compTask);
         reqRedmineTaskList = reqRedmineTaskList.push(compTask);
      }
   });

   //DB情報とRedmine情報をマージしてreducerに渡す
   const mergeObj = new Object();
   mergeObj.members = fromJS(dbMemberAndTask.members);
   mergeObj.tasks = mergeTaskList;
   mergeObj.reqTasks = reqRedmineTaskList;

   console.log(mergeObj.reqTasks.toJS());

   return mergeObj;
}

/** タスクリストをフィルタリング&ソートする。
 * フィルタリング条件：同一ユーザ＆タスク未完了
 * 第一ソートキー：プロジェクトID
 * 第二ソートキー：日付
 */
export function sortAndFilterTask(taskList, userId){

   taskList = taskList.filter(t => t.get('redmineUserId') == userId && !t.get('compDelFlg'));
   taskList= taskList.sort((a, b) => {
      if(b.get('project').get('id') !== a.get('project').get('id')){
         return a.get('project').get('id') - b.get('project').get('id');
      }else{
         return a.get('dueDate') < b.get('dueDate') ? -1 : 1;
      }
   });
   return taskList;
}