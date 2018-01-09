import React, {Component} from 'react'
import {setOfficeToken} from './../office-auth-api';
import { StyleSheet, css } from 'aphrodite/no-important';
import Task from './tasklist/p-Task';
import SideArea from './sideArea/p-Side';
import Head from './header/p-Head';
import PaModal from './modal/p-PaModal';
import {isRegistered, getFromStrage} from '../model/m-Account.js';
import {renewToken} from "../office-auth-api";

export default class Body extends Component {

   componentDidMount() {

      const {state, reqInit, openMenuModal, officeConnected} = this.props;

      if(!localStorage._id){
         //取得できない場合は登録画面を表示する
         openMenuModal(true);

      }else if (!state.getIn[('account', '_id')]){
         //画面起動時にアカウント情報を登録する
         reqInit(getFromStrage());
      }

      window.onmessage = e => {
         if(typeof (e.data) === "string"){
            console.log('updateToken');
            sessionStorage.setItem('officeToken', e.data);
            officeConnected(e.data);
         }
      }
   }

   render(){

      /** レンダリング **/
      return(
         <div className={css(styles.container)}>
            <div className={css(styles.sideAreaBox)}>
               <SideArea {...this.props}/>
            </div>
            <div className={css(styles.mainAreaBox)}>
               <Head {...this.props}/>
               <Task {...this.props}/>
            </div>
            <PaModal {...this.props}/>
         </div>
         );
      }
}

const styles = StyleSheet.create({
   container: {
      height: '100%',
      width: '100%',
      margin: 'auto'
   },
   sideAreaBox:{
      position: 'fixed',
      width: 180,
      height: '100%',
      float: 'left',
      background: 'rgb(66, 70, 76)',
      WebkitUserSelect: 'none'
   },
   mainAreaBox:{
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      left: 180
   }
});