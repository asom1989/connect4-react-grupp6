import { GamePlayer } from "../../types/types";

interface PlayerFormProps {
  playerOne: GamePlayer;
  playerTwo: GamePlayer;
  setPlayerOne: (updater: (prevPlayer: GamePlayer) => GamePlayer) => void;
  setPlayerTwo: (updater: (prevPlayer: GamePlayer) => GamePlayer) => void;
}
const PlayerForm = ({
  playerOne,
  playerTwo,
  setPlayerOne,
  setPlayerTwo,
}: PlayerFormProps) => {
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
