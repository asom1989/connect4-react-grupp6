
export type Matrix = (string | null)[][];

export enum BoardProps {
  Rows = 6,
  Cols = 7,
}

export type Move = {
  row: number;
  col: number;
};

export enum PlayerType {
  Player = 1,
  Easy,
  Hard,
}

export enum Color {
  Red = 1,
  Yellow = 0,
}

export type ColumnStatus = (0 | 1 | 2 | 3 | 4 | 5 | 6)[];

export interface BoardState {
  matrix: (string | null)[][];
  currentPlayerColor: string;
  
}

export enum RegExes {
  Column = 0,
  GameType = 1,
  Level = 2,
  PlayerName = 3,
}
export enum GameType {
  Dual = 1,
  Single,
  AI,
}
export type GamePlayer = {
  name: string;
  playerType: PlayerType;
};
