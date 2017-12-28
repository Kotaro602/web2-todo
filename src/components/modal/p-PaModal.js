/**
 * Created by kotaro on 2017/02/05.
 */
import React, { Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Map, List, fromJS, toJS } from 'immutable';
import Dialog from 'rc-dialog';
import 'rc-dialog/assets/index.css';
import ModalSide from './p-ModalSide';
import AccountInfo from './p-AccountInfo';
import Account from '../../model/m-Account';


export default class PaModal extends Component {

   closeAccountModal(){
      const {openMenuModal} = this.props;
      openMenuModal(false);
   }

   showResults(data){
      const {reqAddAccount} = this.props;
      reqAddAccount(new Account().merge(data));
   }

   render() {

      const {state} = this.props;

      /** レンダリング **/
      return (
         <Dialog
            visible={state.getIn(['conf', 'openMenuFlg'])}
            animation="zoom"
            maskAnimation="fade"
            closable={false}
            onClose={::this.closeAccountModal}
            mousePosition={{x: 10, y: 10}}
         >
            <ModalSide {...this.props}/>
            <AccountInfo {...this.props} onSubmit={::this.showResults}/>
         </Dialog>
      );
   }
}


const styles = StyleSheet.create({
   addLinePopupOverLay:{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      zIndex: 1000
   },
   addLinePopup: {
      position: 'absolute',
      top: '20%',
      left: '50%',
      marginTop: -125,
      marginLeft: -350,
      border: '1px solid rgba(0,0,0,.15)',
      boxShadow: '0 1px 25px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)',
      background: 'rgb(255, 255, 255)',
      overflow: 'auto',
      borderRadius: '4px',
      outline: 'none',
      width: 700,
      height: 650,
      zIndex: 1001,

   }
});