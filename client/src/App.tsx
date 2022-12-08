import './App.css'
import ChessGame from '@/components/chess/chessgame.component'
import { GameProvider } from '@/context/game.context'

function App() {

  return (
    <div className="App">
      <GameProvider>
        <ChessGame />
      </GameProvider>
    </div>
  )
}

export default App
