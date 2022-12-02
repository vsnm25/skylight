import * as React from 'react';
import { Link, graphql, PageProps } from 'gatsby';

import clsx from 'clsx';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import Bio from '../components/bio';
import Layout from '../components/layout';
import Seo from '../components/seo';

interface DataProps {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  allMarkdownRemark: {
    nodes: {
      excerpt: string;
      fields: {
        slug: string;
      };
      frontmatter: {
        title?: string;
        date: string;
        tags: null | string[];
        thumbnail: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
      };
    }[];
  };
}

const BlogIndex = ({ data }: PageProps<DataProps>) => {
  const siteTitle = data.site.siteMetadata?.title || 'Title';
  const posts = data.allMarkdownRemark.nodes;

  if (posts.length === 0) {
    return (
      <Layout title={siteTitle}>
        <Bio />
      </Layout>
    );
  }

  return (
    <Layout title={siteTitle}>
      <Bio />
      <div className="mx-auto max-w-3xl px-4 pt-8 ">
        <h1 className="title-highlight inline-flex text-2xl font-bold text-blue200 ">
          게시글
        </h1>
      </div>
      <ol
        className={clsx(
          'mx-auto max-w-3xl px-4 pt-8',
          'grid grid-cols-1 items-center justify-center gap-8'
        )}
      >
        {posts.map((post) => {
          const title = post.frontmatter.title || post.fields.slug;
          const image = getImage(post.frontmatter.thumbnail);
          return (
            <li key={post.fields.slug}>
              <article
                className={clsx(
                  'flex sm:flex-col',
                  'items-center gap-2',
                  'overflow-hidden',
                  'relative',
                  'border border-gray-200'
                )}
              >
                {image && (
                  <div className="flex-shrink-0 overflow-hidden sm:w-full">
                    <Link to={post.fields.slug}>
                      <GatsbyImage
                        alt="썸네일 이미지"
                        className={clsx(
                          'w-56 sm:w-full',
                          'h-56',
                          'hover:scale-110',
                          'transform-gpu duration-300 ease-out'
                        )}
                        image={image}
                        objectFit="cover"
                      />
                    </Link>
                  </div>
                )}
                <div className="flex flex-col gap-4 p-4">
                  <span className="text-blue200">{post.frontmatter.date}</span>
                  <div className="flex flex-col gap-2">
                    <header>
                      <h2 className="text-2xl font-bold text-blue200">
                        <Link to={post.fields.slug}>
                          <span>{title}</span>
                        </Link>
                      </h2>
                    </header>
                    <section>
                      <p className="line-clamp-3">{post.excerpt}</p>
                    </section>
                  </div>
                  {post.frontmatter.tags && (
                    <div className="flex gap-2">
                      {post.frontmatter.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-blue100 px-2 py-1 text-xs text-white100"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ol>
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
