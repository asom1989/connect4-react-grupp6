import Confetti from "react-confetti";
import "./winner.css";

interface WinnerProps {
  winner: string;
  winnerAvatar: string;
  onResetGame: () => void;
  onQuitGame: () => void;
}

export default function WinnerUI({
  winner,
  winnerAvatar,
  onResetGame,
  onQuitGame,
}: WinnerProps) {
  return (
    <section className="overlay">
      <Confetti />
      <article className="winner-content">
        {winnerAvatar ? (
          <img
            src={winnerAvatar}
            alt={`${winner}'s Avatar`}
            className="winner-avatar"
          />
        ) : (
          <img src="/images/prize.png" alt="prize" className="prize-avatar" />
        )}
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
