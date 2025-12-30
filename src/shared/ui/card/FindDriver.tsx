'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MovingTypeChip } from '@/shared/ui/chip';
import DriverInfo from './DriverInfo';
import { CheckBox } from '../button';

interface FindDriverProps {
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

  return (
    <article className="tab:max-w-[327px] mobile:rounded-xl mobile:p-4 tab:rounded-xl tab:p-5 w-full max-w-[1200px] rounded-2xl bg-white p-6 shadow-md">
      <div className="mobile:gap-3 tab:gap-3 relative flex flex-col items-start gap-4">
        {favoriteCard && (
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1">
              {movingTypeArray?.map((mv) => (
                <MovingTypeChip key={mv} movingType={mv} />
              ))}
            </div>
            <CheckBox shape="square" checked={false} onChange={() => {}} />
          </div>
        )}
        <div className="mobile:gap-4 tab:gap-4 flex flex-1 flex-row gap-6">
          <div className="tab:hidden">
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
              <h3 className="text-black-500 mobile:mb-1 mobile:text-lg tab:mb-2 tab:text-lg mb-2 text-xl font-semibold">
                {title}
              </h3>
              <div className="mobile:hidden tab:block">
                <p className="text-black-200 tab:mb-4 tab:text-md mb-5 text-lg">{description}</p>
              </div>
            </header>

            <div className="mobile:hidden tab:block hidden">
              <hr className="tab:mb-4 border-gray-100" />
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
