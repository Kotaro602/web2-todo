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
      this.props.chgMenuType(changeMenuType);
   }

   render() {

      const {state} = this.props;
      const menuType = state.getIn(['conf', 'menuType']);

      /** レンダリング **/
      return (
         <div className={css(styles.sideBox)}>
            <ul className={css(styles.sideUl)}>
               <li className={css(styles.sideLiTitle)}>個人設定</li>
               <li　className={menuType === 'account' ? css(styles.sideLi, styles.active) : css(styles.sideLi)}
                  onClick={::this.changeMenuType} data-type='account'>
                  <a className={css(styles.sideA)} >アカウント</a>
               </li>
               {/*<li　className={menuType === 'account' ? css(styles.sideLi, styles.active) : css(styles.sideLi)}*/}
                   {/*onClick={::this.changeMenuType} data-type='account'>*/}
                  {/*<a className={css(styles.sideA)} >外部連携</a>*/}
               {/*</li>*/}
               <li className={menuType === 'watchGroup' ? css(styles.sideLi, styles.active) : css(styles.sideLi)}
                   onClick={::this.changeMenuType} data-type='watchGroup'>
                  <a className={css(styles.sideA)}>ウォッチするグループ</a>
               </li>
               <li className={css(styles.sideLiTitle)}>管理設定</li>
               <li className={menuType === 'addGroup' ? css(styles.sideLi, styles.active) : css(styles.sideLi)}
                   onClick={::this.changeMenuType} data-type='addGroup'>
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
   },
   sideLiTitle:{
     margin:'10 0 0 7',
      fontSize: 13,
      fontWeight: 600
   },
   sideLi:{
      lineHeight: 2.7,
      padding: '0px 20px',
      cursor: 'pointer'
   },
   active:{
      backgroundColor: '#e8e8e8'
   },
   sideA:{
      width: '100%'
   }
});