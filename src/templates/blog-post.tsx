import clsx from 'clsx';
import { graphql, HeadProps, Link, PageProps } from 'gatsby';
import * as React from 'react';

import Layout from '@/components/layout';
import Seo from '@/components/seo';

interface DataProps {
  markdownRemark: {
    excerpt: string;
    frontmatter: {
      date: string;
      description: string;
      tags: null | string[];
      title: string;
    };
    html: string;
    id: string;
  };
  next: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
    };
  };
  previous: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
    };
  };
  site: {
    siteMetadata: {
      title?: string;
    };
  };
}

const BlogPostTemplate = ({
  data: { markdownRemark: post, next, previous, site },
}: PageProps<DataProps>) => {
  const siteTitle = site.siteMetadata?.title || `Title`;

  return (
    <Layout title={siteTitle}>
      <article itemScope className="mx-auto max-w-3xl px-4 pt-6">
        <header className="flex flex-col items-start justify-between gap-2">
          <h1 className="title-highlight text-4xl font-bold text-blue200">
            {post.frontmatter.title}
          </h1>
          <p className="text-blue200">{post.frontmatter.date}</p>
        </header>
        <hr className="my-6 h-px w-full border-gray100" />
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          className="gatsby-md"
        />
        {post.frontmatter.tags && (
          <>
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
            <hr className="my-6 h-px w-full border-gray100" />
          </>
        )}
      </article>
      <nav className="mx-auto mt-12 max-w-3xl px-4">
        <ul className="flex items-center justify-between gap-4">
          <li className="w-1/2">
            {previous && (
              <Link
                className={clsx(
                  'inline-flex flex-col items-start justify-center rounded-md p-3',
                  'h-16 w-full',
                  'bg-blue100 hover:bg-blue300',
                  'text-lg text-white100',
                  'transition-color duration-300 ease-out'
                )}
                rel="prev"
                to={previous.fields.slug}
              >
                <span className="text-sm text-white100 hover:text-inherit">
                  이전
                </span>
                {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li className="w-1/2">
            {next && (
              <Link
                className={clsx(
                  'inline-flex flex-col items-end justify-center rounded-md p-3',
                  'h-16 w-full',
                  'bg-blue100 hover:bg-blue300',
                  'text-lg text-white100',
                  'transition-color duration-300 ease-out'
                )}
                rel="next"
                to={next.fields.slug}
              >
                <span className="text-sm text-white100">다음</span>
                {next.frontmatter.title}
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export const Head = ({
  data: { markdownRemark: post },
}: HeadProps<DataProps>) => {
  return (
    <Seo
      description={post.frontmatter.description || post.excerpt}
      title={post.frontmatter.title}
    />
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
