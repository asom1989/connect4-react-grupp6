const getHighscore = () => {
  const highscoreString = localStorage.getItem("playerStats");
  const highscoreStats: {
    [key: string]: { wins: number; moves: number; avatar: string };
  } = highscoreString ? JSON.parse(highscoreString) : {};

  if (Object.keys(highscoreStats).length === 0) {
    return {
      mostWinsPlayer: { name: "", avatar: "", wins: 0 },
      fewestMovesPlayer: { name: "", avatar: "", moves: 0 },
    };
  }
  let mostWinsPlayer = { name: "", avatar: "", wins: 0 };
  let fewestMovesPlayer = { name: "", avatar: "", moves: Number.MAX_VALUE };

  // Find player with most wins
  let maxWins = -1;
  for (const [name, stats] of Object.entries(highscoreStats)) {
    if (stats.wins > maxWins) {
      mostWinsPlayer = { name, avatar: stats.avatar, wins: stats.wins };
      maxWins = stats.wins;
    }
  }
  // Find player with fewest moves
  let minMoves = Number.MAX_VALUE;
  for (const [name, stats] of Object.entries(highscoreStats)) {
    if (stats.moves < minMoves) {
      fewestMovesPlayer = { name, avatar: stats.avatar, moves: stats.moves };
      minMoves = stats.moves;
    }
  }
  return { mostWinsPlayer, fewestMovesPlayer };
};
export default getHighscore;
