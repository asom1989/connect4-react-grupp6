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
      // Positively sloped diagonals
      for (let row = 0; row < this.ROWS - 3; row++) {
        for (let col = 0; col < this.COLS - 3; col++) {
          if (
            [0, 1, 2, 3].every(
              (offset) => board[row + offset][col + offset] === player
            )
          ) {
            return player;
          }
        }
      }
      // Negatively sloped diagonals
      for (let row = 0; row < this.ROWS - 3; row++) {
        for (let col = 3; col < this.COLS; col++) {
          if (
            [0, 1, 2, 3].every(
              (offset) => board[row + offset][col - offset] === player
            )
          ) {
            return player;
          }
        }
      }
    }
    // Check if game is a draw
    if (this.getValidMoves(board).length === 0) {
      return "DRAW";
    }
    return false;
  }

  evaluatePosition(board: Matrix, player: string, length: number) {
    let count = 0;
    // Horizontal
    for (let row = 0; row < this.ROWS; row++) {
      for (let col = 0; col <= this.COLS - length; col++) {
        const arr = [];
        for (let i = 0; i < length; i++) {
          arr.push(board[row][col + i]);
        }
        if (arr.every((cell) => cell === player)) {
          count++;
        }
      }
    }
    // Vertical
    for (let col = 0; col < this.COLS; col++) {
      for (let row = this.ROWS - 1; row >= length - 1; row--) {
        const arr = [];
        for (let i = 0; i < length; i++) {
          arr.push(board[row - i][col]);
        }
        if (arr.includes(null)) {
          break;
        }
        if (arr.every((cell) => cell === player)) {
          count++;
        }
      }
    }
    // Positively sloped diagonal
    for (let row = 0; row <= this.ROWS - length; row++) {
      for (let col = 0; col <= this.COLS - length; col++) {
        const arr = [];
        for (let i = 0; i < length; i++) {
          arr.push(board[row + i][col + i]);
        }
        if (arr.every((element) => element === player)) {
          count++;
        }
      }
    }
    // Negatively sloped diagonal
    for (let row = 0; row <= this.ROWS - length; row++) {
      for (let col = this.COLS - 1; col >= length - 1; col--) {
        const arr = [];
        for (let i = 0; i < length; i++) {
          arr.push(board[row + i][col - i]);
        }
        if (arr.every((element) => element === player)) {
          count++;
        }
      }
    }
    return count;
  }

  evaluateBoard(board: Matrix, player: string) {
    const opponent = player === "X" ? "O" : "X";
    let score = 0;

    score += this.evaluatePosition(board, player, 2) * 2 + this.evaluatePosition(board, player, 3) * 5 + this.evaluatePosition(board, player, 4) * 1000;
    score -= this.evaluatePosition(board, opponent, 2) * 2 + this.evaluatePosition(board, opponent, 3) * 5 + this.evaluatePosition(board, opponent, 4) * 1000;

    return score;
  }
}