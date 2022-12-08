import { Pieces } from "react-chessboard";

export interface Move { 
  from: string;
  to: string;
  piece: Pieces;
}