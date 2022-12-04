import clsx from 'clsx';
import { graphql, PageProps } from 'gatsby';
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import * as React from 'react';

import IntroDuctionBanner from '@/components/IntroDuctionBanner';
import Layout from '@/components/Layout';
import PostCard from '@/components/PostCard';
import Seo from '@/components/Seo';

interface DataProps {
  allMarkdownRemark: {
    nodes: {
      excerpt: string;
      fields: {
        slug: string;
      };
      frontmatter: {
        date: string;
        tags: null | string[];
        thumbnail: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
        title?: string;
      };
    }[];
  };
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const BlogIndex = ({ data }: PageProps<DataProps>) => {
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout>
      <IntroDuctionBanner />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="title-highlight mb-8 inline-flex text-2xl font-bold text-blue200">
          게시글
        </h1>
        <ol
          className={clsx(
            'mx-auto max-w-3xl',
            'grid grid-cols-1 items-center justify-center gap-8'
          )}
        >
          {posts.map((post) => {
            const title = post.frontmatter.title || post.fields.slug;
            const image = getImage(post.frontmatter.thumbnail);
            return (
              <PostCard
                key={post.fields.slug}
                date={post.frontmatter.date}
                description={post.excerpt}
                image={image}
                link={post.fields.slug}
                tags={post.frontmatter.tags}
                title={title}
              />
            );
          })}
        </ol>
      </div>
    </Layout>
  );
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
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
          thumbnail {
            childImageSharp {
              gatsbyImageData(
                width: 400
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`;
