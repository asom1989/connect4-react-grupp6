import { Color, PlayerType } from "../types/types";

export default class Player {
  name: string;
  type: PlayerType;
  color: Color;
  avatar: string;
  playerMovesMade: number;

  constructor(name: string, type: number, color: number, avatar: string) {
    this.name = name;
    this.type = type;
    this.color = color;
    this.avatar = avatar || "/images/user_icon_001.jpg";
    this.playerMovesMade = 0;
  }
  incrementMoves() {
    this.playerMovesMade += 1;
  }
}
