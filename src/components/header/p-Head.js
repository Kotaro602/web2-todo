import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Collapse from 'react-collapse';
import HeadPro from './p-HeadPro';
import HeadDisp from './p-HeadDisp';
import HeadIcon from './p-HeadIcon';
import {shouldComponentUpdate} from 'react-addons-pure-render-mixin'

export default class Head extends Component {

   shouldComponentUpdate = shouldComponentUpdate;

   render() {

      /** prop取得 **/
      const {member , isOpened} = this.props;

      /** レンダリング **/
      return (
         <div className={css(styles.projectTitleBox)}>
            <div className={css(styles.titleAndSelectBox)}>
               {/*<HeadPro {...this.props}/>*/}
               <HeadDisp {...this.props}/>
            </div>
            <HeadIcon {...this.props}/>
         </div>
      );
      }
   }

const styles = StyleSheet.create({
   projectTitleBox: {
      height: 35,
      backgroundColor: '#3baae3',
      color: 'white',
      paddingRight: 180,
      overflow: 'hidden'
   },
   titleAndSelectBox:{
      width: 580,
      float: 'left',
      marginRight: -180,
      paddingRight: 180
   }
});