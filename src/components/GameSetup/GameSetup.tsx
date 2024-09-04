import { useState } from "react";
// import { GameType } from "../../types/types";
import "./game-setup.css";
import { GamePlayer, PlayerType } from "../../types/types";
// import GameOptions from "./GameOptions";
const GameSetup = () => {
  // const [gameType, setGameType] = useState<GameType>(GameType.Dual);

  const [playerOne, setPlayerOne] = useState<GamePlayer>({
    name: "",
    playerType: PlayerType.Player,
  });

  const [playerTwo, setPlayerTwo] = useState<GamePlayer>({
    name: "",
    playerType: PlayerType.Easy,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <article className="game-setup">
      {/* <h1>{gameType}</h1> */}
      {/* <GameOptions setGameType={setGameType} /> */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="playerOneName">Player 1 Name:</label>
          <input
            id="playerOneName"
            type="text"
            value={playerOne.name}
            onChange={(e) =>
              setPlayerOne((prevPlayerOne) => ({
                ...prevPlayerOne,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="playerTwoName">Player 2 Name:</label>
          <input
            id="playerTwoName"
            type="text"
            value={playerTwo.name}
            onChange={(e) =>
              setPlayerTwo((prevPlayerTwo) => ({
                ...prevPlayerTwo,
                name: e.target.value,
              }))
            }
          />
        </div>
        <button type="submit">Start Game</button>
      </form>
      name 1:{playerOne.name}
      <br />
      name2:{playerTwo.name}
      <br />
      type {playerOne.playerType}
    </article>
  );
};

export default GameSetup;
