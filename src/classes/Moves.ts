import { Move, Matrix, BoardProps } from "../types/types";
export default class Moves {
  moveMade: number;
  lastMove: Move;

  constructor() {
    this.moveMade = 0;
    this.lastMove = undefined!;
  }

  moveIsValid(board: Matrix, col: number) {
    for (let row = BoardProps.Rows - 1; row >= 0; row--){
      if (!board[row][col]) {
        return { row, col };
      }
    }
    return null;
  }

  computerEasyMove(board: Matrix) {
    let validMove = null;
    while (!validMove) {
      validMove = this.moveIsValid(board, Math.floor(Math.random() * 7) + 1);
    }
    return validMove;
  }
}