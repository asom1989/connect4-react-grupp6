import "./game-setup.css";
import { useState } from "react";
import { GameType } from "../../types/types";
import GameOptions from "./GameOptions";
import { GamePlayer, PlayerType } from "../../types/types";
import PlayerForm from "./PlayerForm";
const GameSetup = () => {
  const [gameType, setGameType] = useState<GameType>(GameType.Dual);
  const [playerOne, setPlayerOne] = useState<GamePlayer>({
    name: "",
    playerType: PlayerType.Player,
  });
  const [playerTwo, setPlayerTwo] = useState<GamePlayer>({
    name: "",
    playerType: PlayerType.Player,
  });

  return (
    <article className="game-setup">
      <h1 className="game-title">Connect-4 Game</h1>
      <GameOptions setGameType={setGameType} />
      <PlayerForm
        playerOne={playerOne}
        playerTwo={playerTwo}
        setPlayerOne={setPlayerOne}
        setPlayerTwo={setPlayerTwo}
        gameType={gameType}
      />
      name 1:{playerOne.name}
      <br />
      type1 {playerOne.playerType}
      <br />
      name2:{playerTwo.name}
      <br />
      type2 {playerTwo.playerType}
    </article>
  );
};

export default GameSetup;
