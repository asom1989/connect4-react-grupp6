import React, { Fragment } from 'react';
import { BoardProps, BoardState } from '../types/types'
import Moves from './Moves';

export default class Board extends React.Component<{}, BoardState> {
  moves: Moves;
  constructor(props: {}) {
    super(props);

    this.moves = new Moves();

    // initialize state
    this.state = {
      matrix: this.initializeMatrix(),
      currentPlayerColor: 'red'
      
    };
  }

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
      
      
    })
  }

  render() {
    return (
      <div className="game-container">
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
                    backgroundColor: column || '#2d84c2', // set column background color
                  }}
                ></div>
            ))}
          </Fragment>
        ))}
        </div>
      </div>
    );
  }
}