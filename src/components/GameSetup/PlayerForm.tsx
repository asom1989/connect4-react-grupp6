import { GamePlayer, GameType, PlayerType } from "../../types/types";

interface PlayerFormProps {
  playerOne: GamePlayer;
  playerTwo: GamePlayer;
  setPlayerOne: (updater: (prevPlayer: GamePlayer) => GamePlayer) => void;
  setPlayerTwo: (updater: (prevPlayer: GamePlayer) => GamePlayer) => void;
  setPlayerFormVisible: (toggel: boolean) => void;
  gameType: GameType;
}
const PlayerForm = ({
  playerOne,
  playerTwo,
  setPlayerOne,
  setPlayerTwo,
  setPlayerFormVisible,
  gameType,
}: PlayerFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlayerFormVisible(false);
  };

  return (
    <>
      <section className="player-form">
        <form onSubmit={handleSubmit}>
          <div className="palyer-form-input">
            {(gameType === GameType.Single || gameType === GameType.Dual) && (
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
            )}

            {gameType === GameType.Dual && (
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
            )}
            {gameType === GameType.AI && (
              <>
                <div className="computer-level">
                  <label htmlFor="computerLevel">Computer 1 Level:</label>
                  <select
                    id="computerLevel"
                    value={playerOne.playerType}
                    onChange={(e) =>
                      setPlayerOne((prevPlayerOne) => ({
                        ...prevPlayerOne,
                        name: "Computer 1",
                        playerType: parseInt(e.target.value) as PlayerType,
                      }))
                    }
                  >
                    <option value={PlayerType.Easy}>Easy</option>
                    <option value={PlayerType.Hard}>Hard</option>
                  </select>
                </div>
              </>
            )}

            {(gameType === GameType.Single || gameType === GameType.AI) && (
              <div className="computer-level">
                <label htmlFor="computer2Level">
                  Computer {gameType === GameType.Single ? "" : "2"} Level:
                </label>
                <select
                  id="computer2Level"
                  value={playerTwo.playerType}
                  onChange={(e) =>
                    setPlayerTwo((prevPlayerTwo) => ({
                      ...prevPlayerTwo,
                      name: "Computer 2",
                      playerType: parseInt(e.target.value) as PlayerType,
                    }))
                  }
                >
                  <option value={PlayerType.Easy}>Easy</option>
                  <option value={PlayerType.Hard}>Hard</option>
                </select>
              </div>
            )}
          </div>

          <button className="primary-btn" type="submit">
            Start Game
          </button>
        </form>
      </section>
    </>
  );
};
export default PlayerForm;
