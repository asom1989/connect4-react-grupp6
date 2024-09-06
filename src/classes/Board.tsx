import React, { Fragment } from "react";
import { BoardProps, BoardState, Setup } from "../types/types";
import Moves from "./Moves";

interface BoardPropsPlayer {
  onQuit: () => void;
  gameState: Setup;
}

export default class Board extends React.Component<
  BoardPropsPlayer,
  BoardState
> {
  moves: Moves;

  constructor(props: BoardPropsPlayer) {
    super(props);

    this.moves = new Moves();
    // initialize state
    const player = props.gameState;
    this.state = {
      matrix: this.initializeMatrix(),
      currentPlayerName: player.playerOneName,
      currentPlayerColor: "red",
      playerOneName: player.playerOneName,
      playerTwoName: player.playerTwoName,
      playerOneColor: 1,
      playerTwoColor: 0,
    };

    this.resetGame = this.resetGame.bind(this);
  }

  resetGame = () => {
    this.setState({
      matrix: this.initializeMatrix(),
      currentPlayerColor: "red",
    });
  };

  initializeMatrix() {
    return Array(BoardProps.Rows)
      .fill(null)
      .map(() => Array(BoardProps.Cols).fill(null));
  }

  handlePlayerMove(columnIndex: number) {
    if (this.moves.columnStatus[columnIndex] <= 0) return;

    const { currentPlayerName, playerOneName, playerTwoName } = this.state;

    const currentPlayerColor = this.state.currentPlayerColor === "red" ? 1 : 0;

    this.moves.makeMove(this.state.matrix, 1, currentPlayerColor, columnIndex);
    const newMatrix = this.state.matrix.map((row) => row.slice());

    this.setState({
      matrix: newMatrix,
      currentPlayerColor:
        this.state.currentPlayerColor === "red" ? "yellow" : "red",
      currentPlayerName:
        currentPlayerName === playerOneName ? playerTwoName : playerOneName,
    });
  }

  render() {
    const { currentPlayerName, currentPlayerColor } = this.state;
    return (
      <div className="game-container">
        <h1 className="game-title-board">Connect Four</h1>
        <div className="status">
          Current Player:
          <span style={{ color: currentPlayerColor }}>
            {` ${currentPlayerName}`}
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
