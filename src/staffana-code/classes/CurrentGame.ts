import { GamePlayer, Color } from "../types/types.js";
import Board from "./Board.js";
import Moves from "./Moves.js";
import GameChecker from "./GameChecker.js";

export default class CurrentGame {
  currentPlayer: number;
  players: GamePlayer[];
  board: Board;
  moves: Moves;
  gameChecker: GameChecker;

  constructor(playerOne: GamePlayer, playerTwo: GamePlayer) {
    this.currentPlayer = 1;
    this.players = [playerOne, playerTwo];
    this.board = new Board();
    this.moves = new Moves();
    this.gameChecker = new GameChecker();
    this.gameLoop();
  }

  gameLoop() {
    while (!this.gameChecker.isGameOver) {
      console.clear();
      this.board.render();
      this.moves.makeMove(
        this.board.matrix,
        this.players[this.currentPlayer - 1],
        this.currentPlayer
      );
      this.gameChecker.checkForWin(this.board.matrix, this.moves.lastMove, this.moves.movesMade, this.currentPlayer);
      this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }
    if (this.gameChecker.isDraw) {
      console.log("Game ended in a draw!");
    }
    if (this.gameChecker.isWinner) {
      const winner = this.players[this.gameChecker.isWinner - 1];
      console.log(`${winner.name} (${Color[this.gameChecker.isWinner]}) won!`);
    }
  }
}