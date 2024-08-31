'use client';

import React, { useState } from 'react';
import Board from './board';
import FallenSoldierBlock from './fallen-soldier-block';
import initialiseChessBoard from '../helpers/board-initialiser';
import { Piece } from '@/types/common';
import { Square } from '@/types/common';

export default function Game() {
  const [squares, setSquares] = useState<Square[]>(initialiseChessBoard());

  const [whiteFallenSoldiers, setWhiteFallenSoldiers] = useState<Piece[]>([]);
  const [blackFallenSoldiers, setBlackFallenSoldiers] = useState<Piece[]>([]);
  const [player, setPlayer] = useState<number>(1);
  const [sourceSelection, setSourceSelection] = useState<number>(-1);
  const [status, setStatus] = useState<string>('');
  const [turn, setTurn] = useState<string>('white');

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
      setSourceSelection(-1);
    } else {
      const newWhiteFallenSoldiers: Piece[] = [];
      const newBlackFallenSoldiers: Piece[] = [];
      const isDestEnemyOccupied = Boolean(squaresCopy[i]);
      const isMovePossible =
        squaresCopy[sourceSelection]?.isMovePossible(
          sourceSelection,
          i,
          isDestEnemyOccupied
        ) || false;

      if (isMovePossible) {
        if (squaresCopy[i] !== null) {
          if (squaresCopy[i]?.player === 1) {
            newWhiteFallenSoldiers.push(squaresCopy[i]);
          } else {
            newBlackFallenSoldiers.push(squaresCopy[i]);
          }
        }

        squaresCopy[i] = squaresCopy[sourceSelection];
        squaresCopy[sourceSelection] = null;

        const isCheckMe = isCheckForPlayer(squaresCopy, player);

        if (isCheckMe) {
          setStatus(
            'Wrong selection. Choose valid source and destination again. Now you have a check!'
          );
          setSourceSelection(-1);
        } else {
          const newPlayer = player === 1 ? 2 : 1;
          const newTurn = turn === 'white' ? 'black' : 'white';

          setSquares(squaresCopy);
          setWhiteFallenSoldiers((prev) => [
            ...prev,
            ...newWhiteFallenSoldiers,
          ]);
          setBlackFallenSoldiers((prev) => [
            ...prev,
            ...newBlackFallenSoldiers,
          ]);
          setPlayer(newPlayer);
          setStatus('');
          setTurn(newTurn);
          setSourceSelection(-1);
        }
      } else {
        setStatus(
          'Wrong selection. Choose valid source and destination again.'
        );
        setSourceSelection(-1);
      }
    }
  };

  const getKingPosition = (
    squares: Square[],
    player: number
  ): number | null => {
    return squares.reduce(
      (acc, curr, i) => acc || (curr?.player === player && curr && i),
      null
    );
  };

  const isCheckForPlayer = (squares: Square[], player: number): boolean => {
    const opponent = player === 1 ? 2 : 1;
    const playersKingPosition = getKingPosition(squares, player);

    const canPieceKillPlayersKing = (piece: Piece, i: number) =>
      piece.isMovePossible(playersKingPosition || -1, i, squares);

    return squares.reduce<boolean>((acc, curr, idx) => {
      if (curr && curr.player === opponent) {
        return acc || canPieceKillPlayersKing(curr, idx);
      }
      return acc;
    }, false);
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
            style={{ backgroundColor: turn }}
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
      >
        Source Code
      </a>
    </div>
  );
}
