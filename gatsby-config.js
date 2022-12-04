const path = require('path');
/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      options: {
        alias: {
          '@/components': path.resolve(__dirname, 'src/components'),
          '@/hooks': path.resolve(__dirname, 'src/hooks'),
          '@/templates': path.resolve(__dirname, 'src/templates'),
          '@/types': path.resolve(__dirname, 'src/types'),
        },
        extensions: ['js'],
      },
      resolve: `gatsby-plugin-alias-imports`,
    },
    {
      options: {
        classMap: {
          'heading[depth=1]': 'text-2xl',
          'heading[depth=2]': 'text-xl',
          paragraph: 'text-base',
        },
      },
      resolve: `gatsby-remark-classes`,
    },
    {
      options: {
        enableListener: true,
        preconnect: [
          'https://fonts.googleapis.com',
          'https://fonts.gstatic.com',
        ],
        web: [
          {
            file: 'https://fonts.googleapis.com/css2?family=Gothic+A1:wght@400;500;700&display=swap',
            name: 'Open Sans',
          },
        ],
      },
      resolve: 'gatsby-omni-font-loader',
    },
    {
      options: {
        name: 'blog',
        path: `${__dirname}/content/blog`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        plugins: [
          {
            options: {
              maxWidth: 630,
            },
            resolve: 'gatsby-remark-images',
          },
          {
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
            resolve: 'gatsby-remark-responsive-iframe',
          },
          {
            resolve: 'gatsby-remark-vscode',
          },
        ],
      },
      resolve: 'gatsby-transformer-remark',
    },
    {
      options: {
        feeds: [
          {
            output: '/rss.xml',
            query: `{
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }`,
            serialize: ({ query: { allMarkdownRemark, site } }) => {
              return allMarkdownRemark.nodes.map((node) => {
                return {
                  ...node.frontmatter,
                  custom_elements: [{ 'content:encoded': node.html }],
                  date: node.frontmatter.date,
                  description: node.excerpt,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                };
              });
            },
            title: '정승옥 개발 블로그 RSS',
          },
        ],
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
      },
      resolve: 'gatsby-plugin-feed',
    },
  ],
  siteMetadata: {
    author: {
      name: '정승옥',
      summary: '배운 것을 정리하고 공유합니다.',
    },
    description: '개발 관련 지식을 공유하고 정리합니다.',
    siteUrl: 'https://skylight.vercel.app',
    title: 'skylight',
  },
};
