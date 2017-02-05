/**
 * Created by kotaro on 2017/02/05.
 */
import React, { Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Map, List, fromJS, toJS } from 'immutable';
import { reduxForm, Field } from 'redux-form/immutable';


const renderInput = field =>   // Define stateless component to render input and errors
   <div><input {...field.input} type={field.type}/></div>

class AccountInfo extends Component {

   componentDidMount() {
      // this.refs.lineName            // the Field
      //    .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      //    .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      //    .focus()                // on TextField
   }

   addNewLine(values){
      console.log(values);
   }

   render() {

      /** prop取得 **/
      const {handleSubmit} = this.props;

      /** レンダリング **/
      return (
         <div className={css(styles.accountInfoBox)}>
            <form onSubmit={handleSubmit(::this.addNewLine)}>
               <div className={css(styles.inputBox)}>
                  <label className={css(styles.label)}>First name</label>
                  <input type="text" className={css(styles.inputText)}/>
               </div>
               <div className={css(styles.inputBox)}>
                  <label className={css(styles.label)}>Last name</label>
                  <input type="text" className={css(styles.inputText)}/>
               </div>
               <div className={css(styles.inputBox)}>
                  <label className={css(styles.label)}>RedmineKey</label>
                  <input type="text" className={css(styles.inputText)}/>
               </div>
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
            </form>
         </div>
      );
   }
}

// Decorate with redux-form
AccountInfo = reduxForm({
   form: 'accountInfo'
})(AccountInfo)
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