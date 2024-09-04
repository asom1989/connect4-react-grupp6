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

  computerEasyMove(): number {
    return this.validColumns[Math.floor(Math.random() * (this.validColumns.length - 0)) + 0];
  }

  makeMove(board: Matrix, playerType: PlayerType, currentPlayer: number, _col: number) {
    if (this.movesMade >= 42) { return }

    const validColumn = playerType === 1 ? _col : this.computerEasyMove();
    const validMove = this.getMovePosition(board, validColumn);

    if (validMove) {
      board[validMove.row][validMove.col] = Color[currentPlayer];
      this.lastMove = validMove;
      this.columnStatus[validMove.col]--;
      this.movesMade++;
    }
  }


}