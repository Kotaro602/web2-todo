/**
 * Created by kotaro on 2017/02/05.
 */
import React, { Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Map, List, fromJS, toJS } from 'immutable';
import Dialog from 'rc-dialog';
import 'rc-dialog/assets/index.css';
import AlertContainer from 'react-alert'
import ModalSide from './p-ModalSide';
import AccountInfo  from './p-AccountInfo';
import Account from '../../model/m-Account';
import WatchGroup from './p-WatchGroup';
import AddGroup from './p-AddGroup';

export default class PaModal extends Component {

   alertOptions = {
      offset: 30,
      position: 'top center',
      theme: 'dark',
      time: 1500,
      transition: 'fade',
      type: 'success'
   };

   closeAccountModal(){
      const {openMenuModal} = this.props;
      openMenuModal(false);
   }

   setAccount(data){
      const {reqAddAccount} = this.props;
      reqAddAccount(new Account().merge(data));
      this.msg.show('登録完了しました',{type: 'success'});
   }

   setChannelAccount(data){

      const watchGroupArray = [];
      data.map((flg, key) => flg && watchGroupArray.push(key));
      const nextAccount = this.props.state.get('account').set('watchGroup', watchGroupArray);
      this.props.reqAddAccount(nextAccount);
      this.msg.show('登録完了しました',{type: 'success'});
   }

   render() {

      const {state} = this.props;
      const menu = state.getIn(['conf', 'menuType']);

      /** レンダリング **/
      return (
         <div>
         <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
         <Dialog
            visible={state.getIn(['conf', 'openMenuFlg'])}
            animation="zoom"
            maskAnimation="fade"
            closable={false}
            onClose={::this.closeAccountModal}
            mousePosition={{x: 10, y: 10}}
         >
            <ModalSide {...this.props}/>
            {menu === 'account' && <AccountInfo {...this.props} onSubmit={::this.setAccount}/>}
            {menu === 'watchGroup' && <WatchGroup {...this.props} onSubmit={::this.setChannelAccount}/>}
            {menu === 'addGroup' && <AddGroup {...this.props} onSubmit={::this.setChannelAccount}/>}
         </Dialog>
         </div>
      );
   }
}


const styles = StyleSheet.create({

});