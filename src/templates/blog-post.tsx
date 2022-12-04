import { graphql, HeadProps, PageProps } from 'gatsby';
import * as React from 'react';

import Board from '@/components/Board';
import Divider from '@/components/Divider';
import Layout from '@/components/Layout';
import PageButton from '@/components/PageButton';
import Seo from '@/components/Seo';
import Tag from '@/components/Tag';
import Utterances from '@/components/Utterances';

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
}

const BlogPostTemplate = ({
  data: { markdownRemark: post, next, previous },
}: PageProps<DataProps>) => {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 pb-10">
        <article className="pt-6">
          <header className="flex flex-col items-start justify-between gap-2">
            <h1 className="break-all text-4xl font-bold text-blue200">
              {post.frontmatter.title}
            </h1>
            <Tag type="dark">{post.frontmatter.date}</Tag>
          </header>
          <Divider />
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            className="gatsby-md"
          />
          <Divider />
          {post.frontmatter.tags && (
            <>
              <Board title="태그">
                <div className="flex gap-2">
                  {post.frontmatter.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </Board>
              <Divider />
            </>
          )}
        </article>
        {(previous || next) && (
          <>
            <nav className="mt-8">
              <ul className="flex items-center justify-between sm:flex-wrap">
                <li className="w-[calc(50%_-_10px)] sm:w-full">
                  {previous && (
                    <PageButton
                      link={previous.fields.slug}
                      title={previous.frontmatter.title}
                      type="prev"
                    />
                  )}
                </li>
                <li className="w-1/2 sm:w-full">
                  {next && (
                    <PageButton
                      className={previous && next && 'sm:mt-4'}
                      link={next.fields.slug}
                      title={next.frontmatter.title}
                      type="next"
                    />
                  )}
                </li>
              </ul>
            </nav>
            <Divider />
          </>
        )}
        <Board size={6} title="댓글">
          <Utterances />
        </Board>
      </div>
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
