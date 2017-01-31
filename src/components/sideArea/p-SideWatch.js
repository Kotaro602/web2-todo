import React, {Component} from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';
import moment from 'moment';

export default class SideWatch extends Component {

   constructor(props) {
      super(props)
      this.state = {
         time: moment()
      };
   }

   componentDidMount() {
      setInterval(() =>{
         this.setState({ time: moment() });
      }, 1000);
   }

   render(){

      const date = this.state.time.format('MM/DD(ddd)');
      const time = this.state.time.format('HH:mm:ss');

      /** レンダリング **/
      return(
         <div className={css(styles.watchBox)}>
            <p className={css(styles.date)}>{date}</p>
            <p className={css(styles.time)}>{time}</p>
         </div>
      );
   }
}

const styles = StyleSheet.create({
   watchBox:{
      color: '#bfcce0',
      position: 'absolute',
      bottom: 0,
      width: '100%',
      borderTop: '1px solid #9b9ba2'
   },
   date:{
      marginBottom: 5,
      marginLeft: 25,
      fontSize: '14px'
   },
   time:{
      margin: '10px 0px 10px 45px',
      fontSize: '18px'
   }
});