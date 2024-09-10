import React, { Fragment, useState } from "react";
import Player from "../../classes/Player";
import { Matrix } from "../../types/types";
import "./board-ui.css";

interface BoardUIProps {
  matrix: Matrix;
  currentPlayer: Player;
  onCellClick: (columnIndex: number) => void;
  onResetGame: () => void;
  onQuitGame: () => void;
  getMovePosition: (
    board: Matrix,
    columnIndex: number
  ) => { row: number; col: number } | undefined;
}

const BoardUI: React.FC<BoardUIProps> = ({
  matrix,
  currentPlayer,
  onCellClick,
  onResetGame,
  onQuitGame,
  getMovePosition,
}) => {
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

  const getHoveringPosition = (columnIndex: number) => {
    const position = getMovePosition(matrix, columnIndex);
    return position;
  };

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
            {row.map((cell, columnIndex) => {
              const isHovering = hoveredColumn === columnIndex;
              const hoverPosition = getHoveringPosition(columnIndex);
              const isHoverRow = hoverPosition
                ? hoverPosition.row === rowIndex
                : false;
              return (
                <div
                  key={columnIndex}
                  className={`brick ${cell || ""} ${
                    isHovering && isHoverRow ? "hovered" : ""
                  }`}
                  onMouseEnter={() => setHoveredColumn(columnIndex)}
                  onMouseLeave={() => setHoveredColumn(null)}
                  onClick={() => onCellClick(columnIndex)}
                  style={{
                    backgroundColor: cell
                      ? cell === "Red"
                        ? "red"
                        : "yellow"
                      : "#D9D9D9",
                  }}
                >
                  {isHovering && isHoverRow && (
                    <div
                      className="hover-preview"
                      style={{
                        backgroundColor:
                          currentPlayer.color === 1 ? "red" : "yellow",
                      }}
                    />
                  )}
                </div>
              );
            })}
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
