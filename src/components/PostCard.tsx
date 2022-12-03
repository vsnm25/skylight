import clsx from 'clsx';
import { Link } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React, { FC } from 'react';

interface PostCardProps {
  date: string;
  description: string;
  image?: IGatsbyImageData;
  link: string;
  tags: null | string[];
  title: string;
}

const PostCard: FC<PostCardProps> = ({
  date,
  description,
  image,
  link,
  tags,
  title,
}) => {
  return (
    <li>
      <Link to={link}>
        <article
          className={clsx(
            'flex sm:flex-col',
            'items-center gap-6 sm:gap-0',
            'relative overflow-hidden',
            'rounded-xl',
            'shadow-[0_2px_15px_0_rgba(0,0,0,0.1)]'
          )}
        >
          {image && (
            <div className="flex-shrink-0 overflow-hidden sm:w-full">
              <GatsbyImage
                alt="썸네일 이미지"
                className={clsx(
                  'w-56 sm:w-full',
                  'h-56 sm:h-48',
                  'hover:scale-110',
                  'transform-gpu duration-300 ease-out'
                )}
                image={image}
                objectFit="cover"
              />
            </div>
          )}
          <div className="flex flex-col items-start gap-4 py-4 pr-6 sm:py-6 sm:px-4">
            <div className="flex flex-col gap-2">
              <header>
                <h2 className="text-2xl font-bold text-blue200">
                  <Link to={link}>
                    <span>{title}</span>
                  </Link>
                </h2>
              </header>
              <section>
                <p className="line-clamp-3">{description}</p>
              </section>
            </div>
            <div className="flex gap-2">
              <span
                className={clsx(
                  'inline-flex items-center',
                  'h-6 px-2',
                  'bg-black100 text-xs font-bold text-white100'
                )}
              >
                {date}
              </span>
              {tags?.map((tag) => (
                <span
                  key={tag}
                  className={clsx(
                    'inline-flex items-center',
                    'h-6 px-2',
                    'bg-blue200 text-xs font-bold text-white100'
                  )}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </Link>
    </li>
  );
};

export default PostCard;
