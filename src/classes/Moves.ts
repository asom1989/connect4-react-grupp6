import {
  Move,
  Matrix,
  BoardProps,
  PlayerType,
  Color,
  ColumnStatus,
} from "../types/types";
import Ai from "./Ai";
export default class Moves {
  movesMade: number;
  columnStatus: ColumnStatus;
  lastMove: Move;
  ai: Ai;

  constructor() {
    this.movesMade = 0;
    this.columnStatus = new Array(BoardProps.Cols).fill(6);
    this.lastMove = undefined!;
    this.ai = new Ai();
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

  //Detta för att skriva logik för den smart AI (type=3)
  computerSmartMove(board: Matrix, currentPlayerColor: number): number {
    return this.ai.getBestMove(
      board,
      8,
      Color[currentPlayerColor] === "Red" ? "Yellow" : "Red"
    );
  }

  makeMove(
    board: Matrix,
    playerType: PlayerType,
    currentPlayerColor: number,
    _col: number
  ) {
    if (this.movesMade >= 42) {
      return;
    }

    const validColumn =
      playerType === 1 || playerType === 3 ? _col : this.computerEasyMove();
    const validMove = this.getMovePosition(board, validColumn);

    if (validMove) {
      board[validMove.row][validMove.col] = Color[currentPlayerColor];
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
