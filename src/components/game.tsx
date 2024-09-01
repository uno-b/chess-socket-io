'use client';

import React, { useState } from 'react';
import { Socket } from 'socket.io-client';

import Board from './board';
import FallenSoldierBlock from './fallen-soldier-block';
import { Piece } from '@/types/common';
import { Square } from '@/types/common';

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
      <div>
        <div>
          <Board squares={squares} onClick={(i) => handleClick(i)} />
        </div>
        <div className='mt-10'>
          <h3>Turn</h3>
          <div
            className='w-8 h-8 border border-black mb-2'
            style={{ backgroundColor: turn === 1 ? 'white' : 'black' }}
          ></div>
          <div className='mt-5 min-h-[50px]'>{status}</div>

          <div className='mt-5 min-h-[50px]'>
            <FallenSoldierBlock
              whiteFallenSoldiers={whiteFallenSoldiers}
              blackFallenSoldiers={blackFallenSoldiers}
            />
          </div>
        </div>
      </div>

      <a
        href='https://github.com/uno-b/codeme-assignment'
        target='_blank'
        rel='noopener noreferrer'
        className='underline hover-text-gray-300'
      >
        Source Code
      </a>
    </div>
  );
};

export default Game;
