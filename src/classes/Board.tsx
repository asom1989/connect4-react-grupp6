import React from "react";
import { BoardProps, BoardState, Setup } from "../types/types";
import Moves from "./Moves";
import Player from "./Player";
import VictoryChecker from "./VictoryChecker";
import { toast } from "react-toastify";
import BoardUI from "../components/Board/BoardUI";

interface BoardPropsPlayer {
  onQuit: () => void;
  gameState: Setup;
}

export default class Board extends React.Component<
  BoardPropsPlayer,
  BoardState
> {
  moves: Moves;
  victoryChecker: VictoryChecker;
  playerOne: Player;
  playerTwo: Player;

  constructor(props: BoardPropsPlayer) {
    super(props);

    this.moves = new Moves();
    this.victoryChecker = new VictoryChecker();

    const player = props.gameState;
    this.playerOne = new Player(
      player.playerOneName,
      player.playerOneType,
      1,
      player.playerOneAvatar
    );
    this.playerTwo = new Player(
      player.playerTwoName,
      player.playerTwoType,
      0,
      player.playerTwoAvatar
    );

    this.state = {
      matrix: this.initializeMatrix(),
      currentPlayer: this.playerOne,
    };

    this.resetGame = this.resetGame.bind(this);
  }

  resetGame = () => {
    this.moves = new Moves();
    this.victoryChecker = new VictoryChecker();
    this.setState({
      matrix: this.initializeMatrix(),
      currentPlayer: this.playerOne,
    });
  };

  initializeMatrix() {
    return Array(BoardProps.Rows)
      .fill(null)
      .map(() => Array(BoardProps.Cols).fill(null));
  }

  handlePlayerMove = (columnIndex: number) => {
    const { currentPlayer, matrix } = this.state;

    if (this.victoryChecker.isGameOver) return;

    if (this.moves.columnStatus[columnIndex] <= 0) return;

    const newMatrix = matrix.map((row) => row.slice());

    this.moves.makeMove(
      newMatrix,
      currentPlayer.type,
      currentPlayer.color,
      columnIndex
    );

    this.setState({ matrix: newMatrix }, () => {
      this.victoryChecker.checkForWin(
        newMatrix,
        this.moves.lastMove,
        this.moves.movesMade,
        currentPlayer.color
      );

      if (this.victoryChecker.isGameOver) {
        if (this.victoryChecker.isDraw) {
          toast.info("The game is a draw!");
        } else {
          toast.success(`${currentPlayer.name} has won the game!`);
        }
        return;
      }

      this.setState(
        {
          currentPlayer:
            currentPlayer === this.playerOne ? this.playerTwo : this.playerOne,
        },
        () => {
          if (this.state.currentPlayer.type !== 1) {
            setTimeout(() => {
              if (this.state.currentPlayer.type === 2) {
                const columnIndex = this.moves.computerEasyMove();
                this.handlePlayerMove(columnIndex);
              } else if (this.state.currentPlayer.type === 3) {
                const columnIndex = this.moves.computerSmartMove();
                this.handlePlayerMove(columnIndex);
              }
            }, 500);
          }
        }
      );
    });
  };

  render() {
    return (
      <BoardUI
        matrix={this.state.matrix}
        currentPlayer={this.state.currentPlayer}
        onCellClick={this.handlePlayerMove}
        onResetGame={this.resetGame}
        onQuitGame={this.props.onQuit}
      />
    );
  }
}
