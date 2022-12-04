import { graphql, HeadProps, PageProps } from 'gatsby';
import * as React from 'react';

import { Divider, Layout, Seo } from '@/components/index';
import { PostDetailQuery } from '@/types/index';

import PostComment from './PostComment';
import PostContent from './PostContent';
import PostRouter from './PostRouter';
import PostSummary from './PostSummary';
import PostTag from './PostTag';

const PostDetailTemplate = ({
  data: { markdownRemark: post, next, previous },
}: PageProps<PostDetailQuery>) => {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 pb-10">
        <article className="pt-6">
          <PostSummary
            category={post.frontmatter.category}
            date={post.frontmatter.date}
            title={post.frontmatter.title}
          />
          <Divider />
          <PostContent content={post.html} />
          <Divider />
          {post.frontmatter.tags && (
            <>
              <PostTag tags={post.frontmatter.tags} />
              <Divider />
            </>
          )}
        </article>
        {(previous || next) && (
          <>
            <PostRouter next={next} previous={previous} />
            <Divider />
          </>
        )}
        <PostComment />
      </div>
    </Layout>
  );
};

export const Head = ({
  data: { markdownRemark: post },
}: HeadProps<PostDetailQuery>) => {
  return (
    <Seo
      description={post.frontmatter.description || post.excerpt}
      title={post.frontmatter.title}
    />
  );
};

export default PostDetailTemplate;

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
        category
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
