import { GameType } from "../../types/types";

interface GameOptionsProps {
  setGameType: (gameType: GameType) => void;
}

const GameOptions = ({ setGameType }: GameOptionsProps) => {
  return (
    <section className="game-options">
      {/* <h1 className="game-title">Connect-4 Game</h1> */}
      <div className="buttons-wrapper">
        <button
          className="primary-btn"
          type="button"
          onClick={() => setGameType(GameType.Dual)}
        >
          1 VS 1
        </button>
        <button
          className="primary-btn"
          type="button"
          onClick={() => setGameType(GameType.Single)}
        >
          1 player
        </button>
        <button
          className="primary-btn"
          type="button"
          onClick={() => setGameType(GameType.AI)}
        >
          Cpu VS Cpu
        </button>
      </div>
    </section>
  );
};

export default GameOptions;
