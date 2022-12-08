import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard, Pieces, Square } from "react-chessboard";
import { Move } from "@/types";

const game = new Chess();
let randomMoves: Array<string> = [];

export default function ChessGame() {
  const [position, setPosition] = useState(game.fen());

  const syncGameUI = () => setPosition(game.fen())

  useEffect(() => {
    const interval = setInterval(() => {
      randomMoves = game.moves() as Array<string>
      const move = randomMoves[Math.floor(Math.random() * randomMoves.length)]
      game.move(move);
      syncGameUI();
    }, 1000);

    return () => clearInterval(interval)
  }, [randomMoves])

  
  const movePiece = (move: Move) => {
    const result = game.move({...move})

    console.log(game.ascii())

    return result
  }

  const onDrop = (sourceSquare: Square, targetSquare: Square, piece: Pieces) => {
    const move = movePiece({
      from: sourceSquare,
      to: targetSquare,
      piece: piece,
    });

    // illegal move
    if (move === null) return false;

    syncGameUI()
    
    return true;
  }

  const undo = () => {
    game.undo()
    syncGameUI()
  }
  

  return (
    <>
      <Chessboard
        position={position}
        // onSquareClick={data => console.log(game.get(data))}
        onPieceDrop={onDrop}
        getPositionObject={data => console.log(data)}
        // boardOrientation="black"
      />
      <button onClick={undo}>undo</button>
    </>
  );
}