import styles from './options.module.css';

function Options() {
  return (
    <div className={styles.options}>
      <button>Undo</button>
      <button>End Game</button>
    </div>
  )
}

export default Options