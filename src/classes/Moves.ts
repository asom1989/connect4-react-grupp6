import { Move, Matrix, BoardProps, PlayerType, Color } from "../types/types";
export default class Moves {
  movesMade: number;
  lastMove: Move;

  constructor() {
    this.movesMade = 0;
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

  makeMove(board: Matrix, playerType: PlayerType, currentPlayer: number, _move: Move) {
    if (this.movesMade >= 42) { return }

    const validMove = playerType === 1 ? _move : this.computerEasyMove(board);
    
    if (validMove) {
      board[validMove.row][validMove.col] = Color[currentPlayer];
      this.lastMove = validMove;
      this.movesMade++;
    }
  }
}