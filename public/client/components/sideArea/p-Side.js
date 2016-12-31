import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import SideSearch from './p-SideSearch';
import SidePublic from './p-SidePublic';

export default class SideArea extends Component {

   render(){

      /** レンダリング **/
      return(
         <div>
            <div className={css(styles.titleBox)}>
               <h1 className={css(styles.title)}>WEB2-todo</h1>
               <h4 className={css(styles.version)}>version 0.1</h4>
            </div>
            <SideSearch {...this.props} />
            <SidePublic {...this.props} />
         </div>
      );
   }
}

const styles = StyleSheet.create({
   titleBox:{
      marginLeft: 15,
      marginBottom: 30,
      width: 100
   },
   title: {
      font: '18px "Comic Sans MS", Helvetica, Arial, sans-serif',
      color: 'white',
      marginBottom: 0,
      marginTop: 20
   },
   version: {
      color: 'white',
      textAlign: 'right',
      marginTop: 0,
      paddingRight: 3
   }
});