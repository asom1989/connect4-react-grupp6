import "./winner-stats.css";
const WinnerStats = () => {
  return (
    <section className="winner-stats-overlay">
      <div className="winner-stats-overlay-content">
        <h2>Winner Stats</h2>
        <div className="winner-stats_info">
          <div>
            <h3>Player with Most Wins</h3>
            <p>Name:Motasem</p>
            <p>Wins:10</p>
          </div>
          <img src="/images/user_icon_001.jpg" alt="Most Wins Player" />
        </div>
        <div>
          <div className="winner-stats_info">
            <h3>Player with Fewest Moves to Win</h3>
            <p>Name: Motasem</p>
            <p>Moves: 5</p>
          </div>
          <img src="/images/user_icon_001.jpg" alt="Fewest Moves Player" />
        </div>
        <button className="secondary-btn" type="button">
          Back to Game
        </button>
      </div>
    </section>
  );
};

export default WinnerStats;
