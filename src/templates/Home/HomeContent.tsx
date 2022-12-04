import clsx from 'clsx';
import React, { FC, useMemo } from 'react';

import { Board, CategoryList, PostCardList } from '@/components/index';
import useCategory from '@/hooks/useCategory';
import { PostListQuery } from '@/types/index';

interface HomeContentProps {
  posts: PostListQuery['allMarkdownRemark']['nodes'];
}

const HomeContent: FC<HomeContentProps> = ({ posts }) => {
  const { category, updateCategory } = useCategory();

  const categories = useMemo(() => {
    const allCategories = posts.map(
      (postItem) => postItem.frontmatter.category
    );
    return Array.from(new Set(allCategories));
  }, [posts]);
  const filteredPosts = useMemo(() => {
    if (category === '전체') return posts;
    return posts.filter(
      (postItem) => postItem.frontmatter.category === category
    );
  }, [posts, category]);
  return (
    <div
      className={clsx('mx-auto max-w-3xl px-4 py-12', 'flex flex-col gap-10')}
    >
      <Board title="카테고리">
        <CategoryList
          category={category}
          list={categories}
          onCategory={updateCategory}
        />
      </Board>
      <Board title="게시글">
        <PostCardList list={filteredPosts} />
      </Board>
    </div>
  );
};

export default HomeContent;
