import React from 'react';
import { Square } from './square';
import { Square as SquareType } from '@/types/common';

interface SquareStyle {
  backgroundImage?: string;
  backgroundColor?: string;
}

interface BoardProps {
  squares: SquareType[] | null;
  onClick: (i: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares = [], onClick }) => {
  const renderSquare = (i: number, squareShade: string) => {
    return (
      <React.Fragment key={i}>
        <Square
          style={(squares && squares[i]?.style) || undefined}
          shade={squareShade}
          onClick={() => onClick(i)}
        />
      </React.Fragment>
    );
  };

  const board = [];
  for (let i = 0; i < 8; i++) {
    const squareRows = [];
    for (let j = 0; j < 8; j++) {
      const squareShade =
        (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
          ? 'bg-amber-700'
          : 'bg-amber-200';
      squareRows.push(renderSquare(i * 8 + j, squareShade));
    }
    board.push(
      <div className={`clear-both content-[''] block`} key={i}>
        {squareRows}
      </div>
    );
  }

  return <div>{board}</div>;
};

function isEven(num: number): boolean {
  return num % 2 === 0;
}

export default Board;
