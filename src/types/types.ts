export enum BoardProps {
  Rows = 6,
  Cols = 7,
}

export type Matrix = (string | null)[][];

export type Move = {
  row: number;
  col: number;
};

export enum Color {
  Red = 1,
  Yellow = 0,
}

export type ColumnStatus = (0 | 1 | 2 | 3 | 4 | 5 | 6)[];

export interface BoardState {
  matrix: (string | null)[][];
  currentPlayer: PlayerInfo;
  winningCells: { row: number; col: number }[];
  winnerAvatar: string | null;
  winner: string | null;

  lastMove?: { row: number; col: number };
}
export type PlayerInfo = {
  name: string;
  type: PlayerType;
  color: Color;
  avatar: string;
  playerMovesMade: number;
  incrementMoves: () => void;
};

export enum PlayerType {
  Player = 1,
  Easy,
  Hard,
}

export enum GameType {
  Dual = 1,
  Single,
  AI,
}

export type Setup = {
  playerOneName: string;
  playerTwoName: string;
  playerOneType: PlayerType;
  playerTwoType: PlayerType;
  playerOneAvatar: string;
  playerTwoAvatar: string;
  playerOneMovesMade: number;
  playerTwoMovesMade: number;
  gameType: GameType;
};
export interface BoardPropsPlayer {
  onQuit: () => void; // A function that will be called when the player quits
  gameState: Setup; // Represents the initial setup or game state
}
