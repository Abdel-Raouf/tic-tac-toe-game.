//import react and react-dom from package.json.
import React from 'react';
import ReactDOM from 'react-dom';
//connect css file with our index.js file.
import './index.css';
//square component that will be reponsible for squares in our game (applyinh: single responsibility principle).
class Square extends React.Component {
  constructor(props){
    super(props);
    //initial state of the square component.
    this.state = {
      value: null
    };
  }

  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()} >
        {this.props.value}
      </button>
    );
  }
}
//Board component that is responsible for the whole board that contain square.
class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    }
  }
  handleClick(i){
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }
  // put the square component in a renderSquare method to loop through squares as if in an array.
  renderSquare(i) {
    return(
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
// parent component (owner component of the state).
class Game extends React.Component {
  // description of what will be rendered on the screen
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
//actuall Dom that will render the output on the screen
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
