import React, { Component } from 'react';
import './Board.css';
// import Card from '../Card/Card';


class Board extends Component {


    render() {
        return (
            <div>
                <main className='board-container'>
                    <div className='grid-board'>
                        {this.props.generateBoard(this.props.today)}
                    </div>
                </main>
            </div>
        );
    }
}

export default Board;