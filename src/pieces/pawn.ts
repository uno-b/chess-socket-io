import Piece from './piece';
import { isSameDiagonal } from '../helpers';

const Pawn = (player: number) => {
  const iconUrl =
    player === 1
      ? 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg'
      : 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg';

  const initialPositions: { [key: number]: number[] } = {
    1: [48, 49, 50, 51, 52, 53, 54, 55],
    2: [8, 9, 10, 11, 12, 13, 14, 15],
  };

  const piece = Piece({ player, iconUrl });

  const isMovePossible = (
    src: number,
    dest: number,
    isDestEnemyOccupied: boolean
  ): boolean => {
    if (player === 1) {
      if (
        (dest === src - 8 && !isDestEnemyOccupied) ||
        (dest === src - 16 &&
          !isDestEnemyOccupied &&
          initialPositions[1].indexOf(src) !== -1)
      ) {
        return true;
      } else if (
        isDestEnemyOccupied &&
        isSameDiagonal(src, dest) &&
        (dest === src - 9 || dest === src - 7)
      ) {
        return true;
      }
    } else if (player === 2) {
      if (
        (dest === src + 8 && !isDestEnemyOccupied) ||
        (dest === src + 16 &&
          !isDestEnemyOccupied &&
          initialPositions[2].indexOf(src) !== -1)
      ) {
        return true;
      } else if (
        isDestEnemyOccupied &&
        isSameDiagonal(src, dest) &&
        (dest === src + 9 || dest === src + 7)
      ) {
        return true;
      }
    }
    return false;
  };

  const getSrcToDestPath = (src: number, dest: number): number[] => {
    if (dest === src - 16) {
      return [src - 8];
    } else if (dest === src + 16) {
      return [src + 8];
    }
    return [];
  };

  return {
    player: piece.player,
    isMovePossible,
    getSrcToDestPath,
    style: piece.style,
  };
};

export default Pawn;
