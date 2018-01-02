import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Collapse from 'react-collapse';
import {Map} from 'immutable';
import {createNewTask} from "../../model/m-Task";

export default class HeadIcon extends Component {

   //オープン中のモーダルをクローズするイベントハンドラを登録
   componentDidMount() {

      const closeSortModal = (evt) => {
         const {openSortModal, state} = this.props;

         if(!state.getIn(['conf', 'openSortFlg'])) return;

         const sortDOM = document.getElementById('sortModal');
         if(sortDOM == null || sortDOM.contains(evt.target)) return;
         if(event.target.className.match('sortModal')) return;
         openSortModal(false);
      }

      const closeFilterModal = (evt) => {
         const {openFilterModal, state} = this.props;

         if(!state.getIn(['conf', 'openFilterFlg'])) return;

         const filterDOM = document.getElementById('filterModal');
         if(filterDOM == null || filterDOM.contains(evt.target)) return;
         if(event.target.className.match('filterModal')) return;
         openFilterModal(false);
      }

      document.addEventListener('click', closeSortModal);
      document.addEventListener('click', closeFilterModal);
   }

   actDispSortTask() {
      const {openSortModal, state} = this.props;
      openSortModal(!state.getIn(['conf', 'openSortFlg']));
   }

   actDispFilterTask() {
      const {openFilterModal, state} = this.props;
      openFilterModal(!state.getIn(['conf', 'openFilterFlg']));
   }

   sortByDate(){this.props.sortTask('date');};
   sortByPriority(){this.props.sortTask('priority');};

   noFilter(){this.props.filterTask('non')};
   filterByPriority(){this.props.filterTask('priority')};
   filterIn1Day(){this.props.filterTask('1day')};
   filterIn3Day(){this.props.filterTask('3day')};
   filterIn5Day(){this.props.filterTask('5day')};

   actAddTask() {
      const {state, reqAddTask} = this.props;
      const userId = state.getIn(['account', '_id']);
      const project = Map({
         id : 0,
         name: 'その他'
      });
      reqAddTask(createNewTask(userId, project));
   };

   actCleanTask() {
      const {state, reqCleanTask} = this.props;
      reqCleanTask(state.getIn(['account', '_id']));
   }

   actRefresh(){
      const {reqTasks, state} = this.props;
      const userId = state.getIn(['account', '_id']);
      const selectGroup = state.getIn(['conf', 'selectGroup']);
      reqTasks(state.get('tasks'), !!selectGroup ? selectGroup : userId);
   }

   render() {

      const {state} = this.props;

      /** レンダリング **/
      return (
         <ul className={css(styles.iconArea)} >
            <li className={css(styles.iconBox)} onClick={::this.actDispFilterTask} id='filterModal'>
               <img src="/images/funnel.png" className={css(styles.iconImage)}/>
               <Collapse isOpened={state.getIn(['conf', 'openFilterFlg'])} keepCollapsedContent={false}>
                  <div className={css(styles.iconModalBox)}>
                     <ul className={css(styles.iconUl)}　id='iconModal'>
                        <li className={css(styles.iconLi)} onClick={::this.noFilter}>全て</li>
                        <li className={css(styles.iconLi)} onClick={::this.filterByPriority}>星付き</li>
                        <li className={css(styles.iconLi)} onClick={::this.filterIn1Day}>本日期限</li>
                        <li className={css(styles.iconLi)} onClick={::this.filterIn3Day}>３日以内</li>
                        <li className={css(styles.iconLi)} onClick={::this.filterIn5Day}>５日以内</li>
                     </ul>
                  </div>
               </Collapse>
            </li>
            <li className={css(styles.iconBox)} onClick={::this.actDispSortTask} id='sortModal'>
               <img src="/images/sort-alphabet.png" className={css(styles.iconImage)}/>
               <Collapse isOpened={state.getIn(['conf', 'openSortFlg'])} keepCollapsedContent={false}>
                  <div className={css(styles.iconModalBox)}>
                     <ul className={css(styles.iconUl)}　id='iconModal'>
                        <li className={css(styles.iconLi)} onClick={::this.sortByDate}>締切日</li>
                        <li className={css(styles.iconLi)} onClick={::this.sortByPriority}>優先度</li>
                     </ul>
                  </div>
               </Collapse>
            </li>
            <li className={css(styles.iconBox)} onClick={::this.actAddTask}>
               <img src="/images/add.png" className={css(styles.iconImage)}/>
            </li>
            <li className={css(styles.iconBox)} onClick={::this.actCleanTask}>
               <img src="/images/swipe.png" className={css(styles.iconImage)}/>
            </li>
            <li className={css(styles.iconBox)} onClick={::this.actRefresh}>
               <img src="/images/recycling.png" className={css(styles.iconImage)}/>
            </li>
         </ul>
   );
      }
   }

const styles = StyleSheet.create({
   iconArea: {
      float: 'right',
      margin: 0,
      padding: 0
   },
   iconBox:{
      display: 'inline-block',
      height: 35,
      width: 35,
      padding: '0px 5px',
      cursor: 'pointer'
   },
   iconImage: {
      width: 25,
      position: 'relative',
      top: 4
   },
   iconModalBox:{
      position: 'fixed',
      zIndex: 10
   },
   iconUl:{
      position: 'absolute',
      backgroundColor: 'white',
      width: 110,
      zIndex: 10,
      left: -10,
      top: 5,
      listStyle: 'none',
      padding: '8px 10px',
      margin: 0,
      border: '1px solid rgba(0,0,0,.15)',
      boxShadow: '0 5px 10px rgba(0,0,0,.12)',
      borderRadius: 6,
      fontSize: 13,
      color: 'black'
   },
   iconLi:{
      lineHeight: 2,
      cursor: 'pointer',
      ':hover':{
         borderRadius: 6,
         backgroundColor: 'rgba(59, 170, 227, 0.21)'
      }
   }
});