import React from 'react';
import './Navigation.css'


const Navigation = (props) => {
    console.log(props.today)
    return (
        <header>
            <div>
                <i  className="fas fa-bars" id='bar-icon'></i>
            </div>
            <div>
                <h1><i  className="fas fa-calendar-alt"></i>Calendar</h1>
            </div>
            <div>
                <button> &larr; </button>
                <button>&rarr;</button>
            </div>
            <h2>{props.today.month}, {props.today.year}</h2>
        </header>
    );
}

export default Navigation;