import React from 'react';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';

interface DataProps {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const NotFoundPage = ({ data, location }: PageProps<DataProps>) => {
  const siteTitle = data.site.siteMetadata.title;
  return (
    <Layout location={location} title={siteTitle}>
      <h1>404: 원하시는 페이지를 찾을 수 없습니다</h1>
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
