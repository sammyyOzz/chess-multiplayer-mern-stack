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
  const [gameId, setGameId] = useState('');
  const [isGameCreator, setIsGameCreator] = useState<null | boolean>(null);

  const updateGameId = (gameId: string) => setGameId(gameId);
  const updateIsGameCreator = (value: boolean) => setIsGameCreator(value);

  return (
    <GameContext.Provider value={{ 
      gameId,
      updateGameId,
      isGameCreator,
      updateIsGameCreator
     }}>
      { children }
    </GameContext.Provider>
  )
}