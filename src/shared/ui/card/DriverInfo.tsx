'use client';

import Image from 'next/image';
import Like from '@/shared/ui/like';

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
  type?: 'findDriver' | 'estimateWait';
  mobileStyle?: boolean;
}

interface SimpleDriverInfoProps {
  driverName: string;
  description?: string;
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
  mobileStyle = false,
}: DriverInfoProps) => {
  const imageSize = size === 'large' ? 50 : size === 'medium' ? 40 : 32;
  const nameIconSize = size === 'large' ? 24 : size === 'medium' ? 20 : 18;
  const starIconSize = size === 'large' ? 20 : size === 'medium' ? 18 : 16;

  const rootClassName = mobileStyle
    ? 'flex items-center gap-2'
    : 'mobile:gap-2 tab:gap-3 flex items-center gap-4';

  const profileWrapperClassName =
    type === 'estimateWait' ? '' : mobileStyle ? 'block' : 'tab:block hidden';

  const infoColClassName = mobileStyle
    ? 'flex flex-1 flex-col gap-0.5'
    : 'mobile:gap-0.5 tab:gap-1 flex flex-1 flex-col gap-1';

  const topRowClassName =
    type === 'estimateWait' ? 'flex items-center justify-between gap-3' : 'flex items-center gap-3';

  const nameRowClassName = mobileStyle
    ? 'flex items-center gap-1'
    : 'mobile:gap-1 tab:gap-1 flex items-center gap-1.5';

  const nameTextClassName = mobileStyle
    ? 'text-black-500 text-md font-semibold'
    : 'text-black-500 mobile:text-md tab:text-md text-lg font-semibold';

  const likeOuterClassName = mobileStyle ? 'ml-0' : 'tab:ml-auto mobile:ml-0';

  const likeInnerClassName =
    type === 'estimateWait' ? '' : mobileStyle ? 'block' : 'tab:block mobile:hidden hidden';

  const metaListClassName = mobileStyle
    ? 'flex items-center gap-1 text-xs'
    : 'mobile:gap-1 mobile:text-xs tab:gap-1 tab:text-xs flex items-center gap-1.5';

  const starDdClassName = mobileStyle
    ? 'text-black-500 flex items-center text-xs font-medium'
    : 'text-black-500 mobile:text-xs tab:text-xs flex items-center text-sm font-medium';

  const reviewDdClassName = mobileStyle
    ? 'flex items-center text-xs font-medium text-[#ababab]'
    : 'mobile:text-xs tab:text-xs flex items-center text-sm font-medium text-[#ababab]';

  const dividerClassName = mobileStyle
    ? 'mx-0.5 text-[#ababab]'
    : 'mobile:mx-0.5 tab:mx-0.5 mx-1 text-[#ababab]';

  const expGroupClassName = mobileStyle
    ? 'text-black-400 flex items-center gap-1 text-xs font-medium'
    : 'text-black-400 mobile:gap-1 mobile:text-xs tab:gap-1 tab:text-xs flex items-center gap-1.5 text-sm font-medium';

  const likeClassName = mobileStyle
    ? 'hidden'
    : 'tab:hidden mobile:hidden absolute right-0 bottom-0';

  return (
    <section className={rootClassName}>
      <div className={profileWrapperClassName}>
        <figure>
          <Image
            src={driverImageUrl ?? '/img/profile.png'}
            alt="Driver Img"
            width={imageSize}
            height={imageSize}
            className="h-[50px] w-[50px] rounded-xl object-cover"
          />
        </figure>
      </div>
      <div className={infoColClassName}>
        <div className={topRowClassName}>
          <div className={nameRowClassName}>
            <Image
              src="/icons/name.svg"
              alt="Driver Name Icon"
              width={nameIconSize}
              height={nameIconSize}
            />
            <strong className={nameTextClassName}>{driverName} 기사님</strong>
          </div>
          {showLikeButton && (
            <div className={likeOuterClassName}>
              <div className={likeInnerClassName}>
                <Like
                  likeCount={likeCount}
                  isLiked={isLiked}
                  onLikeClick={onLikeClick}
                  size={size}
                  showCount={type === 'estimateWait'}
                />
              </div>
            </div>
          )}
        </div>
        <dl className={metaListClassName}>
          <div className="flex items-center gap-1">
            <Image
              src="/icons/star.svg"
              alt="Star Icon"
              width={starIconSize}
              height={starIconSize}
              className="mobile:h-4 mobile:w-4 tab:h-4 tab:w-4"
            />
            <dd className={starDdClassName}>{rating.toFixed(1)}</dd>
            <dd className={reviewDdClassName}>({reviewCount})</dd>
          </div>
          <span className={dividerClassName} aria-hidden="true">
            |
          </span>
          <div className={expGroupClassName}>
            <dt className="text-[#ababab]">경력</dt>
            <dd>{experience}</dd>
          </div>
          <span className={dividerClassName} aria-hidden="true">
            |
          </span>
          <div className={expGroupClassName}>
            <dd>{moveCount}</dd>
            <dt className="text-[#ababab]">확정</dt>
          </div>
        </dl>
      </div>

      {/* 좋아요 (모바일) */}
      {showLikeButton && (
        <div className={type === 'estimateWait' ? 'hidden' : likeClassName}>
          <Like
            likeCount={likeCount}
            isLiked={isLiked}
            onLikeClick={onLikeClick}
            size={size}
            showCount={true}
          />
        </div>
      )}
    </section>
  );
};

const SimpleDriverInfo = ({ driverName, description }: SimpleDriverInfoProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2">
        <Image src="/icons/name.svg" alt="Driver Name Icon" width={20} height={20} />
        <h3 className="text-black-500 mobile:text-lg tab:text-lg text-xl font-semibold">
          {driverName} 기사님
        </h3>
      </div>
      {description && (
        <p className="text-grayScale-500 mobile:text-sm tab:text-sm text-md">{description}</p>
      )}
    </div>
  );
};

export { SimpleDriverInfo };
export default DriverInfo;
