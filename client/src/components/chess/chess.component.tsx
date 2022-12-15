import styles from './chess.module.css';
import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard, Pieces, Square } from "react-chessboard";
import { Move } from "@/types";
import socketIO from "socket.io-client";
import { useGameContext } from "@/context/game.context";
import Options from "../options/options.component";
import { getBoardOrientation, isPlayerTurn } from '@/helpers';

const ENDPOINT = process.env.NODE_ENV === 'production' 
    ? "/"
    : "http://localhost:5000"

let socket:any;

const game = new Chess();
let randomMoves: Array<string> = [];

export default function ChessGame() {
  const [position, setPosition] = useState(game.fen());

  const controller = useGameContext()

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
    if (controller?.gameId) {
      socket = socketIO(ENDPOINT, { withCredentials: true });
      socket.emit('setup', controller?.gameId);
      socket.on('move_piece', (data: string) => {
        game.load(data);
        syncGameUI();
      })
      socket.on('player_two_joined', () => {
        controller?.updateIsPlayerTwo();
        console.log('player two has joined the game!');
      })

      if (controller?.isGameCreator === false) {
        socket.emit('player_two_joined', controller?.gameId)
      }
    }
  }, [controller?.gameId])

  const movePiece = (move: Move) => {
    if (controller?.isPlayerTwo && !isPlayerTurn(controller?.isGameCreator, game.turn())) return;
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

    socket.emit('new_move', { 
      gameId: controller?.gameId, 
      data: game.fen()
    })
    
    return true;
  }

  const undo = () => {
    game.undo()
    syncGameUI()
  }
  
  return (
    <div className={styles.container}>
      <Chessboard
        position={position}
        onPieceDrop={onDrop}
        // getPositionObject={data => console.log(data)}
        boardOrientation={getBoardOrientation(controller?.isGameCreator)}
      />
      <Options handleUndo={undo} />
    </div>
  );
}