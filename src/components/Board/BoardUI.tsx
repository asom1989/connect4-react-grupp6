import React, { Fragment } from "react";
import Player from "../../classes/Player";
import { Matrix } from "../../types/types";
import './board-ui.css';

interface BoardUIProps {
  matrix: Matrix;
  currentPlayer: Player;
  onCellClick: (columnIndex: number) => void;
  onResetGame: () => void;
  onQuitGame: () => void;
}

const BoardUI: React.FC<BoardUIProps> = ({
  matrix,
  currentPlayer,
  onCellClick,
  onResetGame,
  onQuitGame,
}) => {
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
        {matrix.map((row, rowIndex) => (
          <Fragment key={rowIndex}>
            {row.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className={`column row-${rowIndex} col-${columnIndex} ${column || ""}`}
                onClick={() => onCellClick(columnIndex)}
                style={{
                  backgroundColor: "white", // Set column background color
                }}
              ></div>
            ))}
          </Fragment>
        ))}
      </div>
      <div className="board-buttons">
        <button className="secondary-btn" type="button" onClick={onResetGame}>
          Reset Game
        </button>
        <button className="secondary-btn" type="button" onClick={onQuitGame}>
          Quit
        </button>
      </div>
    </div>
  );
};

export default BoardUI;
