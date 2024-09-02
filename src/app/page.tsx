'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import Game from '../components/game';

import { FaChess } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import { GameState, Piece, Square } from '@/types/common';

export default function Home() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [note, setNote] = useState('');

  // Game states
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [gameId, setGameId] = useState<string | null>(null);
  const [squares, setSquares] = useState<Square[] | null>(null);
  const [whiteFallenSoldiers, setWhiteFallenSoldiers] = useState<Piece[]>([]);
  const [blackFallenSoldiers, setBlackFallenSoldiers] = useState<Piece[]>([]);
  const [player, setPlayer] = useState<1 | 2 | null>(null);
  const [status, setStatus] = useState<string>('');
  const [turn, setTurn] = useState<1 | 2 | null>(null);

  useEffect(() => {
    if (socket === null) {
      setSocket(io(process.env.NEXT_PUBLIC_BACKEND_URL!));
      console.log('initializing');
    }

    if (!socket) return;

    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    socket.on('gameStart', ({ gameId, player }) => {
      setGameId(gameId);
      setPlayer(player);
      setStatus(`Game started! You are player ${player}.`);
    });

    socket.on('gameState', (game: GameState) => {
      setSquares(game.squares);
      setWhiteFallenSoldiers(game.whiteFallenSoldiers);
      setBlackFallenSoldiers(game.blackFallenSoldiers);
      setTurn(game.turn);
      setStatus(game.statusMsg);
    });

    socket.on('error', (msg) => {
      setStatus(msg);
    });

    socket.on(
      'gameStart',
      ({ gameId, player }: { gameId: string; player: 1 | 2 }) => {
        setPlayer(player);
        setGameId(gameId);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (!gameStart && gameId && squares) {
      setGameStart(true);
    }
  }, [gameId, squares]);

  const handleClick = (e) => {
    e.preventDefault();

    socket.emit('findGame');

    socket.on('waitingForOpponent', () => {
      setNote('Waiting for an opponent...');
    });
  };

  return (
    <main className='flex min-h-screen flex-col items-center p-24 bg-gradient-to-r from-slate-600 to-slate-800 shadow-lg'>
      {gameStart ? (
        <div className='p-10 border rounded text-black bg-white'>
          <Game
            gameId={gameId}
            socket={socket}
            squares={squares}
            whiteFallenSoldiers={whiteFallenSoldiers}
            blackFallenSoldiers={blackFallenSoldiers}
            player={player}
            status={status}
            setStatus={setStatus}
            turn={turn}
          />
        </div>
      ) : (
        <div className='w-[500px] h-[500px] border rounded bg-white p-10 flex flex-col justify-center items-center'>
          <div className='flex space-x-4 mx-auto w-fit font-bold text-3xl'>
            <h1>Join game</h1>
            <FaChess />
          </div>
          <button
            onClick={handleClick}
            className='mx-auto bg-black text-white px-8 py-2 rounded w-fit block mt-10 transition-colors hover:bg-gray-700 shadow-md'
          >
            Join
          </button>

          <div className={`w-full ${note ? '' : 'invisible'}`}>
            <div className='w-full border-b-2 mt-10 mb-4' />
            <div className='flex flex-row space-x-4 items-center justify-center text-sm text-gray-500'>
              <FaMessage size={20} />
              <p className=''>{note}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
