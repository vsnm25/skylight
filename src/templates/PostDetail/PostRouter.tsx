import React, { FC } from 'react';

import { PageButton } from '@/components/index';
import { PostDetailQuery } from '@/types/post';

interface PostRouterProps {
  next: PostDetailQuery['next'];
  previous: PostDetailQuery['previous'];
}

const PostRouter: FC<PostRouterProps> = ({ next, previous }) => {
  return (
    <nav className="mt-8">
      <ul className="flex items-center justify-between sm:flex-wrap">
        <li className="w-[calc(50%_-_10px)] sm:w-full">
          {previous && (
            <PageButton
              link={previous.fields.slug}
              title={previous.frontmatter.title}
              type="prev"
            />
          )}
        </li>
        <li className="w-1/2 sm:w-full">
          {next && (
            <PageButton
              className={previous && next && 'sm:mt-4'}
              link={next.fields.slug}
              title={next.frontmatter.title}
              type="next"
            />
          )}
        </li>
      </ul>
    </nav>
  );
};

export default PostRouter;
