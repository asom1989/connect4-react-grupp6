import { Color, PlayerType } from "../types/types";

export default class Player {
  name: string;
  type: PlayerType;
  color: Color;
  avatar: string;

  constructor(name: string, type: number, color: number, avatar: string) {
    this.name = name;
    this.type = type;
    this.color = color;
    this.avatar = avatar || "/public/images/user_icon_001.jpg";
  }
}
