
interface GameSetupProps {
  setBoardVisible: (visible: boolean) => void; 
}

const StartGameButton = ({ setBoardVisible }: GameSetupProps) => {
  
  return (
    <button onClick={() => setBoardVisible(true)
    }> Start Game</button>
  )
};
export default StartGameButton;

