import React, { Component } from 'react';
import './Card.css';
import Task from '../Task/Task';



class Card extends Component {

    generateTaskCards(tasks) {
        // console.log(tasks)
        if (tasks.length > 0) {
            let i = 1;
            return tasks.map(task => {
                return (
                    <Task
                        displayTask={this.props.displayTask}
                        task={task}
                        key={i++ + ':' + task.key}
                    />
                );
            })
        }
    }

    getMonthName(card) {
        if (card.day === 1) {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return months[card.month - 1] + ' ';
        }
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <div className='date-card' >
                    {
                        this.props.isToday ?
                            <p className='day-container'>
                                <span>{this.getMonthName(this.props.card)}</span>
                                <span className='today'>{this.props.card.day}</span>
                            </p>
                            :
                            <div>
                                {
                                    this.props.card.isFrontDays || this.props.card.isRearDays ?
                                        <p className='day-container'>
                                            <span style={{ color: 'rgba(0, 0, 0, 0.54)' }}>{this.getMonthName(this.props.card)}</span>
                                            <span style={{ color: 'rgba(0, 0, 0, 0.54)' }}>{this.props.card.day}</span>
                                        </p>
                                        :
                                        <p className='day-container'>
                                            <span>{this.getMonthName(this.props.card)}</span>
                                            <span>{this.props.card.day}</span>
                                        </p>
                                }
                            </div>
                    }
                    {this.generateTaskCards(this.props.tasks)}
                    <div onClick={this.props.displayModal} style={{ height: '90%' }}></div>
                </div>
            </div>
        );
    }
}

export default Card;