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
}