import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

interface BoardProps {
  children: ReactNode;
  size?: number;
  title: ReactNode;
}

const Board: FC<BoardProps> = ({ children, size = 8, title }) => {
  return (
    <section
      className={clsx('flex flex-col items-start justify-start', `gap-${size}`)}
    >
      <h1 className="title-highlight text-3xl font-bold text-blue200">
        {title}
      </h1>
      {children}
    </section>
  );
};

export default Board;
