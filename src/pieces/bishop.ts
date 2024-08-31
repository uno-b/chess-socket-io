import Piece from './piece';
import { isSameDiagonal, isPathClean } from '../helpers';
import { Square } from '@/types/common';

type Squares = Array<Square>;

const Bishop = (player: number) => {
  const iconUrl =
    player === 1
      ? 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg'
      : 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg';

  const piece = Piece({ player, iconUrl });

  const isMovePossible = (
    src: number,
    dest: number,
    squares: Squares
  ): boolean => {
    return (
      isPathClean(getSrcToDestPath(src, dest), squares) &&
      isSameDiagonal(src, dest)
    );
  };

  const getSrcToDestPath = (src: number, dest: number): number[] => {
    const path: number[] = [];
    let pathStart: number, pathEnd: number, incrementBy: number;

    if (src > dest) {
      pathStart = dest;
      pathEnd = src;
    } else {
      pathStart = src;
      pathEnd = dest;
    }

    if (Math.abs(src - dest) % 9 === 0) {
      incrementBy = 9;
      pathStart += 9;
    } else {
      incrementBy = 7;
      pathStart += 7;
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i);
    }
    return path;
  };

  return {
    player: piece.player,
    isMovePossible,
    getSrcToDestPath,
    style: piece.style,
  };
};

export default Bishop;
