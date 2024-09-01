import React from 'react';

type SquarePropsType = {
  shade: string;
  style: React.CSSProperties | undefined;
  onClick: () => void;
};

export const Square: React.FC<SquarePropsType> = ({
  shade,
  style,
  onClick,
}) => {
  return (
    <button
      className={`border border-transparent float-left text-lg font-bold leading-8  mr-px mt-px p-0 text-center w-12 h-12 relative ${shade}`}
      onClick={onClick}
      style={style}
    ></button>
  );
};
