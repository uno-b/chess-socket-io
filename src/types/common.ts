export type Piece = {
  player: number;
  style: React.CSSProperties;
  isMovePossible: (
    src: number,
    dest: number,
    isDestEnemyOccupied: boolean
  ) => boolean;
};

export type Square = Piece | null;
