import { Matrix, Move, Color } from "../types/types.js";

export default class GameChecker {
  isGameOver: boolean;
  isDraw: boolean;
  isWinner: number | undefined;

  constructor() {
    this.isGameOver = false;
    this.isDraw = false;
    this.isWinner = undefined;
  }
  checkForWin(
    board: Matrix,
    lastMove: Move,
    movesMade: number,
    currentPlayer: number
  ) {
    const player = Color[currentPlayer];
    if (
      this.checkBoard(board, lastMove, player)
    ) {
      this.isWinner = currentPlayer;
      this.isGameOver = true;
    }
    if (movesMade >= 42 && !this.isWinner) {
      this.isDraw = true;
      this.isGameOver = true;
    }
  }
  checkBoard(board: Matrix, lastMove: Move, player: string) {
    const diagonalOffsets = [
      [lastMove.row - 3, lastMove.col - 3],
      [lastMove.row - 3, lastMove.col + 3],
    ];
    for (let i = 0; i < 4; i++){
      const horizontal = board[lastMove.row].slice(i, i + 4).every(col => col === player);
      let vertical = false;
      if (i < 3) {
        vertical = [0, 1, 2, 3].every((row) => board[i + row][lastMove.col] === player);
      }
      if (horizontal || vertical) {
        return true;
      }
      let diagonal = 0;
      let roOne = diagonalOffsets[0][0] + i;
      let coOne = diagonalOffsets[0][1] + i;
      let roTwo = diagonalOffsets[1][0] + i;
      let coTwo = diagonalOffsets[1][1] - i;
      if (!(roOne < 0 || roOne > 2 || coOne < 0 || coOne > 3)) {
        for (let j = 0; j < 4; j++){
          if (board[roOne + j][coOne + j] === player) {
            diagonal++
          }
        }
        if (diagonal === 4) {
          return true;
        }
        diagonal = 0;
      }
      if (!(roTwo < 0 || roTwo > 2 || coTwo < 0 || coTwo > 3)) {
        for (let j = 0; j < 4; j++){
          if (board[roTwo + j][coTwo - j] === player) {
            diagonal++
          }
        }
        if (diagonal === 4) {
          return true;
        }
        diagonal = 0;
      }
    }
    return false;
  }
}