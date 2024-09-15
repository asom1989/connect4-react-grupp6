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
      {winner === "Draw" ? null : <Confetti />}

      <article className="winner-content">
        {winner === "Draw" ? (
          <img
            src="/public/images/vs_draw1.jpg"
            alt="draw"
            className="draw-avatar"
          />
        ) : winnerAvatar === "/images/user_icon_001.jpg" ? (
          <img src="/images/prize.png" alt="prize" className="prize-avatar" />
        ) : (
          <img
            src={winnerAvatar}
            alt={`${winner}'s Avatar`}
            className="winner-avatar"
          />
        )}

        {winner === "Draw" ? <h1>It is a draw!</h1> : <h1>{winner} Wins!</h1>}

        <div className="winner-overlay-buttons">
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
