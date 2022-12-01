import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `);

  const author = data.site.siteMetadata?.author;

  return (
    <div className="bio">
      <StaticImage
        alt="Profile picture"
        className="bio-avatar"
        formats={['auto', 'webp', 'avif']}
        height={50}
        layout="fixed"
        quality={95}
        src="../images/profile.png"
        width={50}
      />
      {author?.name && (
        <p>
          Written by <strong>{author.name}</strong> {author?.summary || null}
        </p>
      )}
    </div>
  );
};

export default Bio;
