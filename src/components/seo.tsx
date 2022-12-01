import React, { ReactNode, FC } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

interface SeoProps {
  title: string;
  children?: ReactNode;
  description?: string;
}

const Seo: FC<SeoProps> = ({ description, title, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta content={metaDescription} name="description" />
      <meta content={title} property="og:title" />
      <meta content={metaDescription} property="og:description" />
      <meta content="website" property="og:type" />
      <meta content="summary" name="twitter:card" />
      <meta
        content={site.siteMetadata?.social?.twitter || ``}
        name="twitter:creator"
      />
      <meta content={title} name="twitter:title" />
      <meta content={metaDescription} name="twitter:description" />
      {children}
    </>
  );
};

export default Seo;
