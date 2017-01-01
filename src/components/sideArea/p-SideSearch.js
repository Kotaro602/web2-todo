import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';

export default class SideSearch extends Component {

   render(){

      /** レンダリング **/
      return(
         <dl className={css(styles.searchBox)}>
            <dt>
               <input type="text" className={css(styles.searchInput)} placeholder="taskSearch"/>
            </dt>
            <dd className={css(styles.searchDd)}>
               <button className={css(styles.searchButton)}>
                  <span className={css(styles.searchSpan)}></span>
               </button>
            </dd>
         </dl>
      );
   }
}

const styles = StyleSheet.create({
   searchBox:{
      position: 'relative',
      width: 120,
      margin: 'auto',
      backgroundColor: '#fff',
      border:'1px solid #aaa',
      borderRadius: 4
   },
   searchInput:{
      width: 90,
      height: 20,
      lineHeight: 20,
      background: 'none',
      border: 'none',
      marginLeft: 5
   },
   searchDd:{
      position: 'absolute',
      top: -1,
      right: 0,
   },
   searchButton:{
      display: 'block',
      background: 'none',
      border: 'none',
      height: 24
   },
   searchSpan:{
      display: 'block',
      width: 16,
      height: 16,
      background: 'url("/images/search.png") no-repeat scroll -35px 0'
   }
});