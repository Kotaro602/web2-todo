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

const renderField = props =>(
    <div className={css(styles.inputBox)}>
        <label className={css(styles.label)}>{props.title}</label>
        <input {...props.input} type={props.type}
               className={css(styles.inputText)}/>
    </div>
);

class AccountInfo extends Component {

   render() {

      /** prop取得 **/
      const {state, handleSubmit, pristine, submitting, reset} = this.props;
      const account = state.get('account');

      const linkComment = state.getIn(['conf', 'officeConnecedFlg']) ? '連携済み' : '未連携';
      const buttonColorStyle = state.getIn(['conf', 'officeConnecedFlg']) ?  styles.connected: styles.unConnected;

      /** レンダリング **/
      return (
         <div className={css(styles.accountInfoBox)}>
            <form onSubmit={handleSubmit}>
                <Field name="userName" type="text" component={renderField} title="名前"/>
                <div className={css(styles.inputBox)}>
                   <label className={css(styles.label)}>Office365 OAuth連携</label>
                   <button type="button" className={css(styles.button, buttonColorStyle)}
                           onClick={callGraphApi}>{linkComment}</button>
                   <p className={css(styles.commentOffice)}>※現在はブラウザ落とすと連携が切れます。再接続してください。</p>
                </div>
                <Field name="redmineLoginId" type="text" component={renderField} title="RedmineログインID"/>
                <Field name="redmineKey" type="text" component={renderField} title="RedmineKey"/>
                <Field name="slackToken" type="text" component={renderField} title="SlackToken"/>

                <button type="submit" disabled={submitting}>登録/編集（押したらちょっと待ってね）</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>キャンセル</button>
            </form>
            <p className={css(styles.comment)}>※基本全ての情報を登録してください。</p>
            <p className={css(styles.comment)}>※登録情報はローカルストレージに保存され、DBには登録されません。</p>
            <p className={css(styles.comment)}>※複数ブラウザを使う場合は、同じ情報で登録してください。</p>
         </div>
      );
   }
}


// Decorate with redux-form
AccountInfo = reduxForm({
   form: 'AccountInfoForm',
   enableReinitialize: true,
   touchOnChange: true,
})(AccountInfo);

AccountInfo = connect(
   (state) => {
      return {
         initialValues: fromJS(state.get('account'))
      }
   }
)(AccountInfo)

export default AccountInfo;

const styles = StyleSheet.create({
   accountInfoBox: {
      position: 'absolute',
      width: 400,
      height: '100%',
      display: 'inline-block',
      padding: '30px 0px 0px 30px'
   },
   inputBox: {
      marginBottom: 25
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
      width: '90%'
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