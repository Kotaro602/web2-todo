import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';

export default class SideSearch extends Component {

   //オープン中のMenuモーダルをクローズするイベントハンドラを登録
   componentDidMount() {

      const closeMenuModal = (evt) => {
         const {openMenuModal} = this.props;
         const menuDOM = document.getElementById('menuModal');

         if(menuDOM == null || menuDOM.contains(evt.target)) return;
         if(event.target.className.match('menuImage')) return;
         openMenuModal(false);
      }
      document.addEventListener('click', closeMenuModal);
   }

   render(){

      /** レンダリング **/
      return(
         <ul className={css(styles.menuUl)}　id='menuModal'>
            <li className={css(styles.menuLi)}>アカウント設定</li>
            <li className={css(styles.menuLi)}>プロジェクト情報設定</li>
            <li className={css(styles.menuLi)}>ユーザー情報設定</li>
         </ul>
      );
   }
}

const styles = StyleSheet.create({
   menuUl:{
      position: 'relative',
      width: 150,
      backgroundColor: 'white',
      zIndex: 10,
      border: '1px solid',
      left: 12,
      listStyle: 'none',
      padding: '10px 0px 10px 5px',
      margin: 0,
      borderRadius: 8,
      fontSize: 13
   },
   menuLi:{
      lineHeight: 2.3,
      cursor: 'pointer',
      ':hover':{
         backgroundColor: 'rgba(59, 170, 227, 0.21)'
      }
   },
});