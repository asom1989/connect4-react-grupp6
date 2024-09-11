import { Matrix, BoardProps, Color } from "../types/types";

export default class Ai {
  ROWS: number;
  COLS: number;
  currentPlayer: Color;
  movesMade: number;

  constructor() {
    this.ROWS = BoardProps.Rows;
    this.COLS = BoardProps.Cols;
    this.currentPlayer = 1;
    this.movesMade = 0;
  }

  makeMove(board: Matrix, move: number, player: string) {
    for (let row = this.ROWS - 1; row >= 0; row--) {
      if (!board[row][move]) {
        this.movesMade++;
        board[row][move] = player;
        break;
      }
    }
    return true;
  }

  undoMove(board: Matrix, move: number) {
    for (let row = 0; row < this.ROWS; row++) {
      if (board[row][move] !== null) {
        this.movesMade--;
        board[row][move] = null;
        break;
      }
    }
    return true;
  }

  checkWinningMove(board: Matrix) {
    const players = ["X", "O"];
    for (const player of players) {
      // Horizontal
      for (let row = 0; row < this.ROWS; row++) {
        for (let col = 0; col < this.COLS - 3; col++) {
          if (
            board[row].slice(col, col + 4).every((column) => column === player)
          ) {
            return player;
          }
        }
      }
      // Vertical
      for (let col = 0; col < this.COLS; col++) {
        for (let row = 0; row < this.ROWS - 3; row++) {
          if ([0, 1, 2, 3].every((r) => board[row + r][col] === player)) {
            return player;
          }
        }
      }
    }
  }
}