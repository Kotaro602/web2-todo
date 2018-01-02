import React, { Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Map, List, fromJS, toJS } from 'immutable';
import { reduxForm, Field } from 'redux-form/immutable';
import MenuItem from 'material-ui/MenuItem';
import {TextField, SelectField} from 'redux-form-material-ui';

const renderInput = field =>   // Define stateless component to render input and errors
   <div><input {...field.input} type={field.type}/></div>

class TaskLineModal extends Component {

   componentDidMount() {
      this.refs.lineName            // the Field
         .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
         .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
         .focus()                // on TextField
   }

   addNewLine(values){
      console.log(values);
   }

   render() {

      /** prop取得 **/
      const {handleSubmit} = this.props;

      /** レンダリング **/
      return (
         <div className={css(styles.popupBox)}>
            <h2 className={css(styles.title)}>グループ追加/編集</h2>
            <form onSubmit={handleSubmit(::this.addNewLine)}>
               <table className={css(styles.table)}>
                  <tbody>
                     <tr>
                        <td className={css(styles.subTitleTd)}>グループ名</td>
                        <td>
                           <Field name="lineName"
                                   component={TextField}
                                   hintText="Group Name"
                                   ref="lineName" withRef/>
                        </td>
                     </tr>
                     <tr>
                        <td className={css(styles.subTitleTd)}>紐づけるRedMineプロジェクト</td>
                        <td>
                           <Field name="projectId"
                                 component={SelectField}
                                 floatingLabelText="Redmine Project">
                              <MenuItem value={1} primaryText="18本サイト" />
                              <MenuItem value={2} primaryText="19プレサイト" />
                              <MenuItem value={3} primaryText="保守" />
                              <MenuItem value={4} primaryText="DB申請" />
                              <MenuItem value={5} primaryText="なし" />
                           </Field>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <button type="submit">OK</button>
            </form>
         </div>
      );
   }
}

// Decorate with redux-form
TaskLineModal = reduxForm({
   form: 'addLineModal'
})(TaskLineModal)
export default TaskLineModal;

const styles = StyleSheet.create({
   popupBox: {
      padding: 10
   },
   title: {
      margin: 5
   },
   table:{
      marginTop:10,
      marginLeft: 30
   },
   Input:{
      width: 300
   },
   subTitleTd:{
      paddingRight: 20
   }
});