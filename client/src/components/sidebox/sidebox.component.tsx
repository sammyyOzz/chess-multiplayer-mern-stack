import { useState } from 'react'
import styles from './sidebox.module.css'
import { v4 as uuid } from 'uuid';
import { useGameContext } from '@/context/game.context';

function Sidebox() {
  const [gameId, setGameId] = useState("");

  const controller = useGameContext();

  const startGame = () => {
    if (!controller) return;
    
    const id = uuid()
    controller.updateGameId(id);
    controller.updateIsGameCreator(true);
  }

  const joinGame = (e: any) => {
    e.preventDefault();

    if (!controller) return;
    controller.updateGameId(gameId);
    controller.updateIsGameCreator(false);
  }

  return (
    <div className={styles.container}>
      <div>
        {!controller?.gameId ? (
          <>
            <button onClick={startGame}>
              Start a new game
            </button>
            <p>OR</p>
            <form onSubmit={joinGame}>
              <label>
                Join existing game by pasting the game code below
              </label>
              <input
                type="text"
                value={gameId}
                className={styles.input}
                onChange={e => setGameId(e.target.value)} 
                required
              />
              <button>Join game</button>
            </form>
          </>
        ) : (
          <>
            <p>Join the game via the code below:</p>
            <p id={styles["game-id"]}><strong>{controller?.gameId}</strong></p>
          </>
        )}
      </div>
    </div>
  )
}

export default Sidebox