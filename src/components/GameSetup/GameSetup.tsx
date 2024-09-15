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
    <>
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
      </main>
    </>
  );
}
