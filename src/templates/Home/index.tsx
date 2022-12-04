import React, { FC } from 'react';

import { IntroductionBanner, Layout } from '@/components/index';
import { PostListQuery } from '@/types/index';

import HomeContent from './HomeContent';

interface HomeTemplateProps {
  posts: PostListQuery['allMarkdownRemark']['nodes'];
}

const HomeTemplate: FC<HomeTemplateProps> = ({ posts }) => {
  return (
    <Layout>
      <IntroductionBanner />
      <HomeContent posts={posts} />
    </Layout>
  );
};

export default HomeTemplate;
