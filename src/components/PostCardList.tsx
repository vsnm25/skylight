import clsx from 'clsx';
import { getImage } from 'gatsby-plugin-image';
import React, { FC } from 'react';

import { PostListQuery } from '@/types/index';

import PostCard from './PostCard';

interface PostCardListProps {
  list: PostListQuery['allMarkdownRemark']['nodes'];
}

const PostCardList: FC<PostCardListProps> = ({ list }) => {
  return (
    <ol
      className={clsx(
        'mx-auto max-w-3xl',
        'grid grid-cols-1 items-center justify-center gap-8'
      )}
    >
      {list.map((post) => {
        const title = post.frontmatter.title || post.fields.slug;
        const image = getImage(post.frontmatter.thumbnail);
        return (
          <PostCard
            key={post.fields.slug}
            category={post.frontmatter.category}
            date={post.frontmatter.date}
            description={post.excerpt}
            image={image}
            link={post.fields.slug}
            title={title}
          />
        );
      })}
    </ol>
  );
};

export default PostCardList;
