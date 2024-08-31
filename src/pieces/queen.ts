import Piece from './piece';
import {
  isSameRow,
  isSameColumn,
  isSameDiagonal,
  isPathClean,
} from '../helpers';

type Squares = any[];

const Queen = (player: number) => {
  const iconUrl =
    player === 1
      ? 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg'
      : 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg';

  const piece = Piece({ player, iconUrl });

  const isMovePossible = (
    src: number,
    dest: number,
    squares: Squares
  ): boolean => {
    return (
      isPathClean(getSrcToDestPath(src, dest), squares) &&
      (isSameDiagonal(src, dest) ||
        isSameRow(src, dest) ||
        isSameColumn(src, dest))
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
    } else if (Math.abs(src - dest) % 9 === 0) {
      incrementBy = 9;
      pathStart += 9;
    } else if (Math.abs(src - dest) % 7 === 0) {
      incrementBy = 7;
      pathStart += 7;
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

export default Queen;
