// import { useState } from "react";
// import GameSetup from "./components/GameSetup/GameSetup";
// import { Setup } from "./types/types";
// import Board from "./classes/Board";
// import { ToastContainer } from "react-toastify";
import HighScore from "./components/WinnerStats/Highscore";

export default function App() {
  // const [gameState, setGameState] = useState<Setup | null>(null);
  // const handleGameState = (setup: Setup) => {
  //   setGameState(setup);
  // };

  // const handleQuit = () => {
  //   setGameState(null);
  // };

  return (
    <div>
      {/* <ToastContainer theme="colored" position="top-center" autoClose={1700} />
      {gameState ? (
        <Board onQuit={handleQuit} gameState={gameState} />
      ) : (
        <GameSetup setGameState={handleGameState} />
      )} */}
      <HighScore />
    </div>
  );
}
