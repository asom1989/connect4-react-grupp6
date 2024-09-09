import React, { Fragment } from "react";
import { BoardProps, BoardState, Setup } from "../types/types";
import Moves from "./Moves";
import Player from "./Player";
import "./board.css";

interface BoardPropsPlayer {
  onQuit: () => void;
  gameState: Setup;
}

export default class Board extends React.Component<
  BoardPropsPlayer,
  BoardState
> {
  moves: Moves;
  playerOne: Player;
  playerTwo: Player;

  constructor(props: BoardPropsPlayer) {
    super(props);

    this.moves = new Moves();

    // initialize Player
    const player = props.gameState;
    this.playerOne = new Player(player.playerOneName, player.playerOneType, 1);
    this.playerTwo = new Player(player.playerTwoName, player.playerTwoType, 0);

    // initialize state
    this.state = {
      matrix: this.initializeMatrix(),
      currentPlayer: this.playerOne,
    };

    this.resetGame = this.resetGame.bind(this);
  }

  colorToString = (color: number): string => {
    return color === 1 ? "red" : "yellow";
  };

  resetGame = () => {
    this.moves = new Moves();
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
    const { currentPlayer } = this.state;
    if (this.moves.columnStatus[columnIndex] <= 0) return;

    const validMove = this.moves.getMovePosition(this.state.matrix, columnIndex);
    if (!validMove) return;

    const newMatrix = this.state.matrix.map((row) => row.slice());
    this.moves.makeMove(newMatrix, 1, currentPlayer.color, columnIndex);

    this.setState({ matrix: newMatrix }, () => {
      const columnElement = document.querySelector(
        `.row-${validMove.row}.col-${validMove.col}`
      ) as HTMLElement;

      if (columnElement) {
        columnElement.classList.remove('red', 'yellow');

        columnElement.classList.add('animate');

        setTimeout(() => {
          columnElement.classList.add(this.colorToString(currentPlayer.color));
        }, 0);
      }
    });

    this.setState((prevState) => ({
      currentPlayer:
        prevState.currentPlayer === this.playerOne
          ? this.playerTwo
          : this.playerOne,
    }));
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
                  className={`column row-${rowIndex} col-${columnIndex} ${column || ""}`}
                  onClick={() => this.handlePlayerMove(columnIndex)}
                  style={{
                    backgroundColor: "white", // set column background color
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
