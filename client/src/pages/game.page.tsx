import ChessGame from '@/components/chess/chess.component'
import Sidebox from '@/components/sidebox/sidebox.component'
import styles from './game.module.css'

function Game() {
  return (
    <div className={styles.container}>
      <div className={styles['chess-container']}>
        <ChessGame />
      </div>

      <div className={styles['side-container']}>
        <Sidebox />
      </div>
    </div>
  )
}

export default Game