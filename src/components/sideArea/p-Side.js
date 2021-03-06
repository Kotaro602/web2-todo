import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import Collapse from 'react-collapse';
import SideWatch from './p-SideWatch';
import SideProject from './p-SideProject';
import SideMenu from './p-SideMenu';

export default class SideArea extends Component {

   actOpenMenuModal(){
      const {openMenuModal, state} = this.props;
      const openFlg = state.getIn(['conf', 'openMenuFlg']);
      openMenuModal(!openFlg);
   }

   render(){

      const {state} = this.props;

      /** レンダリング **/
      return(
         <div>
            <div className={css(styles.titleBox)}>
               <img src="/images/menu.png" className={css(styles.menuImage)} onClick={::this.actOpenMenuModal}/>
               <span className={css(styles.title)}>WEB2-todo</span>
            </div>
            <SideProject {...this.props} />
            <SideWatch {...this.props} />
         </div>
      );
   }
}

const styles = StyleSheet.create({
   titleBox:{
      paddingTop: 10,
      width: '100%',
      height: 35,
      backgroundColor: '#42464c'
   },
   menuImage:{
      width: 14,
      marginLeft: 15,
      cursor: 'pointer'
   },
   title: {
      font: '18px "Comic Sans MS", Helvetica, Arial, sans-serif',
      color: '#eaeaea',
      marginLeft: 15
   },
   sideHr: {
      margin: 0,
      borderColor: '#7f828a'
   }
});