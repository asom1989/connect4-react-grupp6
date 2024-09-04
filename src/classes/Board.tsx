import React, { Fragment } from 'react';
import { BoardProps } from '../staffana-code/types/types'

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

    // initialize state
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

  
   makeMove(color: string, columnIndex: number ) {
    const newMatrix = this.state.matrix.map(row => row.slice());

    for (let rowIndex = BoardProps.Rows - 1; rowIndex >= 0; rowIndex--) {
      if (!newMatrix[rowIndex][columnIndex]) {
        newMatrix[rowIndex][columnIndex] = color;
        this.setState({ 
          matrix: newMatrix,
          currentPlayerColor: color === 'red' ? 'yellow' : 'red',
        });
        return;
      }
    }
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
                  onClick={() => this.makeMove(this.state.currentPlayerColor, columnIndex)}
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
