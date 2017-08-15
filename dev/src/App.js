import React from 'react';
import './App.css';
import data from './json/data.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {counter: 0, data: data};
    this.changeCounter = this.changeCounter.bind(this);
  }
  
  changeCounter(change) {
    const count = this.state.counter;
    this.setState({counter: count + change});
  }
  
  render() {
    return (
      <div>
        {this.state.counter}
        <Buttons onClick={this.changeCounter} data={this.state.data}/>
      </div>
    );
  }
}

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.handleButton = this.handleButton.bind(this);
    this.buttons = this.props.data.players.map((player, i) =>
      <li key={i}>
        <button id={'player_' + i} onClick={this.handleButton}>
          {player.price}: {player.player}
        </button>
      </li>
    );
    this.pressed = [];
  }
  
  handleButton(e) {
    let button = e.target.id;
    var index = this.pressed.indexOf(button);
    let change;
    if (index !== -1) {
      change = -1;
      this.pressed.splice(index, 1);
    } else {
      change = 1;
      this.pressed.push(button);
    };
    this.props.onClick(change);
  }
  
  render() {
    return (
        <ul>{this.buttons}</ul>
    );
  }
}

export default App;
