import React, { FC } from 'react';

import Tag from '@/components/Tag';

interface PostSummaryProps {
  category: string;
  date: string;
  title: string;
}

const PostSummary: FC<PostSummaryProps> = ({ category, date, title }) => {
  return (
    <header className="flex flex-col items-start justify-between gap-4">
      <h1 className="break-keep text-4xl font-bold text-blue200">{title}</h1>
      <div className="flex items-center gap-2">
        <Tag type="dark">{date}</Tag>
        <Tag type="light">{category}</Tag>
      </div>
    </header>
  );
};

export default PostSummary;
