import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

export default class TaskSubBox extends React.Component {

    render(){
        
        const style = {
            taskSubBox: {
            	marginTop: '7px',
            	display: 'none'
            },
            memoIconBox: {
            	display: 'inline-block',
                verticalAlign: 'middle',
                marginLeft: '4px'
            },
            memoIcon: {
                width: '20px'
            },
            memoTextBox: {
                display: 'inline-block',
                verticalAlign: 'middle',
                width: '95%'
            },
            memoText: {
                width: '100%',
            	outline: '0',
            	border: '0px',
            	resize: 'none',
            	backgroundColor: 'transparent'
            }
        }
        
        return(
            <div style={style.taskSubBox}>
                <div style={style.memoIconBox}>
                    <img src="/images/memo-icon.png" style={style.memoIcon}/>
                </div>
                <div style={style.memoTextBox}>
                    <textarea style={style.memoText} rows="5" cols="10" placeholder="Notes"/>
                </div>
            </div>
        );
    }
}