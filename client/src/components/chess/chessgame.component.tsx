import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard, Pieces, Square } from "react-chessboard";
import { Move } from "@/types";
import socketIO from "socket.io-client";
import { useGameContext } from "@/context/game.context";

const ENDPOINT = process.env.NODE_ENV === 'production' 
    ? "/"
    : "http://localhost:5000"

let socket:any;

const game = new Chess();
let randomMoves: Array<string> = [];

export default function ChessGame() {
  const [position, setPosition] = useState(game.fen());

  const gameDetails = useGameContext()

  const syncGameUI = () => setPosition(game.fen())

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     randomMoves = game.moves() as Array<string>
  //     const move = randomMoves[Math.floor(Math.random() * randomMoves.length)]
  //     game.move(move);
  //     syncGameUI();
  //   }, 1000);

  //   return () => clearInterval(interval)
  // }, [randomMoves])

  useEffect(() => {
    socket = socketIO(ENDPOINT, { withCredentials: true });

    socket.emit('setup', { game: '123' });
    socket.on('message', (data: { game: string }) => {
      game.load(data.game);
      syncGameUI();
    })
  }, [])

  
  const movePiece = (move: Move) => {
    const result = game.move(move)

    // console.log(game.ascii())

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

    socket.emit('new_message', { 
      game: '123', 
      data: {
        game: game.fen()
      }
    })
    
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