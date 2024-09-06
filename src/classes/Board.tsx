import React, { Fragment } from 'react';
import { BoardProps, BoardState } from '../types/types';
import Moves from './Moves';

interface BoardPropsQuit {
  onQuit: () => void;
}

export default class Board extends React.Component<BoardPropsQuit, BoardState> {
  moves: Moves;

  constructor(props: BoardPropsQuit) {
    super(props);

    this.moves = new Moves();

    // initialize state
    this.state = {
      matrix: this.initializeMatrix(),
      currentPlayerColor: 'red'
    };

    this.resetGame = this.resetGame.bind(this);
  }

  resetGame = () => {
    this.setState({
      matrix: this.initializeMatrix(),
      currentPlayerColor: 'red',
    });
  };

  initializeMatrix() {
    return Array(BoardProps.Rows).fill(null).map(() =>
      Array(BoardProps.Cols).fill(null)
    );
  }

  handlePlayerMove(columnIndex: number) {
    if (this.moves.columnStatus[columnIndex] <= 0) return;

    const currentPlayer = this.state.currentPlayerColor === 'red' ? 1 : 0;

    this.moves.makeMove(this.state.matrix, 1, currentPlayer, columnIndex);
    const newMatrix = this.state.matrix.map(row => row.slice());

    this.setState({
      matrix: newMatrix,
      currentPlayerColor: this.state.currentPlayerColor === 'red' ? 'yellow' : 'red',
    });
  }

  render() {
    return (
      <div className="game-container">
        <h1 className='game-title-board'>Connect Four</h1>
        <div className="status">{`Current Player: ${this.state.currentPlayerColor}`}</div>
        <div className="board">
          {this.state.matrix.map((row, rowIndex) => (
            <Fragment key={rowIndex}>
              {row.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className={`column ${column || ''}`}
                  onClick={() => this.handlePlayerMove(columnIndex)}
                  style={{
                    backgroundColor: column || '#D9D9D9', // set column background color
                  }}
                ></div>
              ))}
            </Fragment>
          ))}
        </div>
        <div className='board-buttons'>
          <button onClick={this.resetGame}>Reset Game</button>
          <button onClick={this.props.onQuit}>Quit</button>
        </div>
      </div>
    );
  }
}
