import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface PostListQuery {
  allMarkdownRemark: {
    nodes: {
      excerpt: string;
      fields: {
        slug: string;
      };
      frontmatter: {
        category: string;
        date: string;
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

export interface PostDetailQuery {
  markdownRemark: {
    excerpt: string;
    frontmatter: {
      category: string;
      date: string;
      description: string;
      tags: null | string[];
      thumbnail: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
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
