/**
 * Created by kotaro on 2017/02/05.
 */
import React, { Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Map, List, fromJS, toJS } from 'immutable';
import { reduxForm, Field } from 'redux-form/immutable';

const renderField = props =>(
    <div className={css(styles.inputBox)}>
        <label className={css(styles.label)}>{props.title}</label>
        <input {...props.input} type={props.type} className={css(styles.inputText)}/>
    </div>
);

class AccountInfo extends Component {

   render() {

      /** prop取得 **/
      const {handleSubmit, pristine, submitting, reset} = this.props;

      /** レンダリング **/
      return (
         <div className={css(styles.accountInfoBox)}>
            <form onSubmit={handleSubmit}>
                <Field name="userName" type="text" component={renderField} title="名前"/>
                <Field name="redmineLoginId" type="text" component={renderField} title="RedmineログインID"/>
                <Field name="redmineKey" type="text" component={renderField} title="RedmineKey"/>
                <Field name="slackToken" type="text" component={renderField} title="SlackToken"/>
                <button type='submit'>登録</button>
                <button type="button" onClick={reset}>キャンセル</button>
            </form>
         </div>
      );
   }
}


// Decorate with redux-form
AccountInfo = reduxForm({
   form: 'ImmutableForm'
})(AccountInfo);
export default AccountInfo;

const styles = StyleSheet.create({
   accountInfoBox: {
      position: 'absolute',
      width: 450,
      height: '100%',
      display: 'inline-block',
      padding: '30px 30px'
   },
   inputBox: {
      marginBottom: 20
   },
   label:{
      display: 'block',
      marginBottom: 8
   },
   inputText:{
      display: 'block',
      fontSize: '1.1rem',
      lineHeight: 'normal',
      padding: '.2rem',
      border: '1px solid #C5C5C5',
      color: '#555459',
      fontFamily: 'Slack-Lato,appleLogo,sans-serif',
      borderRadius: 4,
      width: '70%'
   }
});

{/*<table className={css(styles.table)}>*/}
{/*<tbody>*/}
{/*<tr>*/}
{/*<td className={css(styles.subTitleTd)}>グループ名</td>*/}
{/*<td>*/}
{/*<Field name="lineName"*/}
{/*component={TextField}*/}
{/*hintText="Group Name"*/}
{/*ref="lineName" withRef/>*/}
{/*</td>*/}
{/*</tr>*/}
{/*<tr>*/}
{/*<td className={css(styles.subTitleTd)}>紐づけるRedMineプロジェクト</td>*/}
{/*<td>*/}
{/*<Field name="projectId"*/}
{/*component={SelectField}*/}
{/*floatingLabelText="Redmine Project">*/}
{/*<MenuItem value={1} primaryText="18本サイト" />*/}
{/*<MenuItem value={2} primaryText="19プレサイト" />*/}
{/*<MenuItem value={3} primaryText="保守" />*/}
{/*<MenuItem value={4} primaryText="DB申請" />*/}
{/*<MenuItem value={5} primaryText="なし" />*/}
{/*</Field>*/}
{/*</td>*/}
{/*</tr>*/}
{/*</tbody>*/}
{/*</table>*/}