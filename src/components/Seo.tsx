import { graphql, useStaticQuery } from 'gatsby';
import React, { FC, ReactNode } from 'react';

interface SeoProps {
  children?: ReactNode;
  description?: string;
  title: string;
}

const Seo: FC<SeoProps> = ({ children, description, title }) => {
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
