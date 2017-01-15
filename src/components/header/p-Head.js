import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Collapse from 'react-collapse';
import HeadPro from './p-HeadPro';
import HeadDisp from './p-HeadDisp';

export default class Head extends Component {

   render() {

      /** prop取得 **/
      const {member , isOpened} = this.props;

      /** レンダリング **/
      return (
         <div className={css(styles.projectTitleBox)}>
            <HeadPro {...this.props}/>
            <HeadDisp {...this.props}/>
         </div>
      );
      }
   }

const styles = StyleSheet.create({
   projectTitleBox: {
      position: 'relative',
      width: '100%',
      height: 35,
      backgroundColor: '#3baae3',
      color: 'white'
   },
   titleLink: {
      position: 'absolute',
      top: 7,
      left: 10,
      cursor :'pointer',
      ':hover > img':{
         opacity: 1,
      },
   },
   projectTitle: {
      fontSize: 20
   },
   underArrowImg: {
      width: 12,
      opacity: 0.3,
      position: 'relative',
      top: -3,
      left: 8,
      color: 'white'
   }
});