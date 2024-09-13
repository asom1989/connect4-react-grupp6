import "./high-score.css";

interface HighScoreProps {
  setShowHighscore: (toggle: boolean) => void;
  mostWinsPlayer: { name: string; avatar: string; wins: number };
  fewestMovesPlayer: { name: string; avatar: string; moves: number };
}

const HighScore = ({
  setShowHighscore,
  mostWinsPlayer,
  fewestMovesPlayer,
}: HighScoreProps) => {
  return (
    <section className="high-score-overlay">
      <div className="high-score-overlay-content">
        <h2>High Score</h2>

        <article>
          <h3>Player with Most Wins:</h3>
          <div className="high-score-info">
            <img src={mostWinsPlayer.avatar} alt="Most Wins Player" />
            <div className="high-score-text-content">
              <p>
                <span>Name:</span>
                {mostWinsPlayer.name}
              </p>
              <p>
                <span>Wins:</span>
                {mostWinsPlayer.wins}
              </p>
            </div>
          </div>
        </article>
        <article>
          <h3>Player with Fewest Moves to Win:</h3>
          <div className="high-score-info">
            <img src={fewestMovesPlayer.avatar} alt="Fewest Moves Player" />
            <div className="high-score-text-content">
              <p>
                <span>Name:</span>
                {fewestMovesPlayer.name}
              </p>
              <p>
                <span>Moves:</span>
                {fewestMovesPlayer.moves}
              </p>
            </div>
          </div>
        </article>

        <button
          className="secondary-btn"
          type="button"
          onClick={() => setShowHighscore(false)}
        >
          Back to Game
        </button>
      </div>
    </section>
  );
};

export default HighScore;
