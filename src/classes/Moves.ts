import { Move, Matrix, BoardProps, PlayerType, Color, ColumnStatus } from "../types/types";
export default class Moves {
  movesMade: number;
  columnStatus: ColumnStatus;
  lastMove: Move;

  constructor() {
    this.movesMade = 0;
    this.columnStatus = new Array(BoardProps.Cols).fill(6);
    this.lastMove = undefined!;
  }

  get validColumns() {
    const cols = [];
    for (let col = 0; col < BoardProps.Cols; col++) {
      if (this.columnStatus[col] > 0) {
        cols.push(col);
      }
    }
    return cols;
  }

  computerEasyMove(): number {
    return this.validColumns[
      Math.floor(Math.random() * (this.validColumns.length - 0)) + 0
    ];
  }

  makeMove(
    board: Matrix,
    playerType: PlayerType,
    currentPlayer: number,
    _col: number
  ) {
    if (this.movesMade >= 42) {
      return;
    }

    const validColumn = playerType === 1 ? _col : this.computerEasyMove();
    const validMove = this.getMovePosition(board, validColumn);

    if (validMove) {
      board[validMove.row][validMove.col] = Color[currentPlayer];
      this.lastMove = validMove;
      this.columnStatus[validMove.col]--;
      this.movesMade++;
    }
  }
  
  getMovePosition(board: Matrix, c: number) {
    for (let r = 5; r >= 0; r--) {
      if (!board[r][c]) {
        return { row: r, col: c };
      }
    }
  }
}