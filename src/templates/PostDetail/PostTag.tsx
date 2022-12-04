import React from 'react';

import { Board, Tag } from '@/components/index';

const PostTag = ({ tags }: { tags: string[] }) => {
  return (
    <Board title="태그">
      <div className="flex gap-2">
        {tags.map((tag) => (
          <Tag key={tag}># {tag}</Tag>
        ))}
      </div>
    </Board>
  );
};

export default PostTag;
