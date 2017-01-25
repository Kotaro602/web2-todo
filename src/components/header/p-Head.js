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
            <HeadPro {...this.props}/>
            <HeadDisp {...this.props}/>
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
      marginRight: 10,
      paddingRight: 180
   }
});