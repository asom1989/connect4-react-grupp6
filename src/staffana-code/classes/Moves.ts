import Input from "./Input.js";
import { Move, Matrix, GamePlayer, Color, RegExes, BoardProps } from "../types/types.js";

export default class Moves {
  movesMade: number;
  lastMove: Move;

  constructor() {
    this.movesMade = 0;
    this.lastMove = undefined!;
  }
  makeMove(matrix: Matrix, player: GamePlayer, currentPlayer: number) {
    let validMove = null;
    if (this.movesMade >= 42) {
      return;
    }

    if (player.playerType === 1) {
      validMove = this.playerMove(matrix, player.name, Color[currentPlayer]);
    }

    if (player.playerType === 2) {
      validMove = this.computerEasyMove(matrix);
    }

    if (validMove) {
      matrix[validMove.row][validMove.col] = Color[currentPlayer];
      this.lastMove = validMove;
      this.movesMade++;
    }
  }
  playerMove(matrix: Matrix, player: string, color: string) {
    let validMove = null;
    while (!validMove) {
      try {
        const choosenColumn = Input.getValid(
          `(${color}) ${player}'s turn. Choose column (1-7): `,
          "Invalid column number! Please try again.\n",
          RegExes.Column
        );
        validMove = this.moveIsValid(matrix, choosenColumn);
        if (!validMove) {
          throw new Error("Choosen column is full, please try again.\n");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
    return validMove;
  }
  computerEasyMove(matrix: Matrix) {
    let validMove = null;
    while (!validMove) {
      validMove = this.moveIsValid(
        matrix,
        Math.floor(Math.random() * (7 - 1 + 1)) + 1 + ""
      );
    }
    return validMove;
  }
  moveIsValid(matrix: Matrix, move: string) {
    const col = +move - 1;
    for (let row = BoardProps.Rows - 1; row >= 0; row--) {
      if (!matrix[row][col]) {
        return { row, col };
      }
    }
    return null;
  }
}
