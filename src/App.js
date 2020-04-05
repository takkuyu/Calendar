import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Board from './components/Board/Board';

class App extends Component {

  constructor() {
    super()
    this.state = {
      today: {},
    }
    this.getCurrentDate = this.getCurrentDate.bind(this);
  }

  componentDidMount() {
    this.getCurrentDate()
  }

  getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  getCurrentDate() {
    const currentDate = new Date();
    this.setState({
      today: {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        date: currentDate.getDate(),
      }
    })
  }

  render() {
    console.log('render in App.js')
    return (
      <div className="App" >
        <Navigation 
          today={this.state.today}
        />
        <Board
          today={this.state.today}
          getDaysInMonth={this.getDaysInMonth}
        />
      </div>
    );
  }
}

export default App;
