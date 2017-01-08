/**
 * Created by ma on 2017/01/07.
 */
import {Immutable, Record, List, toJS, fromJS} from 'immutable';
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

   constructor() {
      super({
         redmineFlg: false,
         tempDelFlg: false,
         compDelFlg: false,
         taskName: '',
         dueDate: moment().add("days", 7).format("YYYY-MM-DD"),
         priority: 0,
         privateFlg: false,
         lineFlg: false,
         project: fromJS({id : 999, name: 'その他'})
      })
   }
}

//オブジェクトを元にタスク作成
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

//同一ユーザタスクのs最大SortValueを取得する
function getMaxValue(userId, tasks){

   let maxSortVal = 100;
   tasks.map((task) => {
      let taskSortVal = task.get('sortValue');
      if(taskSortVal !== undefined && task.get('redmineUserId') == userId && taskSortVal >=  maxSortVal)
         maxSortVal = taskSortVal + Math.random() + 1;
   })
   return maxSortVal;
}

//オブジェクトを元にタスクリスト作成
export function createTaskListFromObj(tasks){

   let taskList = List([]);
   tasks.map(task => taskList = taskList.push(copyTaskFromObj(task)));
   return taskList;
}

//新規タスク作成
export function createNewTask(userId, tasks){

   let newTask = new Task();
   newTask = newTask.set('_id', getId(userId));
   newTask = newTask.set('redmineUserId', parseFloat(userId));
   newTask = newTask.set('sortValue', getMaxValue(userId, tasks));
   return newTask;
}

//新規ボーダーラインを作成
export function createNewLine(userId, lineName){

   let newLine = new Task();
   newLine = newLine.set('_id', getId(userId));
   newLine = newLine.set('redmineUserId', parseFloat(userId));
   newLine = newLine.set('taskName', lineName);
   newLine = newLine.set('lineFlg', true);
   return newLine;
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