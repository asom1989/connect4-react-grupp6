import { PlayerType } from "../types/types";

export default class Player {
  #name: string = "";
  #playerType!: PlayerType;

  constructor(name: string, playerType: number) {
    this.name = name;
    this.playerType = playerType;
  }

  set name(nameInput: string) {
    this.#name = nameInput;
  }

  get name() {
    return this.#name;
  }

  set playerType(typeInput: PlayerType) {
    if (
      typeInput === PlayerType.Player ||
      typeInput === PlayerType.Easy ||
      typeInput === PlayerType.Hard
    ) {
      this.#playerType = typeInput;
    }
  }
  get playerType() {
    return this.#playerType;
  }
}
