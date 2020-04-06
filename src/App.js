import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Board from './components/Board/Board';
import Card from './components/Card/Card';


class App extends Component {

  constructor() {
    super()
    this.state = {
      today: {},
      tasks: []
    }
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.generateBoard = this.generateBoard.bind(this);
    this.generateLastMonthBoard = this.generateLastMonthBoard.bind(this);
    this.generateNextMonthBoard = this.generateNextMonthBoard.bind(this);
    this.assignTaskToCard = this.assignTaskToCard.bind(this);
    // this.displayBoard = this.displayBoard.bind(this);
  }

  componentDidMount() {
    this.getCurrentDate()
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

  generateLastMonthBoard() {
    if (this.state.today.month === 1) {
      this.setState({
        today: {
          year: this.state.today.year - 1,
          month: 12,
        }
      })
      return
    }
    this.setState({
      today: {
        year: this.state.today.year,
        month: this.state.today.month - 1,
      }
    })
  }

  generateNextMonthBoard() {
    if (this.state.today.month === 12) {
      this.setState({
        today: {
          year: this.state.today.year + 1,
          month: 1,
        }
      })
      return
    }
    this.setState({
      today: {
        year: this.state.today.year,
        month: this.state.today.month + 1,
      }
    })
  }

  assignTaskToCard(key) {
    // console.log(key)
    const tasksArray = this.state.tasks;
    tasksArray.push({
      key: key,
      task: 'do homework',
      location: 'Kamloops',
      description: 'comp3540',
    })

    this.setState({
      tasks: tasksArray
    })
  }


  generateBoard(today) {
    const thisMonthDays = new Date(today.year, today.month, 0).getDate(); // get number of days of the month
    const lastMonthDays = new Date(today.year, today.month - 1, 0).getDate();
    const board = [];
    const firstDayOfMonth = new Date(today.year, today.month - 1, 1).getDay();       // Sunday - Saturday : 0 - 6

    let isFrontDays = false;
    let isRearDays = false;
    let gapCounter = lastMonthDays - firstDayOfMonth + 1;
    let dayCounter = 1;
    let month = today.month;

    for (let i = 1; i <= 35; i++) {
      if (i <= firstDayOfMonth) {
        isFrontDays = true;
        month = today.month - 1;
        board.push({
          day: gapCounter,
          month: month,
          isFrontDays: isFrontDays,
          isRearDays: isRearDays,
        })
        gapCounter++
        isFrontDays = false;
        month = today.month
        continue
      }

      if (dayCounter >= thisMonthDays + 1) {
        dayCounter = 1;
        isRearDays = true;
        month = today.month + 1;
      }

      board.push({
        day: dayCounter,
        month: month,
        isFrontDays: isFrontDays,
        isRearDays: isRearDays,
      })
      dayCounter++;
    }

    return this.displayBoard(board, today.year)
  }

  displayBoard(board, year) {
    return board.map(card => {

      const tasks = [];

      this.state.tasks.forEach(task => {
        const thisCardKey = card.day + '/' + card.month + '/' + year;
        if (task.key === thisCardKey) {
          console.log('same: ' + thisCardKey)
          tasks.push(task)
        }
      })

      return (
        <Card
          card={card}
          tasks={tasks}
          key={card.day + '/' + card.month + '/' + year}
          assignTaskToCard={() => this.assignTaskToCard(card.day + '/' + card.month + '/' + year)}
        />
      )
    })
  }

  render() {
    // console.log('render in App.js')
    return (
      <div className="App" >
        <Navigation
          today={this.state.today}
          generateLastMonthBoard={this.generateLastMonthBoard}
          generateNextMonthBoard={this.generateNextMonthBoard}
        />
        <Board
          today={this.state.today}
          generateBoard={this.generateBoard}
        />
      </div>
    );
  }
}

export default App;
