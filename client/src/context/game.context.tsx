import React, { useContext, useState } from 'react';
import {
  Game,
  GameContextType
} from '@/types'


const GameContext = React.createContext<GameContextType | null>(null);

export const useGameContext = () => {
  return useContext(GameContext);
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [game, setGame] = useState<Game>({
    player1: '',
    player2: '',
    gameId: ''
  })

  const updateGameData = (data: Game) => {
    setGame(data)
  }

  return (
    <GameContext.Provider value={{ game, updateGameData }}>
      { children }
    </GameContext.Provider>
  )
}