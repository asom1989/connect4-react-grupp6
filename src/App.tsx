import { useState } from "react";
import GameSetup from "./components/GameSetup/GameSetup";
import { Setup } from "./types/types";

export default function App() {
  const [gameState, setGameState] = useState<Setup | null>(null);

  const handleGameState = (setup: Setup) => {
    console.log("Game setup completed:", setup);
    setGameState(setup);
  };

  return (
    <div>
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
