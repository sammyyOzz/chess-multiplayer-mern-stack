import './App.css'
import { GameProvider } from '@/context/game.context'
import Game from './pages/game.page'

function App() {

  return (
    <GameProvider>
      <Game />
    </GameProvider>
  )
}

export default App
