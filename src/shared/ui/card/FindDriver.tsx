'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { useState } from 'react';
import { MovingTypeChip } from '@/shared/ui/chip';
import DriverInfo from './DriverInfo';
import { CheckBox } from '../button';

interface FindDriverProps {
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  mobStyle?: boolean;
  title: string;
  description: string;
  driverName: string;
  driverImageUrl?: string;
  rating: number;
  reviewCount: number;
  experience: string;
  moveCount: string;
  likeCount: number;
  // movingType?: 'small' | 'home' | 'office' | 'assign';
  movingTypeArray?: ('small' | 'home' | 'office' | 'assign')[];
  favoriteCard?: boolean;
  isLiked?: boolean;
  likeFunction?: () => void;
}

const FindDriver = ({
  checked = false,
  onCheckChange = () => {},
  mobStyle = false,
  title,
  description,
  driverName,
  driverImageUrl,
  rating,
  reviewCount,
  experience,
  moveCount,
  likeCount,
  // movingType,
  movingTypeArray,
  favoriteCard = false,
  isLiked = false,
  likeFunction,
}: FindDriverProps) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLikeClick = () => {
    likeFunction?.();
    setLiked(!liked);
  };

  const styles = {
    article: {
      base: 'w-full max-w-[1200px] rounded-2xl bg-white p-6 shadow-md',
      mobile: 'mobile:rounded-xl mobile:p-4',
      mobileForced: 'rounded-xl p-4',
      tab: 'tab:max-w-[327px] tab:rounded-xl tab:p-5',
    },
    container: {
      base: 'relative flex flex-col items-start gap-4',
      mobile: 'mobile:gap-3',
      mobileForced: 'gap-3',
      tab: 'tab:gap-3',
    },
    contentRow: {
      base: 'flex flex-1 flex-row gap-6',
      mobile: 'mobile:gap-4',
      mobileForced: 'gap-4',
      tab: 'tab:gap-4',
    },
    mobileImgWrapper: {
      base: 'tab:hidden',
      mobileForced: 'block',
    },
    title: {
      base: 'text-black-500 mb-2 text-xl font-semibold',
      mobile: 'mobile:mb-1 mobile:text-lg',
      mobileForced: 'mb-1 text-lg',
      tab: 'tab:mb-2 tab:text-lg',
    },
    descWrapper: {
      base: 'mobile:hidden tab:block',
      mobileForced: 'hidden',
    },
    desc: {
      base: 'text-black-200 mb-5 text-lg',
      tab: 'tab:mb-4 tab:text-md',
    },
    hrWrapper: {
      base: 'hidden mobile:hidden tab:block',
    },
    hr: {
      base: 'border-gray-100',
      tab: 'tab:mb-4',
    },
  };

  return (
    <article
      className={clsx(
        styles.article.base,
        mobStyle ? styles.article.mobileForced : styles.article.mobile,
        !mobStyle && styles.article.tab,
      )}
    >
      <div
        className={clsx(
          styles.container.base,
          mobStyle ? styles.container.mobileForced : styles.container.mobile,
          !mobStyle && styles.container.tab,
        )}
      >
        {favoriteCard && (
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1">
              {movingTypeArray?.map((mv) => (
                <MovingTypeChip key={mv} movingType={mv} />
              ))}
            </div>
            <CheckBox shape="square" checked={checked} onChange={onCheckChange} />
          </div>
        )}
        <div
          className={clsx(
            styles.contentRow.base,
            mobStyle ? styles.contentRow.mobileForced : styles.contentRow.mobile,
            !mobStyle && styles.contentRow.tab,
          )}
        >
          <div className={clsx(mobStyle ? styles.mobileImgWrapper.mobileForced : styles.mobileImgWrapper.base)}>
            <figure>
              <Image
                src={driverImageUrl ?? '/img/profile.png'}
                alt="Driver Img"
                width={134}
                height={134}
                className="h-[134px] w-[134px] rounded-xl object-cover"
              />
            </figure>
          </div>
          <section className="flex-1">
            <header>
              <h3
                className={clsx(
                  styles.title.base,
                  mobStyle ? styles.title.mobileForced : styles.title.mobile,
                  !mobStyle && styles.title.tab,
                )}
              >
                {title}
              </h3>
              <div className={clsx(mobStyle ? styles.descWrapper.mobileForced : styles.descWrapper.base)}>
                <p className={clsx(styles.desc.tab, styles.desc.base)}>{description}</p>
              </div>
            </header>

            <div className={styles.hrWrapper.base}>
              <hr className={clsx(styles.hr.tab, styles.hr.base)} />
            </div>

            <DriverInfo
              driverName={driverName}
              driverImageUrl={driverImageUrl}
              rating={rating}
              reviewCount={reviewCount}
              experience={experience}
              moveCount={moveCount}
              likeCount={likeCount}
              isLiked={liked}
              onLikeClick={handleLikeClick}
              showLikeButton={true}
            />
          </section>
        </div>
      </div>
    </article>
  );
};

export default FindDriver;
