import { Pieces } from "react-chessboard";

export interface Move { 
  from: string;
  to: string;
  piece: Pieces;
}

export interface Game {
  player1: string;
  player2: string;
  gameId: string;
}

export interface GameContextType {
  game: Game;
  updateGameData: (data: Game) => void;
}