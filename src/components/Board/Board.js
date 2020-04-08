import React from 'react';
import './Board.css';


const Board = (props) => {
    return (
        <div>
            <main className='board-container'>
                <div className='grid-board'>
                    {props.generateBoard(props.today)}
                </div>
            </main>
        </div>
    );
}

export default Board;