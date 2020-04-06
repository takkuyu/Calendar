import React, { Component } from 'react';
import './Card.css';
import Task from '../Task/Task';


class Card extends Component {

    generateTaskCards() {
        if (this.props.tasks.length > 0) {
            // console.log('generateTask')
            let i = 1;
            return this.props.tasks.map(task => {
                return (
                    <Task
                        task={task}
                        key={i++ + ':' + task.key}
                    />
                );
            })
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.card.isFrontDays || this.props.card.isRearDays ?
                        <div className='date-card frontDays' onClick={this.props.assignTaskToCard}>
                            <p>{this.props.card.day}</p>
                            <div>
                                {this.generateTaskCards()}
                            </div>
                        </div>
                        :
                        <div className='date-card' onClick={this.props.assignTaskToCard}>
                            <p>{this.props.card.day}</p>
                            <div>
                                {this.generateTaskCards()}
                            </div>
                        </div>

                }
            </div>
        );
    }
}

export default Card;