//import react and react-dom from package.json.
import React from 'react';
import ReactDOM from 'react-dom';
//connect css file with our index.js file.
import './index.css';

//square component that will be reponsible for squares in our game (applying: single responsibility principle).
//React supports a simpler syntax called functional components for component types like Square that only consist of a render method.
//functional  components tend to be easier to write and React will optimize them more in the future.
function Square(props){
  return (
    //passing down the onClick event when clicked, to the parent Compoent 'Board component'
    //then assigning the new value (chaning in the state in the parent component to the button).
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}
//Board component that is responsible for the whole board that contain square.
class Board extends React.Component {
  constructor(props){
    super(props);
    //setting the intial state in our component.
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }
  handleClick(i){
    // using the .slice() operator to copy the squares array prior to making changes and to prevent mutating the existing array.
    //help in building pure component in react as if it compare the copy and the original if they are equal it won't re-render as there isn't any change which will help in performance as we don't re-render the same view many times without any change happens.
    const squares = this.state.squares.slice();
    //making react return nothing when clicked whenever a player win or the sqauers are filled without any winner.
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    //take turn between 'X' and 'O'
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    //setState() to handle change in the state and propagate it through the component only.
    //as state is avaliable to it's own component but can be passed to child components using props (used to pass data between components).
    this.setState({
      squares: squares,
      //chnaging the value to take turns between 'X' and 'O'.
      xIsNext: !this.state.xIsNext,
    });
  }
  // put the square component in a renderSquare method to loop through squares as if in an array.
  renderSquare(i) {
    return(
      //passing the new state to the
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    //passing state to the helper function to make it decide which is the winner.
    const winner = calculateWinner(this.state.squares);
    let status;
    if(winner){
      status = 'Winner ' + winner;
    }else {
      //if there isn't a winner make the next player continue the game.
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      // after evluating status above, then we will display it's value above the Board rows.
      // we put anything that have value in curly braces in JSX.
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
      </div>
    );
  }
}
//helper function to determine which player win the game.
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================
//actuall Dom that will render the output on the screen
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
