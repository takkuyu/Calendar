import React from 'react';
// import './Task.css'


const Task = (props) => {
    return (
        <div>
            <p>{props.task.task}</p>
        </div>
    );
}

export default Task;