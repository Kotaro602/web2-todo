import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {shouldComponentUpdate} from 'react-addons-pure-render-mixin'

export default class TaskMemBxMaPr extends Component {

   shouldComponentUpdate = shouldComponentUpdate;

   chgPriority() {
      const {task, reqUpdateTask} = this.props;
      const prePriority = task.get('priority') != undefined ? task.get('priority') : 0;
      const nextPriority = prePriority == 2 ? 0 : prePriority + 1;
      reqUpdateTask(task.set('priority', nextPriority));
   }

   render(){

      /** prop取得 **/
      const {task} = this.props;

      let imgPass;
      switch(task.get('priority')){

         case 1 : imgPass = "/images/star-red.png"; break;
         case 2 : imgPass = "/images/star-skyblue.png"; break;
         default: imgPass = "/images/star-normal.png"; break;
      }

      /** レンダリング **/
      return(
         <div className={css(styles.markBox)}>
            <img src={imgPass} className={css(styles.markImg)} onClick={::this.chgPriority}/>
         </div>
      );
   }
}

const styles = StyleSheet.create({
   markBox:{
      display: 'inline-block',
      width: 40,
      textAlign: 'center'
   },
   markImg:{
      cursor: 'pointer',
      width: 14
   }
});