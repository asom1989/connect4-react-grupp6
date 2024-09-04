import { useState } from "react";
import { GameType } from "../../types/types";
import "./game-setup.css";
const GameSetup = () => {
  const [gameType, setGameType] = useState<GameType>(GameType.Dual);

  return (
    <>
      <section className="game-options">
        <h1>Connect-4 Game</h1>
        <div className="buttons-wrapper">
          <button type="button" onClick={() => setGameType(GameType.Dual)}>
            1 VS 1
          </button>
          <button type="button" onClick={() => setGameType(GameType.Single)}>
            1 player
          </button>
          <button type="button" onClick={() => setGameType(GameType.AI)}>
            Cpu VS Cpu
          </button>
        </div>
        <h1>{gameType}</h1>
      </section>
    </>
  );
};

export default GameSetup;
