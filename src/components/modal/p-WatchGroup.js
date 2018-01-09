/**
 * Created by kotaro on 2017/02/05.
 */
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Map, List, fromJS, toJS } from 'immutable';
import { reduxForm, Field } from 'redux-form/immutable';
import { callGraphApi, renewToken } from './../../office-auth-api.js';
import account from "../../reducers/r-account";

const  { DOM: { input, select, textarea } } = React

const renderField = ({input, label}) =>(
   <div className={css(styles.inputBox)}>
      <label>
         <input type="checkbox" name={label} value="1"
             checked={input.value ? true : false}
             onChange={input.onChange}/>{label}
      </label>
   </div>
);

class WatchGroup extends Component {

   render() {

      /** prop取得 **/
      const {state, handleSubmit, pristine, submitting, reset} = this.props;
      const channelList = state.get('channels');

      /** レンダリング **/
      return (
         <div className={css(styles.accountInfoBox)}>
            <form onSubmit={handleSubmit}>
               <div className={css(styles.inputBox)}>
                  <label className={css(styles.label)}>ウォッチするグループ</label>
                  {channelList.map((obj, key) => {
                     return(
                     <Field
                        name={`${obj._id}`}
                        label={obj.channelName}
                        key={key}
                        id={obj._id}
                        component={renderField}
                        type="checkbox"/>
                  )
                  })}
                  <button type="submit" disabled={submitting}>登録</button>
               </div>
            </form>
         </div>
      );
   }
}

// Decorate with redux-form
WatchGroup = reduxForm({
   form: 'WatchGroupForm',
   enableReinitialize: true,
   touchOnChange: true,
})(WatchGroup);

WatchGroup = connect(
   (state) => {

      let initialObj = {};
      state.get('account').get('watchGroup').forEach(id => initialObj[id] = true);

      return {
         initialValues: initialObj
      }
   }
)(WatchGroup);
export default WatchGroup;

const styles = StyleSheet.create({
   accountInfoBox: {
      position: 'absolute',
      width: 400,
      height: '100%',
      display: 'inline-block',
      padding: '30px 0px 0px 30px'
   },
   inputBox: {
      marginBottom: 10
   },
   label:{
      display: 'block',
      marginBottom: 2,
      fontWeight: 550
   },
   inputText:{
      display: 'block',
      fontSize: '1.1rem',
      lineHeight: 'normal',
      padding: '.2rem',
      border: '1px solid #C5C5C5',
      color: '#313131',
      fontFamily: 'Slack-Lato,appleLogo,sans-serif',
      borderRadius: 4,
      width: '70%'
   },
   button: {
      background: '#FFF',
      fontSize: '14px',
      WebkitBorderRadius: '4px',
      lineHeight: '16px',
      textAlign: 'center',
      width: '96px',
      cursor: 'pointer',
   },
   connected:{
      border: 'solid 2px #13678eba',
      color: '#0070a3'
   },
   unConnected:{
      border: 'solid 2px #d80a1f',
      color: '#d80a1f'
   },
   comment: {
      margin: 0,
      fontSize: '80%'
   },
   commentOffice: {
      marginTop: 7,
      fontSize: '80%'
   }
});