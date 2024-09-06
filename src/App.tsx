import { useState } from "react";
import GameSetup from "./components/GameSetup/GameSetup";
import { Setup } from "./types/types";
import Board from "./classes/Board";

export default function App() {
  const [gameState, setGameState] = useState<Setup | null>(null);
  const handleGameState = (setup: Setup) => {
    console.log("Game setup completed:", setup);
    setGameState(setup);
  };

  return (
    <div>
      {gameState ? <Board /> : <GameSetup setGameState={handleGameState} />}
    </div>
  );
}
