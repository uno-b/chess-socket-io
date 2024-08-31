import React from 'react';
import { Square } from './square';

interface Piece {
  player: number;
  style: React.CSSProperties;
}

interface FallenSoldierBlockProps {
  whiteFallenSoldiers: Piece[];
  blackFallenSoldiers: Piece[];
}

const BoardRowStyle = `clear-both content-[''] block`;

export default function FallenSoldierBlock({
  whiteFallenSoldiers,
  blackFallenSoldiers,
}: FallenSoldierBlockProps) {
  const renderSquare = (piece: Piece, i: number) => {
    return <Square key={i} piece={piece} style={piece.style} />;
  };

  return (
    <div>
      <div className={BoardRowStyle}>
        {whiteFallenSoldiers.map((ws, index) => renderSquare(ws, index))}
      </div>
      <div className={BoardRowStyle}>
        {blackFallenSoldiers.map((bs, index) => renderSquare(bs, index))}
      </div>
    </div>
  );
}
