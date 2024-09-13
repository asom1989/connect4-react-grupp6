import "./high-score.css";

interface HighScoreProps {
  setShowHighscore: (toggle: boolean) => void;
}

const HighScore = ({ setShowHighscore }: HighScoreProps) => {
  return (
    <section className="high-score-overlay">
      <div className="high-score-overlay-content">
        <h2>High Score</h2>

        <article>
          <h3>Player with Most Wins:</h3>
          <div className="high-score-info">
            <img src="/images/user_icon_001.jpg" alt="Most Wins Player" />
            <div className="high-score-text-content">
              <p>
                <span>Name:</span>Motasem
              </p>
              <p>
                <span>Wins:</span>10
              </p>
            </div>
          </div>
        </article>
        <article>
          <h3>Player with Fewest Moves to Win:</h3>
          <div className="high-score-info">
            <img src="/images/user_icon_001.jpg" alt="Fewest Moves Player" />
            <div className="high-score-text-content">
              <p>
                <span>Name:</span>Motasem
              </p>
              <p>
                <span>Moves:</span> 5
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
