import clsx from 'clsx';
import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';

const IntroDuctionBanner = () => {
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
    <div className="sm:h-30 h-80 bg-blue200">
      <div
        className={clsx(
          'mx-auto flex h-full max-w-3xl',
          "bg-[url('../images/profile.png')] bg-contain bg-[center_right_-3.5rem] bg-no-repeat"
        )}
      >
        <div className="mx-auto flex w-full items-center justify-start gap-4 px-4">
          {author?.name && (
            <div className="flex flex-col">
              <p className="break-keep text-2xl font-bold text-white100 sm:text-xl">
                안녕하세요. 👋
                <br />
                프론트엔드 엔지니어 <strong>{author.name}</strong>
                입니다.
                <br />
                {author?.summary || null}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntroDuctionBanner;
