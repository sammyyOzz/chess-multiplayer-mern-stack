import styles from './options.module.css';

interface OptionsProps {
  handleUndo: () => void;
}

function Options({ handleUndo }: OptionsProps) {
  return (
    <div className={styles.options}>
      <button onClick={handleUndo}>Undo</button>
      <button>End Game</button>
    </div>
  )
}

export default Options