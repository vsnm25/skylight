import React from 'react';

import { Board, Utterances } from '@/components/index';

const PostComment = () => {
  return (
    <Board size={6} title="댓글">
      <Utterances />
    </Board>
  );
};

export default PostComment;
