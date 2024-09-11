interface ButtonProps {
  title: string;
  onClick: () => void;
}
const BoardButton: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      {title}
    </button>
  );
};

export default BoardButton;
