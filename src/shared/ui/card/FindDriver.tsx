'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MovingTypeChip } from '../chip';

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
    <>
      <div className="tab: w-full max-w-[1200px] rounded-2xl bg-white p-6 shadow-md">
        <div className="relative flex flex-col items-start gap-4">
          {movingType && (
            <div>
              <MovingTypeChip movingType={movingType} />
            </div>
          )}
          <div className="flex flex-1 flex-row gap-6">
            <div className="tab:hidden">
              <Image
                src={driverImageUrl ?? '/img/profile.png'}
                alt="Driver Img"
                width={134}
                height={134}
                className="rounded-xl"
              />
            </div>
            <div>
              {/* 제목 */}
              <h3 className="text-black-500 mb-2 text-xl font-semibold">{title}</h3>
              {/* 설명 */}
              <p className="text-black-200 mb-5 text-lg">{description}</p>

              {/* 기사 정보 */}
              <div className="flex items-center gap-4">
                <div className="tab:block hidden">
                  <Image
                    src={driverImageUrl ?? '/img/profile.png'}
                    alt="Driver Img"
                    width={64}
                    height={64}
                    className="rounded-xl"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Image src="/icons/name.svg" alt="Driver Name Icon" width={24} height={24} />
                    <span className="text-black-500 text-lg font-semibold">{driverName}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Image src="/icons/star.svg" alt="Star Icon" width={20} height={20} />
                    <span className="text-black-500 flex items-center text-sm font-medium">
                      {rating.toFixed(1)}
                    </span>
                    <span className="flex items-center text-sm font-medium text-[#ababab]">
                      ({reviewCount})
                    </span>
                    <span className="mx-1 text-[#ababab]">|</span>
                    <span className="text-black-400 flex items-center gap-1.5 text-sm font-medium">
                      <span className="text-[#ababab]">경력</span>
                      {experience}
                    </span>
                    <span className="mx-1 text-[#ababab]">|</span>
                    <span className="text-black-400 flex items-center gap-1.5 text-sm font-medium">
                      {moveCount}
                      <span className="text-[#ababab]">확정</span>
                    </span>
                  </div>
                </div>

                {/* 좋아요 */}
                <div className="absolute right-0 bottom-0 flex items-center gap-1.5">
                  <button onClick={handleLikeClick} type="button">
                    <Image
                      src={liked ? '/icons/like-on.svg' : '/icons/like-off.svg'}
                      alt="Like Icon"
                      width={28}
                      height={28}
                    />
                  </button>
                  <span className="text-grayScale-500 text-lg font-medium">{likeCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindDriver;
