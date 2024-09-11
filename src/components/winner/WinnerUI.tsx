import Confetti from "react-confetti";
import "./winner.css";

interface WinnerProps {
  winner: string;
  onResetGame: () => void;
  onQuitGame: () => void;
}

export default function WinnerUI({
  winner,
  onResetGame,
  onQuitGame,
}: WinnerProps) {
  return (
    <div>
      <Confetti />
      <div>
        <h1>{winner}</h1>
        <div className="board-buttons">
          <button className="secondary-btn" type="button" onClick={onResetGame}>
            Reset Game
          </button>
          <button className="secondary-btn" type="button" onClick={onQuitGame}>
            Quit
          </button>
        </div>
      </div>
    </div>
  );
}
