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
    playerType: PlayerType.Player,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <article className="game-setup">
      {/* <h1>{gameType}</h1> */}
      {/* <GameOptions setGameType={setGameType} /> */}
      <h1 className="game-title">Connect-4 Game</h1>
      <section className="player-form">
        <form onSubmit={handleSubmit}>
          <div className="palyer-form-input">
            <input
              id="playerOneName"
              type="text"
              placeholder="Player 1 Name:"
              value={playerOne.name}
              onChange={(e) =>
                setPlayerOne((prevPlayerOne) => ({
                  ...prevPlayerOne,
                  name: e.target.value,
                }))
              }
            />

            <input
              id="playerTwoName"
              type="text"
              placeholder="Player 2 Name:"
              value={playerTwo.name}
              onChange={(e) =>
                setPlayerTwo((prevPlayerTwo) => ({
                  ...prevPlayerTwo,
                  name: e.target.value,
                }))
              }
            />
          </div>
          <button className="primary-btn" type="submit">
            Start Game
          </button>
        </form>
      </section>
      name 1:{playerOne.name}
      <br />
      name2:{playerTwo.name}
      <br />
      type1 {playerOne.playerType}
      <br />
      type2 {playerTwo.playerType}
    </article>
  );
};

export default GameSetup;
