import Player from "./Player.js";
import { GameType, RegExes } from "../types/types.js";
import Input from "./Input.js";

export default class GameSetup {
  #gameType: string = "";
  #playerOne: Player;
  #playerTwo: Player;

  constructor() {
    this.gameType = "";
    this.#playerOne = new Player(this.#gameType === GameType[3] ? "Computer" : "", this.#gameType === GameType[3] ? 0 : 1);
    this.#playerTwo = new Player(this.#gameType === GameType[1] ? "" : "Computer", this.#gameType === GameType[1] ? 1 : 0);
  }

  set gameType(option: string) {
    console.log("1. Dual player \n2. Single player \n3. AI \n");
    option = Input.getValid("Select game type (1-3): ", "Invalid input, please try again!", RegExes.GameType);
    this.#gameType = GameType[+option];
  }
  get gameType() {
    return this.#gameType;
  }
  get playerOne() {
    return { name: this.#playerOne.name, playerType: this.#playerOne.playerType }
  }
  get playerTwo() {
    return { name: this.#playerTwo.name, playerType: this.#playerTwo.playerType }
  }
} 

