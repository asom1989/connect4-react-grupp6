import { useEffect, useState } from "react";
import { GamePlayer, GameType, PlayerType } from "./types/types";
import GameOptions from "./components/GameSetup/GameOptions";
import PlayerForm from "./components/GameSetup/PlayerForm";
import Board from "./classes/Board";

const playerInitialValue = {
  name: "",
  playerType: PlayerType.Player,
};

const App = () => {
  const [gameType, setGameType] = useState<GameType>(GameType.Dual);
  const [playerOne, setPlayerOne] = useState<GamePlayer>(playerInitialValue);
  const [playerTwo, setPlayerTwo] = useState<GamePlayer>(playerInitialValue);
  const [gameOptionsVisible, setGameOptionsVisible] = useState(true);
  const [playerFormVisible, setPlayerFormVisible] = useState(false);
  const [gameVisible, setGameVisible] = useState(false);

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
          setGameVisible={setGameVisible}
        />
      )}
      {gameVisible && <Board />}
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

export default App;
