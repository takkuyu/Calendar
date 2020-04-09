import React from 'react';
import './Board.css';


const Board = (props) => {
    return (
        <div>
            <main className='board-container' style={{height: '90vh'}}>
                <div className='dayNames'>
                    <ul>
                        <li>SUN</li>
                        <li>MON</li>
                        <li>TUE</li>
                        <li>WED</li>
                        <li>THU</li>
                        <li>FRI</li>
                        <li>SAT</li>
                    </ul>
                </div>
                <div className='grid-board'>
                    {props.generateBoard(props.today)}
                </div>
            </main>
        </div>
    );
}

export default Board;