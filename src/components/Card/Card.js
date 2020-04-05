import React, { Component } from 'react';
import './Card.css'


class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            card: this.props.card
        }

    }

    render() {

        return (
            <div>
                {
                    this.props.card.isFrontDays || this.props.card.isRearDays?
                        <div className='date-card frontDays'>
                            <p>{this.props.card.day}</p>
                        </div>
                        :
                        <div className='date-card'>
                            <p>{this.props.card.day}</p>
                        </div>

                }
            </div>
        );
    }
}

export default Card;