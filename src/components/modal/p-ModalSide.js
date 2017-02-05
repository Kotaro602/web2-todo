/**
 * Created by kotaro on 2017/02/05.
 */
import React, { Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Map, List, fromJS, toJS } from 'immutable';
import { reduxForm, Field } from 'redux-form/immutable';

export default class ModalSide extends Component {

   render() {

      /** レンダリング **/
      return (
         <div className={css(styles.sideBox)}>
            <ul className={css(styles.sideUl)}>
               <li className={css(styles.sideLi)}>
                  <a className={css(styles.sideA)}>アカウント設定</a>
               </li>
               <li className={css(styles.sideLi)}>
                  <a className={css(styles.sideA)}>プロジェクト設定</a>
               </li>
               <li className={css(styles.sideLi)}>
                  <a className={css(styles.sideA)}>メンバー設定</a>
               </li>
               <li className={css(styles.sideLi)}>
                  <a className={css(styles.sideA)}>更新履歴</a>
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
      padding: 0
   },
   sideLi:{
      lineHeight: 2.7,
      padding: '0px 20px',
      ':hover':{
         backgroundColor: '#e8e8e8'
      }
   },
   sideA:{
      width: '100%'
   }
});