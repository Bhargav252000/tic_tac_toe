import React, { Component } from "react";
import Board from "./board";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      stepNumber: 0,
      history: [{ squares: Array(9).fill(null) }],
    };
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);
    if (winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat({
        squares: squares,
      }),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const draw = checkDraw(current.squares);
    

    let status;
    let PlayAgain;
    
    if (winner) {
      status = "Winner is " + winner;
      PlayAgain = (
        <button
          className="play-again-btn"
          onClick={() => history.map(() => this.jumpTo(0))}
        >
          Wanna Play Again?
        </button>
      );
    }
    else if(draw){
      status = "Oops, It's a draw !";
      PlayAgain = (
        <button
          className="play-again-btn"
          onClick={() => history.map(() => this.jumpTo(0))}
        >
          Wanna Play Again?
        </button>
      );
    }
    else {
      status = (this.state.xIsNext ? "X" : "O") + "'s Turn";
    }

    return (
      <div className="game">
        <div className="game-info">
          <div>{status}</div>
        </div>
        <div className="game-board">
          <Board
            onClick={(i) => this.handleClick(i)}
            squares={current.squares}
          />
        </div>
        {PlayAgain}
      </div>
    );
  }
}

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
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function checkDraw(squares){
  let draw=true;
  squares.forEach(square=>{
    if(square==null){
      draw=false;
    }
  });

  return draw;

}