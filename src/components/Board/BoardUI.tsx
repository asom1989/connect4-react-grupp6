import { Fragment, useState } from "react";
import Player from "../../classes/Player";
import { Matrix } from "../../types/types";
import "./board-ui.css";
import HighScore from "../WinnerStats/Highscore";
import getHighscore from "../../utils/getHighscore";

interface BoardUIProps {
  matrix: Matrix;
  currentPlayer: Player;
  lastMove?: { row: number; col: number }; // Add the lastMove prop
  onCellClick: (columnIndex: number) => void;
  onResetGame: () => void;
  onQuitGame: () => void;
  winningCells: { row: number; col: number }[];
}

const isWinningCell = (
  row: number,
  col: number,
  winningCells: { row: number; col: number }[]
) => {
  return winningCells.some((cell) => cell.row === row && cell.col === col);
};

const BoardUI = ({
  matrix,
  currentPlayer,
  lastMove,
  onCellClick,
  onResetGame,
  onQuitGame,
  winningCells,
}: BoardUIProps) => {
  const [showHighscore, setShowHighscore] = useState(false);
  const { mostWinsPlayer, fewestMovesPlayer } = getHighscore();

  return (
    <div className="game-container">
      {showHighscore && (
        <HighScore
          setShowHighscore={setShowHighscore}
          mostWinsPlayer={mostWinsPlayer}
          fewestMovesPlayer={fewestMovesPlayer}
        />
      )}
      <div className="status">
        {/* Current Player: */}
        <span style={{ color: currentPlayer.color === 1 ? "red" : "yellow" }}>
          {` ${currentPlayer.name}'s turn`}
        </span>
        <img
          className="board-player-img"
          src={currentPlayer.avatar}
          alt={`${currentPlayer.name}'s avatar`}
        />
      </div>
      <div className="board">
        {matrix.map((row, rowIndex) => (
          <Fragment key={rowIndex}>
            {row.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className={`brick ${
                  isWinningCell(rowIndex, columnIndex, winningCells)
                    ? "winning-brick" // Apply a special class to winning cells
                    : lastMove?.row === rowIndex &&
                      lastMove?.col === columnIndex
                    ? "new-brick"
                    : ""
                }`}
                onClick={() => onCellClick(columnIndex)}
                style={{
                  backgroundColor: column || "white", // Set column background color
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
          Quit Game
        </button>
        <button
          className="secondary-btn"
          type="button"
          onClick={() => setShowHighscore(true)}
        >
          High Score
        </button>
      </div>
    </div>
  );
};

export default BoardUI;
