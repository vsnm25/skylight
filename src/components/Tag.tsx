import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

const TAG_THEME = {
  dark: 'bg-black100',
  light: 'bg-blue200',
};

interface TagProps {
  children: ReactNode;
  type?: 'dark' | 'light';
}

const Tag: FC<TagProps> = ({ children, type = 'light' }) => {
  return (
    <span className={clsx('px-2 py-1 text-xs text-white100', TAG_THEME[type])}>
      {children}
    </span>
  );
};

export default Tag;
