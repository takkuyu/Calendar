import React, { Component } from 'react';
import './Board.css';
import Card from '../Card/Card';



class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            board: []
        }
    }

    generateBoard(today) {

        const thisMonthDays = this.props.getDaysInMonth(today.month, today.year);
        let lastMonthDays = this.props.getDaysInMonth(today.month - 1, today.year);
        const board = [];
        const firstDayOfMonth = new Date(today.year, today.month - 1, 1).getDay();       // Sunday - Saturday : 0 - 6

        // console.log(firstDayOfMonth)
        // console.log(thisMonthDays)
        // console.log(lastMonthDays)

        let isFrontDays = false;
        let isRearDays = false;
        let gapCounter = lastMonthDays - firstDayOfMonth + 1;
        let dayCounter = 1;

        for (let i = 1; i <= 35; i++) {

            if (i <= firstDayOfMonth) {

                isFrontDays = true;
                board.push({
                    day: gapCounter,
                    task: '',
                    location: '',
                    description: '',
                    isFrontDays: isFrontDays,
                    isRearDays: isRearDays,
                })

                gapCounter++
                isFrontDays = false;
                continue
            }

            if (dayCounter === thisMonthDays + 1) {
                dayCounter = 1;
                isRearDays = true;
            }

            board.push({
                day: dayCounter,
                // task: '',
                // location: '',
                // description: '',
                isFrontDays: isFrontDays,
                isRearDays: isRearDays,
            })
            dayCounter++;
        }

        return board.map(card => {
            return (
                <Card
                    card={card}
                    key={card.day + Math.random()} //@TODO: fix key values 
                />
            )
        })
    }

    render() {
        return (
            <main className='board-container'>
                <div className='grid-board'>
                    {this.generateBoard(this.props.today)}
                    {/* {this.generateBoard(this.props.today)} */}
                </div>
            </main>
        );
    }
}

export default Board;