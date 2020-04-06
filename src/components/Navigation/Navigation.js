import React from 'react';
import './Navigation.css'


const Navigation = (props) => {
    // let adjestment = 0;
    // console.log(props.today)
    // if(props.today.month <=0){
    //     adjestment = props.today.month + 12;
    // }
    return (
        <header>
            <div>
                <i className="fas fa-bars" id='bar-icon'></i>
            </div>
            <div>
                <h1><i className="fas fa-calendar-alt"></i>Calendar</h1>
            </div>
            <div>
                <button onClick={props.generateLastMonthBoard}> &larr; </button>
                <button onClick={props.generateNextMonthBoard}>&rarr;</button>
            </div>
            <h2>{props.today.month}, {props.today.year}</h2>
        </header>
    );
}

export default Navigation;