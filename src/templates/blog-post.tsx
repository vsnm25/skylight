import * as React from 'react';
import { Link, graphql, PageProps, HeadProps } from 'gatsby';

import clsx from 'clsx';
import Layout from '../components/layout';
import Seo from '../components/seo';

interface DataProps {
  site: {
    siteMetadata: {
      title?: string;
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
  next: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
    };
  };
  markdownRemark: {
    id: string;
    excerpt: string;
    html: string;
    frontmatter: {
      title: string;
      date: string;
      description: string;
    };
  };
}

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
}: PageProps<DataProps>) => {
  const siteTitle = site.siteMetadata?.title || `Title`;

  return (
    <Layout title={siteTitle}>
      <article itemScope className="mx-auto max-w-3xl px-4 pt-6">
        <header className="flex items-end justify-between">
          <h1 className="text-4xl font-bold">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <hr className="my-6 h-px w-full bg-blue200" />
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          className="gatsby-md"
        />
      </article>
      <nav className="mx-auto mt-12 max-w-3xl">
        <ul className="flex items-center justify-between gap-4">
          <li className="w-1/2">
            {previous && (
              <Link
                className={clsx(
                  'inline-flex flex-col items-start justify-center rounded-md p-3',
                  'h-16 w-full',
                  'bg-blue100 hover:bg-blue300',
                  'text-lg text-blue300 hover:text-white100',
                  'transition-color duration-300 ease-out'
                )}
                rel="prev"
                to={previous.fields.slug}
              >
                <span className="text-sm text-gray100 hover:text-inherit">
                  Prev
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
                  'text-lg  text-blue300 hover:text-white100',
                  'transition-color duration-300 ease-out'
                )}
                rel="next"
                to={next.fields.slug}
              >
                <span className="text-sm text-gray100">Next</span>
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
