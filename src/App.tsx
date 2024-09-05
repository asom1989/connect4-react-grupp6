import { useState } from "react";
import Board from "./classes/Board";
import StartGameButton from "./classes/StartGameButton";
// import GameSetup from "./components/GameSetup/GameSetup";
export default function App() {
  const [isBoardVisible, setBoardVisible] = useState(false);
  return (
    <div>
      {isBoardVisible ? (
        <Board setBoardVisible={setBoardVisible} />
      ) : (
        <StartGameButton setBoardVisible={setBoardVisible} />
      )}
      {/* <GameSetup /> */}
    </div>
  );
}
