import "./game-setup.css";
import { useState } from "react";
import { Setup } from "../../types/types";
//import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlayerInput from "../PlayerInput/PlayerInput";

interface GameSetupProps {
  setGameState: (setup: Setup) => void;
}
const initialGameSetup = {
  playerOneName: "",
  playerTwoName: "",
  playerOneAvatar: "",
  playerTwoAvatar: "",
  playerOneType: 1,
  playerTwoType: 1,
  gameType: 0,
};

type Player = {
  name: string;
  image: string;
}

export default function GameSetup({ setGameState }: GameSetupProps) {
  const [setup, setSetup] = useState(initialGameSetup);

  const handleSetPlayer = (player: Player) => {
    if (setup.gameType === 2) {
      setSetup((prevSetup) => ({ ...prevSetup, playerOneName: player.name, playerOneAvatar: player.image }));
    }
    if (setup.gameType === 1) {
      if (setup.playerOneName === "") {
        setSetup((prevSetup) => ({ ...prevSetup, playerOneName: player.name, playerOneAvatar: player.image }));
      }
      if (setup.playerOneName !== "") {
        setSetup((prevSetup) => ({ ...prevSetup, playerTwoName: player.name, playerTwoAvatar: player.image }));
      }
    }
  }
  // const handleChange = (
  //   e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.currentTarget;
  //   setSetup((prevSetup) => ({
  //     ...prevSetup,
  //     [name]:
  //       name === "playerOneName" || name === "playerTwoName" ? value : +value,
  //   }));
  // };

  // const handleStartGame = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const { playerOneName, gameType, playerTwoName } = setup;

  //   if ((gameType === 1 || gameType === 2) && playerOneName.trim() === "") {
  //     toast.error(`Player ${gameType === 2 ? "" : "1"} Name Is Required`);
  //     return false;
  //   } else if (
  //     (gameType === 1 || gameType === 2) &&
  //     playerOneName.trim().length < 3
  //   ) {
  //     toast.warning(
  //       `Player ${
  //         gameType === 2 ? "" : "1"
  //       } name must be at least 3 characters long  `
  //     );
  //     return false;
  //   }

  //   if (gameType === 1 && playerTwoName.trim() === "") {
  //     toast.error("Player 2 Name Is Required");
  //     return false;
  //   }
  //   if (gameType === 1 && playerTwoName.trim().length < 3) {
  //     toast.warning("Player 2 name must be at least 3 characters long");
  //     return false;
  //   }
  //   setGameState(setup);
  // };

  return (
    <>
      {setup.gameType === 0 && (
        <section className="game-options">
          <h1 className="game-title">Connect-4 Game</h1>
          <div className="buttons-wrapper">
            <button
              className="primary-btn"
              onClick={() => setSetup({ ...setup, gameType: 1 })}
              type="button"
            >
              1 vs 1
            </button>

            <button
              className="primary-btn"
              onClick={() =>
                setSetup({
                  ...setup,
                  gameType: 2,
                  playerTwoName: "Computer",
                  playerTwoType: 2,
                })
              }
              type="button"
            >
              1 player
            </button>

            <button
              className="primary-btn"
              onClick={() =>
                setSetup({
                  ...setup,
                  gameType: 3,
                  playerOneName: "Computer 1",
                  playerTwoName: "Computer 2",
                  playerOneType: 2,
                  playerTwoType: 2,
                })
              }
              type="button"
            >
              Cpu VS Cpu
            </button>
          </div>
        </section>
      )}
      {(setup.gameType === 1 || setup.gameType === 2) && (
        <section className="player-section">
          <h1 className="player-heading">
            {setup.playerOneName === "" ? "Player 1" : "Player 2"}
          </h1>
          <PlayerInput setPlayer={handleSetPlayer} />
        </section>
      )}

      {/* {setup.gameType !== 0 && (
        <section className="player-form">
          <h1 className="game-title">Connect-4 Game</h1>
          <form>
            <div className="palyer-form-input">
              {(setup.gameType === 1 || setup.gameType === 2) && (
                <>
                  <input
                    id="playerOneName"
                    type="text"
                    name="playerOneName"
                    placeholder={
                      setup.gameType === 1 ? "Player 1 Name:" : "Player Name:"
                    }
                    value={setup.playerOneName}
                    onChange={handleChange}
                  />
                </>
              )}
              {setup.gameType === 1 && (
                <input
                  id="playerTwoName"
                  type="text"
                  name="playerTwoName"
                  placeholder="Player 2 Name:"
                  value={setup.playerTwoName}
                  onChange={handleChange}
                />
              )}
              {setup.gameType === 3 && (
                <div className="computer-level">
                  <label htmlFor="computerLevel">Computer 1 Level:</label>
                  <select
                    id="computerLevel"
                    value={setup.playerOneType}
                    onChange={handleChange}
                    name="playerOneType"
                  >
                    <option value="2">Easy</option>
                    <option value="3">Hard</option>
                  </select>
                </div>
              )}
              {(setup.gameType === 2 || setup.gameType === 3) && (
                <div className="computer-level">
                  <label htmlFor="computer2Level">
                    Computer {setup.gameType === 2 ? "" : "2"} Level:
                  </label>
                  <select
                    id="computer2Level"
                    value={setup.playerTwoType}
                    onChange={handleChange}
                    name="playerTwoType"
                  >
                    <option value="2">Easy</option>
                    <option value="3">Hard</option>
                  </select>
                </div>
              )}
            </div>
            <button
              type="button"
              className="primary-btn"
              onClick={handleStartGame}
            >
              Start Game
            </button>
            <button
              type="button"
              className="primary-btn"
              onClick={() => setSetup(initialGameSetup)}
            >
              Back
            </button>
          </form>
        </section>
      )} */}
    </>
  );
}
