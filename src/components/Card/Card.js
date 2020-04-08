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

    render() {
        return (
            <div>
                {
                    this.props.card.isFrontDays || this.props.card.isRearDays ?
                        <div style={{ height: '100%' }}>
                            <div className='date-card frontDays' >
                                <p >{this.props.card.day}</p>
                                {this.generateTaskCards(this.props.tasks)}
                                <div onClick={this.props.displayModal} style={{ height: '90%' }}></div>
                            </div>
                        </div>
                        :
                        <div style={{ height: '100%' }}>
                            <div className='date-card' >
                                {
                                    this.props.isToday ?
                                        <p ><span>{this.props.card.day}</span></p>
                                        :
                                        <p >{this.props.card.day}</p>
                                }
                                {this.generateTaskCards(this.props.tasks)}
                                <div onClick={this.props.displayModal} style={{ height: '90%' }}></div>
                            </div>
                        </div>

                }
            </div>
        );
    }
}

export default Card;