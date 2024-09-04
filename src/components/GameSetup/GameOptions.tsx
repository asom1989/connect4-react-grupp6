import { GameType } from "../../types/types";

interface GameOptionsProps {
  setGameType: (gameType: GameType) => void;
  setGameOptionsVisible: (toggel: boolean) => void;
  setPlayerFormVisible: (toggel: boolean) => void;
}

const GameOptions = ({
  setGameType,
  setGameOptionsVisible,
  setPlayerFormVisible,
}: GameOptionsProps) => {
  return (
    <section className="game-options">
      <h1 className="game-title">Connect-4 Game</h1>
      <div className="buttons-wrapper">
        <button
          className="primary-btn"
          type="button"
          onClick={() => {
            setGameType(GameType.Dual);
            setGameOptionsVisible(false);
            setPlayerFormVisible(true);
          }}
        >
          1 VS 1
        </button>
        <button
          className="primary-btn"
          type="button"
          onClick={() => {
            setGameType(GameType.Single);
            setGameOptionsVisible(false);
            setPlayerFormVisible(true);
          }}
        >
          1 player
        </button>
        <button
          className="primary-btn"
          type="button"
          onClick={() => {
            setGameType(GameType.AI);
            setGameOptionsVisible(false);
            setPlayerFormVisible(true);
          }}
        >
          Cpu VS Cpu
        </button>
      </div>
    </section>
  );
};

export default GameOptions;
