import Piece from './piece';
import { isSameRow, isSameColumn, isPathClean } from '../helpers';

type Squares = any[];

const Rook = (player: number) => {
  const iconUrl =
    player === 1
      ? 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg'
      : 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg';

  const piece = Piece({ player, iconUrl });

  const isMovePossible = (
    src: number,
    dest: number,
    squares: Squares
  ): boolean => {
    return (
      isPathClean(getSrcToDestPath(src, dest), squares) &&
      (isSameColumn(src, dest) || isSameRow(src, dest))
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

    if (Math.abs(src - dest) % 8 === 0) {
      incrementBy = 8;
      pathStart += 8;
    } else {
      incrementBy = 1;
      pathStart += 1;
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

export default Rook;
