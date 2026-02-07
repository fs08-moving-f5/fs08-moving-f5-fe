'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { MovingTypeChip } from '@/shared/ui/chip';
import { CheckBox } from '../button';
import Like from '../like';
import ProfileImage from './ProfileImage';

interface FindDriverProps {
  smallStyle?: boolean;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  title: string;
  description: string;
  driverName: string;
  driverImageUrl?: string;
  rating: number;
  reviewCount: number;
  experience: string;
  moveCount: string;
  likeCount: number;
  movingTypeArray?: ('small' | 'home' | 'office' | 'assign')[];
  favoriteCard?: boolean;
  isLiked?: boolean;
  likeFunction?: (liked: boolean) => void;
  alwaysShowLike?: boolean;
}

const FindDriver = ({
  smallStyle = false,
  checked = false,
  onCheckChange = () => {},
  title,
  description,
  driverName,
  driverImageUrl,
  rating,
  reviewCount,
  experience,
  moveCount,
  likeCount,
  movingTypeArray,
  favoriteCard = false,
  isLiked = false,
  alwaysShowLike = false,
  likeFunction,
}: FindDriverProps) => {
  const [liked, setLiked] = useState(isLiked);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const handleLikeClick = () => {
    if (!alwaysShowLike) {
      likeFunction?.(!liked);
      setLiked(!liked);
    }
  };

  const articleClassName = smallStyle
    ? 'w-full max-w-[327px] rounded-xl bg-white p-4 shadow-md'
    : 'mobile:rounded-xl mobile:p-5 w-full max-w-[1200px] rounded-2xl bg-white p-6 shadow-md';

  const containerClassName = smallStyle
    ? 'relative flex flex-col items-start gap-3 w-full'
    : 'mobile:gap-3 relative flex flex-col items-start gap-4 w-full';

  const rowClassName = smallStyle
    ? 'flex flex-1 flex-row gap-4 w-full'
    : 'mobile:gap-4 flex flex-1 flex-row gap-6 w-full';

  const profileImageWrapperClassName = smallStyle ? 'hidden' : 'mobile:hidden block';

  const titleClassName = smallStyle
    ? 'text-black-500 mb-1 text-lg truncate font-semibold'
    : 'text-black-500 mobile:mb-2 mobile:text-lg mb-2 text-xl truncate font-semibold';

  const descriptionWrapperClassName = smallStyle ? 'hidden' : 'mobile:block';

  const descriptionClassName = smallStyle
    ? 'text-black-200 mb-5 text-md'
    : 'text-black-200 mobile:mb-4 mobile:text-md mb-5 text-lg truncate';

  const hrClassName = smallStyle ? 'hidden' : 'mobile:block hidden';

  return (
    <article className={articleClassName}>
      <div className={containerClassName}>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1">
            {movingTypeArray?.map((mv) => (
              <MovingTypeChip key={mv} movingType={mv} />
            ))}
          </div>
          {favoriteCard && <CheckBox shape="square" checked={checked} onChange={onCheckChange} />}
        </div>
        <div className={rowClassName}>
          <div className={profileImageWrapperClassName}>
            <figure>
              <ProfileImage
                src={driverImageUrl}
                alt="Driver Img"
                width={134}
                height={134}
                className="h-[134px] w-[134px] rounded-xl object-cover"
              />
            </figure>
          </div>
          <section className="min-w-0 flex-1">
            <header>
              <h3 className={titleClassName}>{title}</h3>
              <div className={descriptionWrapperClassName}>
                <p className={descriptionClassName}>{description}</p>
              </div>
            </header>

            <div className={hrClassName}>
              <hr className="mb-4 border-gray-100" />
            </div>

            <FindDriverInfo
              driverName={driverName}
              driverImageUrl={driverImageUrl}
              rating={rating}
              reviewCount={reviewCount}
              experience={experience}
              moveCount={moveCount}
              likeCount={likeCount}
              isLiked={liked}
              onLikeClick={alwaysShowLike ? undefined : handleLikeClick}
              showLikeButton={true}
              smallStyle={smallStyle}
            />
          </section>
        </div>
      </div>
    </article>
  );
};

export default FindDriver;

interface FindDriverInfoProps {
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
  smallStyle?: boolean;
}

const FindDriverInfo = ({
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
  smallStyle = false,
}: FindDriverInfoProps) => {
  const imageSize = size === 'large' ? 50 : size === 'medium' ? 40 : 32;
  const nameIconSize = size === 'large' ? 24 : size === 'medium' ? 20 : 18;
  const starIconSize = size === 'large' ? 20 : size === 'medium' ? 18 : 16;

  const rootClassName = smallStyle
    ? 'flex items-center gap-2'
    : 'mobile:gap-3 flex items-center gap-4';

  const profileWrapperClassName =
    type === 'estimateWait' ? '' : smallStyle ? 'block' : 'mobile:block hidden';

  const infoColClassName = smallStyle
    ? 'flex flex-1 flex-col gap-0.5'
    : 'mobile:gap-1 flex flex-1 flex-col gap-1';

  const topRowClassName =
    type === 'estimateWait' ? 'flex items-center justify-between gap-3' : 'flex items-center gap-3';

  const nameRowClassName = smallStyle
    ? 'flex min-w-0 items-center gap-1'
    : 'mobile:gap-1 flex min-w-0 items-center gap-1.5';

  const nameTextClassName = smallStyle
    ? 'text-black-500 text-md truncate font-semibold'
    : 'text-black-500 mobile:text-md text-lg truncate font-semibold';

  const likeOuterClassName = smallStyle ? 'ml-0' : 'mobile:ml-auto';

  const likeInnerClassName =
    type === 'estimateWait' ? '' : smallStyle ? 'block' : 'mobile:block hidden';

  const metaListClassName = smallStyle
    ? 'flex items-center gap-1 text-xs'
    : 'mobile:text-xs flex items-center gap-1.5';

  const starDdClassName = smallStyle
    ? 'text-black-500 flex items-center text-xs font-medium'
    : 'text-black-500 mobile:text-xs flex items-center text-sm font-medium';

  const reviewDdClassName = smallStyle
    ? 'flex items-center text-xs font-medium text-[#ababab]'
    : 'mobile:text-xs flex items-center text-sm font-medium text-[#ababab]';

  const dividerClassName = smallStyle
    ? 'mx-0.5 text-[#ababab]'
    : 'mobile:mx-0.5 mx-1 text-[#ababab]';

  const expGroupClassName = smallStyle
    ? 'text-black-400 flex items-center gap-1 text-xs font-medium'
    : 'text-black-400 mobile:gap-1 mobile:gap-1 mobile:text-xs flex items-center gap-1.5 text-sm font-medium';

  const likeClassName = smallStyle ? 'hidden' : 'mobile:hidden absolute right-0 bottom-0';

  return (
    <section className={rootClassName}>
      <div className={profileWrapperClassName}>
        <figure>
          <ProfileImage
            src={driverImageUrl}
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
                  showCount={!smallStyle}
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
              className="mobile:h-4 mobile:w-4"
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
