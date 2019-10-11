import React from "react";
import Board from "./Board";


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i=0; i< lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}


export default class Game extends React.Component {

    state = {
        history: [
          {
            squares: Array(9).fill(null), //[null, null, null, null, null, null, null, null, null]
          },
        ],
        stepNumber: 0,
        xIsNext: true,
      };
    
    jumpTo(step) { // 이전 단계를 갈수 있는 함수 
        this.setState({
            stepNumber : step,
            xlsNext : step % 2 === 0,
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        console.log("history : ");
        console.log(history);
        const current = history[history.length - 1];
        console.log("current : ");
        console.log(current);
        const squares = current.squares.slice();
        console.log("squares : "+ squares);
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{squares: squares}]),
            stepNumber : history.length,
            xlsNext : !this.state.xIsNext
        })
    }
    

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            console.log("map start : move "+move);
            console.log(step);
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
              <div className="game-board">
                <Board squares={current.squares} onClick={i => this.handleClick(i)} />
              </div>
              <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
              </div>
            </div>
          );
    }
}