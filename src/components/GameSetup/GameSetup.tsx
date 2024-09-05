import "./game-setup.css";
import { useEffect, useState } from "react";
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
  const [gameOptionsVisible, setGameOptionsVisible] = useState(true);
  const [playerFormVisible, setPlayerFormVisible] = useState(false);

  useEffect(() => {
    switch (gameType) {
      case GameType.Single:
        setPlayerTwo({
          name: "Computer",
          playerType: PlayerType.Easy,
        });
        break;

      case GameType.AI:
        setPlayerOne({
          name: "Computer 1",
          playerType: PlayerType.Easy,
        });
        setPlayerTwo({
          name: "Computer 2",
          playerType: PlayerType.Easy,
        });
        break;

      default:
        setPlayerOne({ name: "", playerType: PlayerType.Player });
        setPlayerTwo({
          name: "",
          playerType: PlayerType.Player,
        });
        break;
    }
  }, [gameType]);

  return (
    <article className="game-setup">
      {gameOptionsVisible && (
        <GameOptions
          setGameType={setGameType}
          setGameOptionsVisible={setGameOptionsVisible}
          setPlayerFormVisible={setPlayerFormVisible}
        />
      )}
      {playerFormVisible && (
        <PlayerForm
          playerOne={playerOne}
          playerTwo={playerTwo}
          setPlayerOne={setPlayerOne}
          setPlayerTwo={setPlayerTwo}
          gameType={gameType}
          setPlayerFormVisible={setPlayerFormVisible}
          setGameOptionsVisible={setGameOptionsVisible}
        />
      )}
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
