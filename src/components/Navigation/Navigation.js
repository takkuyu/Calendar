import React from 'react';
import './Navigation.css'


const Navigation = (props) => {

    return (
        <header>
            <div>
                <i className="fas fa-bars" id='bar-icon'></i>
            </div>
            <div>
                <h1><i className="fas fa-calendar-alt" style={{ paddingRight: '.5em', fontWeight: '100', color:'rgb(26, 115, 232)' }}></i><span style={{ color: 'rgb(26, 115, 232)', fontWeight: '700' }}>React</span> Calendar</h1>
            </div>
            <div>
                <i onClick={props.generateLastMonthBoard} className="fas fa-angle-left angle" style={{ marginRight: '.5em' }}></i>
                <i onClick={props.generateNextMonthBoard} className="fas fa-angle-right angle"></i>
            </div>
            <h2>{props.today.month} / {props.today.year}</h2>
        </header>
    );
}

export default Navigation;