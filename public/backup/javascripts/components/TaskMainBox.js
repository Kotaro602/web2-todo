import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

export default class TaskMainBox extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            taskCompFlg: false
        }
    }
 
    openTask(e) {
        if(this.state.taskCompFlg){
            this.setState({taskCompFlg: false});
        }else{
            this.setState({taskCompFlg: true});
        }
    }
    
    render(){
        const style = {
            taskNameBox: {
                display: 'inline-block',
                width: '74%'
            },
            taskRedmineIcon: {
                width: '16px',
                height: '16px',
                marginLeft: '4px',
                marginRight: '2px',
                display: 'inline-block',
                backgroundColor: '#d80a1f',
                borderRadius: '3px',
                cursor: 'pointer',
                verticalAlign: 'middle',
                textAlign: 'center',
                color: '#fafafa',
                fontSize: '14px'
            },
            taskCompCheckBox: {
                display: 'none'
            },            
            taskCompBox: {
                width: '12px',
                height: '12px',
                marginLeft: '4px',
                marginRight: '4px',
                display: 'inline-block',
                backgroundColor: '#fff',
                borderRadius: '3px',
                border: 'solid 2px #3baae3',
                cursor: 'pointer',
                verticalAlign: 'middle'
            },
            taskCompBoxChecked: {
                width: '12px',
                height: '12px',
                marginLeft: '4px',
                marginRight: '4px',
                display: 'inline-block',
                backgroundColor: '#fff',
                borderRadius: '3px',
                border: 'solid 2px #3baae3',
                cursor: 'pointer',
                verticalAlign: 'middle',
            	fontSize: '12px',
            	fontWeight: 'bold',
            	color: '#3baae3',
            	opacity: '0.5'
            },
            taskName:{
                marginLeft: '6px'
            },
            dueDateBox:{
            	display: 'inline-block',
            	width: '9%'
            },
            dueDateInput:{
                outline: '0',
                border: '0px',
                width: '100%',
                cursor: 'pointer'
            },
            estimateBox:{
            	display: 'inline-block',
            	width: '9%'
            },
            estimateInput:{
                outline: '0',
                border: '0px',
                cursor: 'pointer'
            },
            markBox:{
            	display: 'inline-block',
            	width: '5%',
            	textAlign: 'center'
            },
            markInput:{
                fontSize: '16px'
            }
        }
        
        const likeStyle = this.state.taskCompFlg ? style.taskRedmineIcon : style.taskCompBox;
        
        const checkBoxDOM = this.props.task.redmineFlg ? 
                            <span style={style.taskRedmineIcon}>R</span>:
                            <span style={likeStyle} onClick={this.openTask.bind(this)}></span>;
        //content: '\2713';
        return(
            <div>
                <div style={style.taskNameBox}>
                    <input type="checkbox" style={style.taskCompCheckBox}/>
                    {checkBoxDOM}
                    <span style={style.taskName}>{this.props.task.taskName}</span>
                </div>
                <div style={style.dueDateBox}>
                    <input type="text" style={style.dueDateInput} placeholder="3/1" value={this.props.task.dueDate}/>
                </div>
                <div style={style.estimateBox}>
                    <input type="text" style={style.estimateInput} placeholder="2.5"/>
                </div>
                <div style={style.markBox}>
                    <span style={style.markInput}>☆</span>
                </div>
            </div>
        );
    }
}