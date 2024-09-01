'use client';

import React, { useState } from 'react';
import { Socket } from 'socket.io-client';

import Board from './board';
import FallenSoldierBlock from './fallen-soldier-block';
import { Piece } from '@/types/common';
import { Square } from '@/types/common';

import { CiSquareInfo } from 'react-icons/ci';

type GamePropsType = {
  socket: Socket;
  gameId: string;
  squares: Square[];
  whiteFallenSoldiers: Piece[];
  blackFallenSoldiers: Piece[];
  player: 1 | 2;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  turn: 1 | 2;
};

const Game = ({
  socket,
  gameId,
  squares,
  whiteFallenSoldiers,
  blackFallenSoldiers,
  player,
  status,
  setStatus,
  turn,
}: GamePropsType) => {
  const [sourceSelection, setSourceSelection] = useState<number>(-1);

  const handleClick = (i: number) => {
    if (player !== turn) {
      setStatus(`Wait for your opponent's move`);

      return;
    }

    const squaresCopy = [...squares] as Square[];

    if (sourceSelection === -1) {
      if (!squaresCopy[i] || squaresCopy[i].player !== player) {
        setStatus('Wrong selection. Choose player ' + player + ' pieces.');
        if (squaresCopy[i]) {
          squaresCopy[i].style = {
            ...squaresCopy[i].style,
            backgroundColor: '',
          };
        }
      } else {
        squaresCopy[i].style = {
          ...squaresCopy[i].style,
          backgroundColor: 'RGB(111,143,114)',
        };
        setStatus('Choose destination for the selected piece');
        setSourceSelection(i);
      }
      return;
    }

    squaresCopy[sourceSelection].style = {
      ...squaresCopy[sourceSelection].style,
      backgroundColor: '',
    };

    if (squaresCopy[i] && squaresCopy[i].player === player) {
      setStatus('Wrong selection. Choose valid source and destination again.');
    } else {
      // Emit to backend
      socket.emit('makeMove', {
        gameId: gameId,
        move: { source: sourceSelection, dest: i },
      });
    }

    setSourceSelection(-1);
  };

  return (
    <div>
      <div className='flex space-x-10'>
        <Board squares={squares} onClick={(i) => handleClick(i)} />
        <div>
          <h1 className='mb-20'>
            You&apos;re playing as{' '}
            <span className='font-bold'>
              {player === 1 ? 'white' : 'black'}
            </span>
          </h1>
          <div className='flex flex-row space-x-4 justify-center items-center'>
            <h3 className='font-bold text-xl  h-fit'>Turn</h3>
            <div
              className='w-4 h-4 border border-black rounded-full bg-green-300'
              style={{ backgroundColor: turn === 1 ? 'white' : 'black' }}
            ></div>
          </div>
        </div>
      </div>

      <div
        className={`my-10 flex flex-row space-x-4 items-center ${
          status ? '' : 'invisible'
        }`}
      >
        <CiSquareInfo className='text-black' size={30} />
        <p>{status}</p>
      </div>

      <div
        className={`min-h-[50px] border mb-10 ${
          whiteFallenSoldiers.length === 0 &&
          blackFallenSoldiers.length === 0 &&
          'invisible'
        }`}
      >
        <FallenSoldierBlock
          whiteFallenSoldiers={whiteFallenSoldiers}
          blackFallenSoldiers={blackFallenSoldiers}
        />
      </div>

      <a
        href='https://github.com/uno-b/codeme-assignment'
        target='_blank'
        rel='noopener noreferrer'
        className='underline hover-text-gray-300 block mx-auto w-fit'
      >
        Source Code
      </a>
    </div>
  );
};

export default Game;
