import clsx from 'clsx';
import { Link } from 'gatsby';
import React, { FC } from 'react';

interface PageButtonProps {
  className?: string;
  link: string;
  title: string;
  type: 'prev' | 'next';
}

const PageButton: FC<PageButtonProps> = ({ className, link, title, type }) => {
  const isPrev = type === 'prev';
  return (
    <Link
      className={clsx(
        `inline-flex flex-col justify-center rounded-md p-3`,
        isPrev ? 'items-start' : 'items-end',
        'h-16 w-full',
        'bg-blue100 hover:bg-blue200',
        'text-lg text-white100',
        'transition-color duration-300 ease-out',
        className
      )}
      rel="prev"
      to={link}
    >
      <span className="text-sm text-white100 hover:text-inherit">
        {isPrev ? '이전' : '다음'}
      </span>
      {title}
    </Link>
  );
};

export default PageButton;
