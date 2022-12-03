import React, { FC, ReactNode } from 'react';

interface BoardProps {
  children: ReactNode;
  title: ReactNode;
}

const Board: FC<BoardProps> = ({ children, title }) => {
  return (
    <section className="flex flex-col items-start justify-start gap-8">
      <h1 className="title-highlight text-3xl font-bold text-blue200">
        {title}
      </h1>
      {children}
    </section>
  );
};

export default Board;
