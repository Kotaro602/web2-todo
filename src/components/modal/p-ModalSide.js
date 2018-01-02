/**
 * Created by kotaro on 2017/02/05.
 */
import React, { Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Map, List, fromJS, toJS } from 'immutable';
import { reduxForm, Field } from 'redux-form/immutable';
import Account from "../../model/m-Account";

export default class ModalSide extends Component {

   changeMenuType(event){
      const changeMenuType = event.currentTarget.getAttribute('data-type');

      if(changeMenuType === 'edicGroup' || changeMenuType === 'addMembertoGroup'){
         window.alert('あ、まだ作ってないです。。必要だったら関原まで言ってください。')
         return;
      }

      this.props.chgMenuType(changeMenuType);
   }

   render() {

      const {state} = this.props;
      const menuType = state.getIn(['conf', 'menuType']);

      /** レンダリング **/
      return (
         <div className={css(styles.sideBox)}>
            <ul className={css(styles.sideUl)}>
               <li　className={menuType === 'account' ? css(styles.sideLi, styles.active) : css(styles.sideLi)}
                  onClick={::this.changeMenuType} data-type='account'>
                  <a className={css(styles.sideA)} >アカウント</a>
               </li>
               <li className={menuType === 'watchGroup' ? css(styles.sideLi, styles.active) : css(styles.sideLi)}
                   onClick={::this.changeMenuType} data-type='watchGroup'>
                  <a className={css(styles.sideA)}>ウォッチするグループ</a>
               </li>
               <li className={menuType === 'edicGroup' ? css(styles.sideLi, styles.active) : css(styles.sideLi)}
                   onClick={::this.changeMenuType} data-type='edicGroup'>
                  <a className={css(styles.sideA)}>グループ編集</a>
               </li>
               <li className={menuType === 'addMembertoGroup' ? css(styles.sideLi, styles.active) : css(styles.sideLi)}
                   onClick={::this.changeMenuType} data-type='addMembertoGroup'>
                  <a className={css(styles.sideA)}>グループメンバー編集</a>
               </li>
            </ul>
         </div>
      );
   }
}

const styles = StyleSheet.create({
   sideBox:{
      display: 'inline-block',
      borderRight: '1px solid rgba(0,0,0,.15)',
      height: '70%'
   },
   sideUl:{
      listStyle: 'none',
      margin: 0,
      padding: 0,
      cursor: 'pointer'
   },
   sideLi:{
      lineHeight: 2.7,
      padding: '0px 20px',
   },
   active:{
      backgroundColor: '#e8e8e8'
   },
   sideA:{
      width: '100%'
   }
});