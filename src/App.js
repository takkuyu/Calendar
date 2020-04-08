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
      tasks: [],
      modal: false,
      taskModal: false,
      date: '',
      task: '',
      location: '',
      description: '',
      id: ''
    }
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.generateBoard = this.generateBoard.bind(this);
    this.generateLastMonthBoard = this.generateLastMonthBoard.bind(this);
    this.generateNextMonthBoard = this.generateNextMonthBoard.bind(this);
    this.assignTaskToCard = this.assignTaskToCard.bind(this);
    this.onSetTask = this.onSetTask.bind(this);
    this.onSetLocation = this.onSetLocation.bind(this);
    this.onSetDescription = this.onSetDescription.bind(this);
    this.displayTask = this.displayTask.bind(this);
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

  displayModal(date) {
    this.setState({
      modal: true,
      date: date,
      task: '', //reset state not to duplicate the same values
      location: '',
      description: '',
      id: ''
    })
  }

  displayTask(task) {
    console.log(task)
    this.setState({
      taskModal: true,
      date: task.key,
      task: task.task,
      location: task.location,
      description: task.description,
      id: task.id
    })
  }

  getUniqueStr(myStrong) {
    let strong = 1000;
    if (myStrong) strong = myStrong;
    return new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16)
  }

  assignTaskToCard(e) {
    e.preventDefault();

    const tasksArray = this.state.tasks;
    if (this.state.task === '') {
      console.log('empty')
      return
    }
    tasksArray.push({
      key: this.state.date,
      id: this.getUniqueStr(),
      task: this.state.task,
      location: this.state.location,
      description: this.state.description,
    })

    this.setState({
      tasks: tasksArray,
      modal: false
    })
  }

  onSetTask(e) {
    this.setState({
      task: e.target.value
    })
  }
  onSetLocation(e) {
    this.setState({
      location: e.target.value
    })
  }
  onSetDescription(e) {
    this.setState({
      description: e.target.value
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



  displayBoard(board, year) { //@TODO ; Replace year with card.year
    const today = String(new Date()).substring(0, 10);
    // const thisyear = year;

    return board.map(card => {
      const tasks = [];
      // year = thisyear
      let isToday = false;

      if(card.month === 0){
        card.month = 12;
        console.log(card)
        year = year -1;
      }else if(card.month === 13){
        card.month = 1;
      }

      this.state.tasks.forEach(task => {
        const thisCardKey = card.day + '/' + card.month + '/' + year;
        if (task.key === thisCardKey) {
          tasks.push(task)
        }
      })

      const thisday = String(new Date(year, card.month - 1, card.day)).substring(0, 10);

      if (today === thisday) {
        isToday = !isToday;
      }


      return (
        <Card
          card={card}
          isToday={isToday}
          tasks={tasks}
          key={card.day + '/' + card.month + '/' + year} //@TODO: Fix Jan and April number problem, 0 and 13.
          displayModal={() => { this.displayModal(card.day + '/' + card.month + '/' + year) }}
          displayTask={this.displayTask}
        // assignTaskToCard={() => this.assignTaskToCard(card.day + '/' + card.month + '/' + year)}
        />
      )
    })
  }

  deleteTask(id) {
    const tasks = this.state.tasks;
    const filteredTasks = tasks.filter(task => task.id !== id)

    this.setState({
      tasks: filteredTasks,
      taskModal: false
    })
  }


  render() {
    // console.log('render in App.js')
    return (
      <div className="App" >
        {
          this.state.modal || this.state.taskModal ?
            <div className='modal-window'>
              <div className='modal-content'>
                {this.state.modal ?
                  <i onClick={() => this.setState({ modal: false, taskModal: false })} className="fas fa-times close-btn"></i>
                  :
                  <div>
                    <i onClick={() => this.setState({ modal: false, taskModal: false })} className="fas fa-times close-btn"></i>
                    <i onClick={() => this.deleteTask(this.state.id)} className="fas fa-trash" style={{ float: 'right', fontSize: '1.8rem', marginRight: '1.5rem', cursor: 'pointer' }}></i>
                  </div>
                }
                {this.state.modal ?
                  <form onSubmit={this.assignTaskToCard}>
                    <input onChange={this.onSetTask} className='task-field' type="text" placeholder='Add title and date' />
                    <div className='inner-fields'>
                      <div className='icon-field'>
                        <i className="far fa-clock"></i>
                        <i className="fas fa-map-marker-alt"></i>
                        <i className="far fa-sticky-note"></i>
                      </div>
                      <div className='inputs-field'>
                        <input readOnly type="text" style={{ letterSpacing: '4px' }} value={this.state.date} />
                        <input onChange={this.onSetLocation} type="text" placeholder='Add location' />
                        <input onChange={this.onSetDescription} type="text" placeholder='Add description' />
                      </div>
                    </div>
                    <button>Save</button>
                  </form>
                  :
                  <div className='task-modal'>
                    <div className='task-modal-left'>
                      <i className="fas fa-square" style={{ color: '#039BE5', paddingBottom: '2.7em' }}></i>
                      <i className="fas fa-map-marker-alt"></i>
                      <i className="far fa-sticky-note"></i>
                    </div>
                    <div className='task-modal-right'>
                      <h1>{this.state.task}</h1>
                      <h2>{this.state.date}</h2>
                      <p>{this.state.location}</p>
                      <p>{this.state.description}</p>
                    </div>
                  </div>
                }
              </div>
            </div>
            :
            <div></div>
        }
        <Navigation
          today={this.state.today}
          generateLastMonthBoard={this.generateLastMonthBoard}
          generateNextMonthBoard={this.generateNextMonthBoard}
          getCurrentDate={this.getCurrentDate}
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
