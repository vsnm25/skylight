import { graphql, PageProps } from 'gatsby';
import React from 'react';

import Seo from '@/components/seo';
import HomeTemplate from '@/templates/Home';
import { PostListQuery } from '@/types/index';

const BlogIndex = ({ data }: PageProps<PostListQuery>) => {
  const posts = data.allMarkdownRemark.nodes;
  return <HomeTemplate posts={posts} />;
};

export default BlogIndex;

export const Head = () => {
  return <Seo title="All posts" />;
};

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { category: { ne: null } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          category
          thumbnail {
            childImageSharp {
              gatsbyImageData(
                width: 400
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                quality: 90
              )
            }
          }
        }
      }
    }
  }
`;
