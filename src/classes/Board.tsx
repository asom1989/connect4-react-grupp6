import React, { Fragment } from "react";
import { BoardProps, BoardState, Setup } from "../types/types";
import Moves from "./Moves";
import Player from "./Player";
import VictoryChecker from "./VictoryChecker";
import { toast } from "react-toastify";

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

    // initialize Player
    const player = props.gameState;
    //this.player = new Player(player.name, player.playerType, player.playerColor);
    this.playerOne = new Player(player.playerOneName, player.playerOneType, 1);
    this.playerTwo = new Player(player.playerTwoName, player.playerTwoType, 0);

    // initialize state
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

  handlePlayerMove(columnIndex: number) {
    const { currentPlayer, matrix } = this.state;

    if (this.victoryChecker.isGameOver) {
      return;
    }

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
  }
  render() {
    const { currentPlayer } = this.state;
    return (
      <div className="game-container">
        <h1 className="game-title-board">Connect Four</h1>
        <div className="status">
          Current Player:
          <span style={{ color: currentPlayer.color === 1 ? "red" : "yellow" }}>
            {` ${currentPlayer.name}`}
          </span>
        </div>
        <div className="board">
          {this.state.matrix.map((row, rowIndex) => (
            <Fragment key={rowIndex}>
              {row.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className={`column ${column || ""}`}
                  onClick={() => this.handlePlayerMove(columnIndex)}
                  style={{
                    backgroundColor: column || "#D9D9D9", // set column background color
                  }}
                ></div>
              ))}
            </Fragment>
          ))}
        </div>
        <div className="board-buttons">
          <button type="button" onClick={this.resetGame}>
            Reset Game
          </button>
          <button type="button" onClick={this.props.onQuit}>
            Quit
          </button>
        </div>
      </div>
    );
  }
}
