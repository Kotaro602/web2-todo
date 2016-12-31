import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';

export default class SidePublic extends Component {

   render(){

      /** レンダリング **/
      return(
         <div className={css(styles.publicBox)}>
            <span>public</span>
            <ul className={css(styles.publicUl)}>
               <li>#18MAIN</li>
               <li>#19PRE</li>
            </ul>
         </div>
      );
   }
}

const styles = StyleSheet.create({
   publicBox:{
   margin : '30px 15px',
      color: 'white'
   },
   publicUl:{
      listStyle: 'none',
      padding: 0,
      marginTop: 5
   }
});