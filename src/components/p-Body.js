import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import Task from '../components/tasklist/p-Task';
import SideArea from '../components/sideArea/p-Side';

export default class Body extends Component {

   render(){
      /** レンダリング **/
      return(
         <div className={css(styles.container)}>
            <div className={css(styles.sideAreaBox)}>
               <SideArea {...this.props}/>
            </div>
            <div className={css(styles.mainAreaBox)}>
               <Task {...this.props}/>
            </div>
         </div>
         );
      }
}

const styles = StyleSheet.create({
   container: {
      height: '100%',
      width: 980,
      margin: 'auto'
   },
   sideAreaBox:{
      position: 'fixed',
      width: 130,
      height: '100%',
      float: 'left',
      background: '#1562c3',
      borderRadius: 4
   },
   mainAreaBox:{
      position: 'relative',
      height: '100%',
      width: 850,
      float: 'right',
      paddingBottom: 100
   }
});