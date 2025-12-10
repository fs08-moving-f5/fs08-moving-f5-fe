'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MovingTypeChip } from '../chip';
import DriverInfo from './DriverInfo';

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
  movingType?: 'small' | 'home' | 'office' | 'assign';
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
  movingType,
  isLiked = false,
  likeFunction,
}: FindDriverProps) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLikeClick = () => {
    setLiked(!liked);
    likeFunction?.();
  };

  return (
    <article className="tab:max-w-[327px] mobile:rounded-xl mobile:p-4 tab:rounded-xl tab:p-5 w-full max-w-[1200px] rounded-2xl bg-white p-6 shadow-md">
      <div className="mobile:gap-3 tab:gap-3 relative flex flex-col items-start gap-4">
        {movingType && (
          <div>
            <MovingTypeChip movingType={movingType} />
          </div>
        )}
        <div className="mobile:gap-4 tab:gap-4 flex flex-1 flex-row gap-6">
          <figure className="tab:hidden">
            <Image
              src={driverImageUrl ?? '/img/profile.png'}
              alt="Driver Img"
              width={134}
              height={134}
            />
          </figure>
          <section className="flex-1">
            <header>
              <h3 className="text-black-500 mobile:mb-1 mobile:text-lg tab:mb-2 tab:text-lg mb-2 text-xl font-semibold">
                {title}
              </h3>
              <p className="text-black-200 mobile:hidden tab:mb-4 tab:text-md mb-5 text-lg">
                {description}
              </p>
            </header>

            <hr className="mobile:hidden tab:block tab:mb-4 hidden border-gray-100" />

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
