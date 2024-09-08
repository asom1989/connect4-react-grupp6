import { Color, PlayerType } from "../types/types";

export default class Player {
  name: string;
  type: PlayerType;
  color: Color;

  constructor(name: string, type: number, color: number) {
    this.name = name;
    this.type = type;
    this.color = color;
  }
}
