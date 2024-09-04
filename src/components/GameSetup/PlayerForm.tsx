import { GamePlayer, GameType, PlayerType } from "../../types/types";

interface PlayerFormProps {
  playerOne: GamePlayer;
  playerTwo: GamePlayer;
  setPlayerOne: (updater: (prevPlayer: GamePlayer) => GamePlayer) => void;
  setPlayerTwo: (updater: (prevPlayer: GamePlayer) => GamePlayer) => void;
  gameType: GameType;
}
const PlayerForm = ({
  playerOne,
  playerTwo,
  setPlayerOne,
  setPlayerTwo,
}: // gameType,
PlayerFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
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

            {/* <input
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
            /> */}
            <div className="computer-level">
              <label htmlFor="computerLevel">Computer Level:</label>
              <select
                id="computerLevel"
                value={playerTwo.playerType}
                onChange={(e) =>
                  setPlayerTwo((prevPlayerTwo) => ({
                    ...prevPlayerTwo,
                    name: "Computer",
                    playerType: parseInt(e.target.value) as PlayerType,
                  }))
                }
              >
                <option value={PlayerType.Easy}>Easy</option>
                <option value={PlayerType.Hard}>Hard</option>
              </select>
            </div>
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
