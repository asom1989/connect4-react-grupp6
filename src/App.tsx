import { useState } from "react";
import GameSetup from "./components/GameSetup/GameSetup";
import { Setup } from "./types/types";
// import Board from "./classes/Board";
// import StartGameButton from "./classes/StartGameButton";

export default function App() {
  // const [isBoardVisible, setBoardVisible] = useState(false);

  const [gameState, setGameState] = useState<Setup | null>(null);
  const handleGameState = (setup: Setup) => {
    console.log("Game setup completed:", setup);
    setGameState(setup);
  };

  return (
    <div>
      {/* {isBoardVisible ? (
        <Board setBoardVisible={setBoardVisible} />
      ) : (
        <StartGameButton setBoardVisible={setBoardVisible} />
      )} */}
      <GameSetup setGameState={handleGameState} />
      {gameState && (
        <div>
          <p>Game Type: {gameState.gameType}</p>
          <p>Player One: {gameState.playerOneName}</p>
          <p>Player One Type: {gameState.playerOneType}</p>
          <p>Player Two: {gameState.playerTwoName}</p>
          <p>Player Two Type: {gameState.playerTwoType}</p>
        </div>
      )}
    </div>
  );
}
