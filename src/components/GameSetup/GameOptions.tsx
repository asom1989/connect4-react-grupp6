import "./game-setup.css";
import { GameType } from "../../types/types";

interface GameOptionsProps {
  setGameType: (gameType: GameType) => void;
  setGameOptionsVisible: (toggle: boolean) => void;
  setPlayerFormVisible: (toggle: boolean) => void;
}

const GameOptions = ({
  setGameType,
  setGameOptionsVisible,
  setPlayerFormVisible,
}: GameOptionsProps) => {
  const toggleComponent = () => {
    setGameOptionsVisible(false);
    setPlayerFormVisible(true);
  };

  return (
    <section className="game-options">
      <h1 className="game-title">Connect-4 Game</h1>
      <div className="buttons-wrapper">
        <button
          className="primary-btn"
          type="button"
          onClick={() => {
            setGameType(GameType.Dual);
            toggleComponent();
          }}
        >
          1 VS 1
        </button>
        <button
          className="primary-btn"
          type="button"
          onClick={() => {
            setGameType(GameType.Single);
            toggleComponent();
          }}
        >
          1 player
        </button>
        <button
          className="primary-btn"
          type="button"
          onClick={() => {
            setGameType(GameType.AI);
            toggleComponent();
          }}
        >
          Cpu VS Cpu
        </button>
      </div>
    </section>
  );
};

export default GameOptions;
