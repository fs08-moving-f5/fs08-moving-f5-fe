'use client';

import Image from 'next/image';

interface DriverInfoProps {
  driverName: string;
  driverImageUrl?: string;
  rating: number;
  reviewCount: number;
  experience: string;
  moveCount: string;
  likeCount?: number;
  isLiked?: boolean;
  onLikeClick?: () => void;
  showLikeButton?: boolean;
  size?: 'small' | 'medium' | 'large';
  type?: 'findDriver' | 'quoteWait';
}

const DriverInfo = ({
  driverName,
  driverImageUrl,
  rating,
  reviewCount,
  experience,
  moveCount,
  likeCount = 0,
  isLiked = false,
  onLikeClick,
  showLikeButton = true,
  size = 'large',
  type = 'findDriver',
}: DriverInfoProps) => {
  const imageSize = size === 'large' ? 50 : size === 'medium' ? 40 : 32;
  const nameIconSize = size === 'large' ? 24 : size === 'medium' ? 20 : 18;
  const starIconSize = size === 'large' ? 20 : size === 'medium' ? 18 : 16;
  const likeIconSize = size === 'large' ? 28 : size === 'medium' ? 24 : 20;

  return (
    <section className="mobile:gap-2 tab:gap-3 flex items-center gap-4">
      <figure className={type === 'quoteWait' ? '' : 'tab:block hidden'}>
        <Image
          src={driverImageUrl ?? '/img/profile.png'}
          alt="Driver Img"
          width={imageSize}
          height={imageSize}
          className="rounded-xl"
        />
      </figure>
      <div className="mobile:gap-0.5 tab:gap-1 flex flex-1 flex-col gap-1">
        <div
          className={
            type === 'quoteWait'
              ? 'flex items-center justify-between gap-3'
              : 'flex items-center gap-3'
          }
        >
          <div className="mobile:gap-1 tab:gap-1 flex items-center gap-1.5">
            <Image
              src="/icons/name.svg"
              alt="Driver Name Icon"
              width={nameIconSize}
              height={nameIconSize}
            />
            <strong className="text-black-500 mobile:text-md tab:text-md text-lg font-semibold">
              {driverName}
            </strong>
          </div>
          {showLikeButton && (
            <div className="tab:flex mobile:static tab:ml-auto mobile:ml-0 mobile:gap-1 tab:gap-1 hidden items-center gap-1.5">
              <button onClick={onLikeClick} type="button" aria-label="좋아요">
                <Image
                  src={isLiked ? '/icons/like-on.svg' : '/icons/like-off.svg'}
                  alt="Like Icon"
                  width={likeIconSize}
                  height={likeIconSize}
                  className="mobile:h-6 mobile:w-6 tab:h-6 tab:w-6"
                />
              </button>
              <span
                className={
                  type === 'quoteWait'
                    ? 'text-grayScale-500 mobile:text-md tab:text-md text-lg font-medium'
                    : 'tab:block mobile:hidden text-grayScale-500 mobile:text-md tab:text-md hidden text-lg font-medium'
                }
              >
                {likeCount}
              </span>
            </div>
          )}
        </div>
        <dl className="mobile:gap-1 mobile:text-xs tab:gap-1 tab:text-xs flex items-center gap-1.5">
          <div className="flex items-center gap-1">
            <Image
              src="/icons/star.svg"
              alt="Star Icon"
              width={starIconSize}
              height={starIconSize}
              className="mobile:h-4 mobile:w-4 tab:h-4 tab:w-4"
            />
            <dd className="text-black-500 mobile:text-xs tab:text-xs flex items-center text-sm font-medium">
              {rating.toFixed(1)}
            </dd>
            <dd className="mobile:text-xs tab:text-xs flex items-center text-sm font-medium text-[#ababab]">
              ({reviewCount})
            </dd>
          </div>
          <span className="mobile:mx-0.5 tab:mx-0.5 mx-1 text-[#ababab]" aria-hidden="true">
            |
          </span>
          <div className="text-black-400 mobile:gap-1 mobile:text-xs tab:gap-1 tab:text-xs flex items-center gap-1.5 text-sm font-medium">
            <dt className="text-[#ababab]">경력</dt>
            <dd>{experience}</dd>
          </div>
          <span className="mobile:mx-0.5 tab:mx-0.5 mx-1 text-[#ababab]" aria-hidden="true">
            |
          </span>
          <div className="text-black-400 mobile:gap-1 mobile:text-xs tab:gap-1 tab:text-xs flex items-center gap-1.5 text-sm font-medium">
            <dd>{moveCount}</dd>
            <dt className="text-[#ababab]">확정</dt>
          </div>
        </dl>
      </div>

      {/* 좋아요 (모바일) */}
      {showLikeButton && (
        <div className="tab:hidden mobile:hidden mobile:ml-auto mobile:gap-1 tab:gap-1 absolute right-0 bottom-0 flex items-center gap-1.5">
          <button onClick={onLikeClick} type="button" aria-label="좋아요">
            <Image
              src={isLiked ? '/icons/like-on.svg' : '/icons/like-off.svg'}
              alt="Like Icon"
              width={likeIconSize}
              height={likeIconSize}
              className="mobile:h-6 mobile:w-6 tab:h-6 tab:w-6"
            />
          </button>
          <span className="text-grayScale-500 mobile:text-md tab:text-md text-lg font-medium">
            {likeCount}
          </span>
        </div>
      )}
    </section>
  );
};

export default DriverInfo;
