import clsx from 'clsx';
import { graphql, HeadProps, PageProps } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
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
  const thumbnail = getImage(post.frontmatter.thumbnail);
  return (
    <Layout>
      {thumbnail && (
        <div
          className={clsx(
            'flex items-center justify-center',
            'w-full px-6 backdrop-blur-sm sm:h-auto',
            'bg-blue100'
          )}
        >
          <GatsbyImage
            alt="썸네일"
            className={clsx(
              'max-h-80 w-full max-w-3xl',
              'shadow-[0_2px_15px_0_rgba(0,0,0,0.1)]'
            )}
            image={thumbnail}
            objectFit="contain"
          />
        </div>
      )}
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
        thumbnail {
          childImageSharp {
            gatsbyImageData(
              width: 800
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              quality: 90
            )
          }
        }
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
