import { Matrix, Move, Color } from "../types/types.js";

export default class VictoryChecker {
  isGameOver: boolean;
  isDraw: boolean;
  isWinner: number | undefined;
  winningCells: { row: number, col: number }[] = [];

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
    this.winningCells = this.checkBoard(board, lastMove, player);

    if (this.winningCells.length > 0) {
      this.isWinner = currentPlayer;
      this.isGameOver = true;
    }
    if (movesMade >= 42 && !this.isWinner) {
      this.isDraw = true;
      this.isGameOver = true;
    }
  }
  checkBoard(board: Matrix, lastMove: Move, player: string): { row: number; col: number }[] {

  // Check horizontal
  for (let colStart = Math.max(0, lastMove.col - 3); colStart <= Math.min(board[0].length - 4, lastMove.col); colStart++) {
    const cells = [];
    for (let offset = 0; offset < 4; offset++) {
      if (board[lastMove.row][colStart + offset] === player) {
        cells.push({ row: lastMove.row, col: colStart + offset });
      }
    }
    if (cells.length === 4) {
      return cells;  // Return winning horizontal cells
    }
  }

  for (let rowStart = Math.max(0, lastMove.row - 3); rowStart <= Math.min(board.length - 4, lastMove.row); rowStart++) {
    const cells = [];
    for (let offset = 0; offset < 4; offset++) {
      if (board[rowStart + offset][lastMove.col] === player) {
        cells.push({ row: rowStart + offset, col: lastMove.col });
      }
    }
    if (cells.length === 4) {
      return cells;  // Return winning vertical cells
    }
  }

  for (let offset = -3; offset <= 0; offset++) {
    const cells = [];
    for (let i = 0; i < 4; i++) {
      const row = lastMove.row + offset + i;
      const col = lastMove.col + offset + i;
      if (row >= 0 && row < board.length && col >= 0 && col < board[0].length && board[row][col] === player) {
        cells.push({ row, col });
      }
    }
    if (cells.length === 4) {
      return cells;  // Return winning diagonal cells
    }
  }

  // Check diagonal (top-right to bottom-left)
  for (let offset = -3; offset <= 0; offset++) {
    const cells = [];
    for (let i = 0; i < 4; i++) {
      const row = lastMove.row + offset + i;
      const col = lastMove.col - offset - i;
      if (row >= 0 && row < board.length && col >= 0 && col < board[0].length && board[row][col] === player) {
        cells.push({ row, col });
      }
    }
    if (cells.length === 4) {
      return cells;  // Return winning diagonal cells
    }
  }

  // No win found, return empty array
  return [];
  }

}