import React, { Fragment } from 'react';
import { BoardProps } from '../types/types';

interface BoardState {
  matrix: (string | null)[][];
  currentPlayerColor: string;
  winner: string | false;
  isDraw: boolean;
  gameOver: boolean | string;
}

export default class Board extends React.Component<{}, BoardState> {
  constructor(props: {}) {
    super(props);

    // Initialize state
    this.state = {
      matrix: this.initializeMatrix(),
      currentPlayerColor: 'red',
      winner: false,
      isDraw: false,
      gameOver: false,
    };
  }

  initializeMatrix() {
    return Array(BoardProps.Rows).fill(null).map(() =>
      Array(BoardProps.Cols).fill(null)
    );
  }

  
  makeMove(color: string, rowIndex: number, columnIndex: number) {
    
    const newMatrix = this.state.matrix.map(row => row.slice());

    // Place the move in the matrix
    if (!newMatrix[rowIndex][columnIndex]) {
      newMatrix[rowIndex][columnIndex] = color;

      // Update the matrix in the state
      this.setState({ 
        matrix: newMatrix,
        currentPlayerColor: color === 'red' ? 'yellow' : 'red', 
      });
    }
  }

  render() {
    return (
      <div className="board">
        {this.state.matrix.map((row, rowIndex) => (
          <Fragment key={rowIndex}>
            {row.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className={'column ' + (column || '')}
                onClick={() => this.makeMove(this.state.currentPlayerColor, rowIndex, columnIndex)}
              ></div>
            ))}
          </Fragment>
        ))}
      </div>
    );
  }
}
