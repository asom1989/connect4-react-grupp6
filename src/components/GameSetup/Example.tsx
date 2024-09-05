import { useState } from "react";
import { GameType, PlayerType } from "../../types/types";
type Setup = {
  playerOneName: string;
  playerTwoName: string;
  playerOneType: PlayerType;
  playerTwoType: PlayerType;
  gameType: GameType;
}

export default function Example({setGameState}: {setGameState: (setup: Setup) => void}) {
  const [setup, setSetup] = useState({
    playerOneName: "namn 1",
    playerTwoName: "namn 2",
    playerOneType: 0,
    playerTwoType: 0,
    gameType: 0,
  });
  const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "playerOneName" || name === "playerTwoName") {
      setSetup({ ...setup, [name]: value });
    } else {
      // Strings to number
      const numValue = +value;
      setSetup({...setup, [name]: numValue})
    }  
  }
  return (
    <div>
      {/* Visar knappar för val av speltyp om gameType = 0(inte vald) */}
      {setup.gameType === 0 && (
        <>
          <p>Välj speltyp</p>
          <button
            onClick={() => setSetup({ ...setup, gameType: 1 })}
            type="button"
          >
            1 vs 1
          </button>
          <button
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
            1 vs Cpu
          </button>
          <button
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
            Cpu vs Cpu
          </button>
        </>
      )}
      {/* Om speltyp är vald visas formuläret */}
      {setup.gameType !== 0 && (
        <form>
          {/* Om speltyp 1 eller 2 är vald är spelaren människa, ska skriva in namn */}
          {(setup.gameType === 1 || setup.gameType === 2) && (
            <input
              type="text"
              name="playerOneName"
              value={setup.playerOneName}
              onChange={handleChange}
            />
          )}
          {/* Om speltyp 1 är vald är playerTwo också människa, ska skriva in namn */}
          {setup.gameType === 1 && (
            <input
              type="text"
              name="playerTwoName"
              value={setup.playerTwoName}
              onChange={handleChange}
            />
          )}
          {/* Om speltyp 3 är vald är även playerOne en dator och ska välja svårighetsgrad.*/}
          {setup.gameType === 3 && (
            <select
              value={setup.playerOneType}
              onChange={handleChange}
              name="playerOneType"
            >
              <option value="2">Easy</option>
              <option value="3">Hard</option>
            </select>
          )}
          {/* Om speltyp 2 eller 3 är vald är playerTwo en dator, ska välja svårighetsgrad */}
          {(setup.gameType === 3 || setup.gameType === 2) && (
            <select
              value={setup.playerTwoType}
              onChange={handleChange}
              name="playerTwoType"
            >
              <option value="2">Easy</option>
              <option value="3">Hard</option>
            </select>
          )}
          {/* Anropar funktion för att skicka värden till App komponentens state */}
          <button type="button" onClick={() => setGameState(setup)}>Klar</button>
        </form>
      )}
    </div>
  );
}