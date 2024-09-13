import React from "react";
import { BoardProps, BoardState, Setup } from "../types/types";
import Moves from "./Moves";
import Player from "./Player";
import VictoryChecker from "./VictoryChecker";
// import { toast } from "react-toastify";
import BoardUI from "../components/Board/BoardUI";
import WinnerUI from "../components/winner/WinnerUI";

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
      winner: null,
    };

    this.resetGame = this.resetGame.bind(this);
  }

  resetGame = () => {
    this.moves = new Moves();
    this.victoryChecker = new VictoryChecker();
    this.setState({
      matrix: this.initializeMatrix(),
      currentPlayer: this.playerOne,
      winner: null,
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

    // Track the last move (row and column)
    const lastMove = this.moves.lastMove;

    this.setState({ matrix: newMatrix, lastMove }, () => {
      this.victoryChecker.checkForWin(
        newMatrix,
        this.moves.lastMove,
        this.moves.movesMade,
        currentPlayer.color
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
            // toast.info("The game is a draw!");
            this.setState({ winner: "Draw" });
          } else {
            // toast.success(`${currentPlayer.name} has won the game!`);
            this.setState({ winner: currentPlayer.name });
            this.updateLocalStorage(currentPlayer.name);
          }
          return;
        }
        return;
      });

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
                this.handlePlayerMove(
                  this.moves.computerSmartMove(
                    this.state.matrix,
                    this.state.currentPlayer === this.playerOne ? 1 : 2
                  )
                );
              }
            }, 500);
          }
        }
      );
    });
  };

  updateLocalStorage(winnerName: string) {
    const playerStatsString = localStorage.getItem("playerStats");
    const playerStats: {
      [key: string]: { wins: number; moves: number; avatar: string };
    } = playerStatsString ? JSON.parse(playerStatsString) : {};

    if (!playerStats[winnerName]) {
      playerStats[winnerName] = {
        wins: 0,
        moves: Number.MAX_VALUE,
        avatar: this.state.currentPlayer.avatar,
      };
    }

    playerStats[winnerName].wins += 1;

    if (this.moves.movesMade < playerStats[winnerName].moves) {
      playerStats[winnerName].moves = this.moves.movesMade;
    }

    localStorage.setItem("playerStats", JSON.stringify(playerStats));
  }

  render() {
    return (
      <>
        {this.state.winner && (
          <WinnerUI
            winner={this.state.winner}
            onResetGame={this.resetGame}
            onQuitGame={this.props.onQuit}
          />
        )}
        <BoardUI
          matrix={this.state.matrix}
          currentPlayer={this.state.currentPlayer}
          onCellClick={this.handlePlayerMove}
          onResetGame={this.resetGame}
          onQuitGame={this.props.onQuit}
          lastMove={this.state.lastMove} // Pass the last move
        />
      </>
    );
  }
}
