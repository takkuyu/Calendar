import React from 'react';
import './Task.css'


const Task = (props) => {
    return (
        <div className='task-container' onClick={()=>{props.displayTask(props.task)}}>
            <p>{props.task.task}</p>
        </div>
    );
}

export default Task;