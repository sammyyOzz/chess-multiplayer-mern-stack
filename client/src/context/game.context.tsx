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
  const [isPlayerTwo, setIsPlayerTwo] = useState(false);

  const updateGameId = (gameId: string) => setGameId(gameId);
  const updateIsGameCreator = (value: boolean) => setIsGameCreator(value);
  const updateIsPlayerTwo = () => setIsPlayerTwo(true);

  return (
    <GameContext.Provider value={{ 
      gameId,
      updateGameId,
      isGameCreator,
      updateIsGameCreator,
      isPlayerTwo,
      updateIsPlayerTwo
     }}>
      { children }
    </GameContext.Provider>
  )
}