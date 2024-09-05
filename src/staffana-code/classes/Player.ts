import { PlayerType, RegExes } from "../types/types.js";
import Input from "./Input.js";

export default class Player {
  #name: string = "";
  #playerType!: PlayerType;

  constructor(name: string, playerType: number) {
    this.name = name;
    this.playerType = playerType;
  }

  set name(nameInput: string) {
    if (nameInput === "") {
      nameInput = Input.getValid("Enter player name: ", "Player name must be 1-15 characters long. (Valid characters are letters, numbers and _)", RegExes.PlayerName);
    }
    this.#name = nameInput;
  }

  get name() {
    return this.#name;
  }

  set playerType(typeInput: number) {
    if (typeInput === 1) {
      this.#playerType = typeInput;
    }
    if (typeInput === 0) {
      console.log("\n1. Easy \n2. Hard");
      typeInput = +Input.getValid("Select computer difficulty level(1-2): ", "Invalid option! Please try again! \n1. Easy \n2. Hard", RegExes.Level);
      this.#playerType = typeInput + 1;
    }
  }
  get playerType() {
    return this.#playerType;
  }
}
