import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

import TaskMainBox from './TaskMainBox'
import TaskSubBox from './TaskSubBox'

export default class TaskMemberList extends React.Component {

    render(){
        
        const style = {
            taskListUl: {
                listStyle:'none',
                marginTop:'5px',
                padding:'0px'
            },
            taskListBox:{
                padding: '2px',
                borderRadius: '5px',
                width: '100%',
                tableLayout: 'fixed'
            },
            taskListBoxActive:{
                padding: '1px',
                borderRadius: '5px',
                width: '100%',
                tableLayout: 'fixed',
                backgroundColor: '#f2f5f7',
                border: 'solid 1px #aaa'
            }
        }
        
        const taskDOM = this.props.member.task.map((task)=> {
            return (
                <li>
                    <div style={style.taskListBox}>
                        <TaskMainBox task={task}/>
                        <TaskSubBox task={task}/>
                    </div>
                </li>
            );
        });
        
        return(
            <ul style={style.taskListUl}>
                {taskDOM}
            </ul>
        );
    }
}