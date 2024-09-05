import GameSetup from "./GameSetup.js";
import CurrentGame from "./CurrentGame.js";

export default class Game {
  setup: GameSetup;
  currentGame: CurrentGame;

  constructor() {
    this.setup = new GameSetup();
    this.currentGame = new CurrentGame(this.setup.playerOne, this.setup.playerTwo);
  }
}