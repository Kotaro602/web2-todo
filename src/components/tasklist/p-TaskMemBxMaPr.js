import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {shouldComponentUpdate} from 'react-addons-pure-render-mixin'

export default class TaskMemBxMaPr extends Component {

   shouldComponentUpdate = shouldComponentUpdate;

   chgPriority() {
      const {task, reqUpdateTask} = this.props;
      const prePriority = task.get('priority') != undefined ? task.get('priority') : 0;
      const nextPriority = prePriority == 0 ? 1 : 0;
      reqUpdateTask(task.set('priority', nextPriority));
   }

   render(){

      /** prop取得 **/
      const {task} = this.props;

      const buttonStyle = css(
         styles.todayButton,
         task.get('priority') == undefined || task.get('priority') == 0
            ? styles.nonActive : styles.active
      )

      // let imgPass;
      // switch(task.get('priority')){
      //
      //    case 1 : imgPass = "/images/star-red.png"; break;
      //    case 2 : imgPass = "/images/star-skyblue.png"; break;
      //    default: imgPass = "/images/star-normal.png"; break;
      // }

      /** レンダリング **/
      return(
         <div className={css(styles.markBox)}>
            <bottom className={buttonStyle}
                    onClick={::this.chgPriority}>今日やる</bottom>
            {/*<img src={imgPass} className={css(styles.markImg)}/>*/}
         </div>
      );
   }
}

const styles = StyleSheet.create({
   markBox:{
      display: 'inline-block',
      width: 60,
      textAlign: 'center'
   },
   todayButton:{
      cursor: 'pointer',
      width: 20,
      padding: 2,
      background: 'transparent',
      fontSize: 11,
      WebkitBorderRadius: '4px',
      textAlign: 'center',
      WebkitUserSelect: 'none'
   },
   active:{
      border: 'solid 1px #0070a3',
      color: '#0070a3'
   },
   nonActive:{
      border: 'rgba(0, 0, 0, 0.3)',
      color: 'rgba(0, 0, 0, 0.3)'
   },
   markImg:{
      cursor: 'pointer',
      width: 14
   }
});