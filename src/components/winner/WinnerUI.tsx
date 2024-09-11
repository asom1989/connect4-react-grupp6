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
    <section className="overlay">
      <Confetti />
      <article className="winner-content">
        <img src="/public/images/prize.png" alt="prize" />
        <h1>{winner} Wins!</h1>
        <div className="board-buttons">
          <button className="secondary-btn" type="button" onClick={onResetGame}>
            Reset Game
          </button>
          <button className="secondary-btn" type="button" onClick={onQuitGame}>
            Quit Game
          </button>
        </div>
      </article>
    </section>
  );
}
