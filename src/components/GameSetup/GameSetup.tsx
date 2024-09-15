import "./game-setup.css";
import { useState } from "react";
import { Setup } from "../../types/types";
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
  playerOneMovesMade: 0,
  playerTwoMovesMade: 0,
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
        return;
      }
      if (setup.playerOneName !== "") {
        const newSetup = { ...setup, playerTwoName: player.name, playerTwoAvatar: player.image };
        handleStartGame(newSetup);
      }
    }
  }

  const handleChangeAI = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setSetup((prevSetup) => ({ ...prevSetup, [name]: +value }));
  };

  const handleStartGame = (gameSetup: Setup) => {
    setGameState(gameSetup);
  };

  return (
    <main className="main-gamesetup">
      {/* Game choice */}
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
              1 vs AI
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
              AI vs AI
            </button>
          </div>
        </section>
      )}
      {setup.gameType !== 0 && (
        <h1 className="setup-heading">
          {setup.gameType === 1
            ? setup.playerOneName === ""
              ? "Player 1"
              : "Player 2"
            : setup.gameType === 2
            ? setup.playerOneName === ""
              ? "Player 1"
              : "AI"
            : "AI"}
        </h1>
      )}

      {/* Player credentials */}
      {(setup.gameType === 1 && setup.playerTwoName === "") ||
      (setup.gameType === 2 && setup.playerOneName === "") ? (
        <section className="player-section">
          <PlayerInput setPlayer={handleSetPlayer} />
        </section>
      ) : null}

      {(setup.gameType === 2 && setup.playerOneName !== "") ||
      setup.gameType === 3 ? (
        <section className="ai-section">
          {setup.gameType === 3 && (
            <fieldset className="ai-fieldset">
              <h3 className="ai-h3">Player 1</h3>
              <p className="ai-p">Select difficulty level for AI</p>
              <div className="ai-radio-container">
                <label
                  className={`radio-label ${
                    setup.playerOneType === 2 ? "radio-label-active" : null
                  }`}
                  htmlFor="aiOneEasy"
                >
                  Easy
                  <input
                    type="radio"
                    className="ai-radio"
                    id="aiOneEasy"
                    name="playerOneType"
                    value="2"
                    checked={setup.playerOneType == 2}
                    onChange={handleChangeAI}
                  />
                </label>
                <label
                  className={`radio-label ${
                    setup.playerOneType === 3 ? "radio-label-active" : null
                  }`}
                  htmlFor="aiOneHard"
                >
                  Hard
                  <input
                    type="radio"
                    className="ai-radio"
                    id="aiOneHard"
                    name="playerOneType"
                    value="3"
                    checked={setup.playerOneType == 3}
                    onChange={handleChangeAI}
                  />
                </label>
              </div>
            </fieldset>
          )}
          <fieldset className="ai-fieldset">
            <h3 className="ai-h3">Player 2</h3>
            <p className="ai-p">Select difficulty level for AI</p>
            <div className="ai-radio-container">
              <label
                className={`radio-label ${
                  setup.playerTwoType === 2 ? "radio-label-active" : null
                }`}
                htmlFor="aiTwoEasy"
              >
                Easy
                <input
                  type="radio"
                  className="ai-radio"
                  id="aiTwoEasy"
                  name="playerTwoType"
                  value="2"
                  checked={setup.playerTwoType == 2}
                  onChange={handleChangeAI}
                />
              </label>
              <label
                className={`radio-label ${
                  setup.playerTwoType === 3 ? "radio-label-active" : null
                }`}
                htmlFor="aiTwoHard"
              >
                Hard
                <input
                  type="radio"
                  className="ai-radio"
                  id="aiTwoHard"
                  name="playerTwoType"
                  value="3"
                  checked={setup.playerTwoType == 3}
                  onChange={handleChangeAI}
                />
              </label>
            </div>
          </fieldset>
          <button
            type="button"
            className="start-game-button"
            onClick={() => handleStartGame(setup)}
          >
            Start Game
          </button>

        </section>
      ) : null}
      {/* Back button */}
      <div className="back-button-container">
        {setup.gameType !== 0 && (
          <button
            type="button"
            className="back-button"
            onClick={() => setSetup(initialGameSetup)}
          >
            Back
          </button>
        )}
      </div>
    </main>
  );
}
