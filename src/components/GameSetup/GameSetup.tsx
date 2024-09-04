import { useState } from "react";
import { GameType } from "../../types/types";
import "./game-setup.css";
import GameOptions from "./GameOptions";
const GameSetup = () => {
  const [gameType, setGameType] = useState<GameType>(GameType.Dual);

  return (
    <article className="game-setup">
      <h1>{gameType}</h1>
      <GameOptions setGameType={setGameType} />
    </article>
  );
};

export default GameSetup;
