import diagonalDictionaryTLBR from '../dictionaries/diagonalTopLeftBottomRight.json';
import diagonalDictionaryTRBL from '../dictionaries/diagonalTopRightBottomLeft.json';
import rowDictionary from '../dictionaries/row.json';
import columnDictionary from '../dictionaries/column.json';

type Dictionary = Record<number, Record<number, boolean>>;

const isSameRow = (src: number, dest: number): boolean => {
  return !!(rowDictionary[src] && rowDictionary[src][dest]);
};

const isSameColumn = (src: number, dest: number): boolean => {
  return !!(columnDictionary[src] && columnDictionary[src][dest]);
};

const isSameDiagonal = (src: number, dest: number): boolean => {
  return !!(
    (diagonalDictionaryTLBR[src] && diagonalDictionaryTLBR[src][dest]) ||
    (diagonalDictionaryTRBL[src] && diagonalDictionaryTRBL[src][dest])
  );
};

const isPathClean = (
  srcToDestPath: number[],
  squares: Record<number, boolean>
): boolean => {
  return srcToDestPath.reduce((acc, curr) => !squares[curr] && acc, true);
};

export { isSameRow, isSameColumn, isSameDiagonal, isPathClean };
