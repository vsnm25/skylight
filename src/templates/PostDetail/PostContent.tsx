import React from 'react';

const PostContent = ({ content }: { content: string }) => {
  return (
    <section
      dangerouslySetInnerHTML={{ __html: content }}
      className="gatsby-md"
    />
  );
};

export default PostContent;
