import clsx from 'clsx';
import { graphql, Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

import Layout from '@/components/Layout';
import Seo from '@/components/Seo';

const NotFoundPage = () => {
  return (
    <Layout>
      <section
        className={clsx(
          'flex flex-col items-center justify-center',
          'mx-auto h-[calc(100vh_-_192px)] max-w-3xl',
          'bg-blue200'
        )}
      >
        <StaticImage alt="404페이지 이미지" src="../images/404.png" />
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold text-white100 sm:text-base">
            원하시는 페이지를 찾을 수 없습니다
          </h1>
          <Link
            className="text-lg text-white100 hover:underline sm:text-sm"
            to="/"
          >
            돌아가기
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export const Head = () => {
  return <Seo title="404: Not Found" />;
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
