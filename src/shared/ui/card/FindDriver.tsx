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
      <div className="tab:max-w-[327px] mobile:rounded-xl mobile:p-4 tab:rounded-xl tab:p-5 w-full max-w-[1200px] rounded-2xl bg-white p-6 shadow-md">
        <div className="mobile:gap-3 tab:gap-3 relative flex flex-col items-start gap-4">
          {movingType && (
            <div>
              <MovingTypeChip movingType={movingType} />
            </div>
          )}
          <div className="mobile:gap-4 tab:gap-4 flex flex-1 flex-row gap-6">
            <div className="tab:hidden">
              <Image
                src={driverImageUrl ?? '/img/profile.png'}
                alt="Driver Img"
                width={134}
                height={134}
              />
            </div>
            <div className="flex-1">
              {/* 제목 */}
              <h3 className="text-black-500 mobile:mb-1 mobile:text-lg tab:mb-2 tab:text-lg mb-2 text-xl font-semibold">
                {title}
              </h3>
              {/* 설명 */}
              <p className="text-black-200 mobile:hidden tab:mb-4 tab:text-md mb-5 text-lg">
                {description}
              </p>

              <hr className="mobile:hidden tab:block tab:mb-4 hidden border-gray-100" />

              {/* 기사 정보 */}
              <div className="mobile:gap-2 tab:gap-3 flex items-center gap-4">
                <div className="tab:block hidden">
                  <Image
                    src={driverImageUrl ?? '/img/profile.png'}
                    alt="Driver Img"
                    width={50}
                    height={50}
                    className="rounded-xl"
                  />
                </div>
                <div className="mobile:gap-0.5 tab:gap-1 flex flex-1 flex-col gap-1">
                  <div className="mobile:gap-1.5 tab:gap-1.5 flex items-center gap-2">
                    <Image src="/icons/name.svg" alt="Driver Name Icon" width={24} height={24} />
                    <span className="text-black-500 mobile:text-md tab:text-md text-lg font-semibold">
                      {driverName}
                    </span>
                    <div className="tab:flex mobile:static tab:ml-auto mobile:ml-0 mobile:gap-1 tab:gap-1 hidden items-center gap-1.5">
                      <button onClick={handleLikeClick} type="button">
                        <Image
                          src={liked ? '/icons/like-on.svg' : '/icons/like-off.svg'}
                          alt="Like Icon"
                          width={28}
                          height={28}
                          className="mobile:h-6 mobile:w-6 tab:h-6 tab:w-6"
                        />
                      </button>
                      <span className="tab:block mobile:hidden text-grayScale-500 mobile:text-md tab:text-md hidden text-lg font-medium">
                        {likeCount}
                      </span>
                    </div>
                  </div>
                  <div className="mobile:gap-1 mobile:text-xs tab:gap-1 tab:text-xs flex items-center gap-1.5">
                    <Image
                      src="/icons/star.svg"
                      alt="Star Icon"
                      width={20}
                      height={20}
                      className="mobile:h-4 mobile:w-4 tab:h-4 tab:w-4"
                    />
                    <span className="text-black-500 mobile:text-xs tab:text-xs flex items-center text-sm font-medium">
                      {rating.toFixed(1)}
                    </span>
                    <span className="mobile:text-xs tab:text-xs flex items-center text-sm font-medium text-[#ababab]">
                      ({reviewCount})
                    </span>
                    <span className="mobile:mx-0.5 tab:mx-0.5 mx-1 text-[#ababab]">|</span>
                    <span className="text-black-400 mobile:gap-1 mobile:text-xs tab:gap-1 tab:text-xs flex items-center gap-1.5 text-sm font-medium">
                      <span className="text-[#ababab]">경력</span>
                      {experience}
                    </span>
                    <span className="mobile:mx-0.5 tab:mx-0.5 mx-1 text-[#ababab]">|</span>
                    <span className="text-black-400 mobile:gap-1 mobile:text-xs tab:gap-1 tab:text-xs flex items-center gap-1.5 text-sm font-medium">
                      {moveCount}
                      <span className="text-[#ababab]">확정</span>
                    </span>
                  </div>
                </div>

                {/* 좋아요 */}
                <div className="tab:hidden mobile:hidden mobile:ml-auto mobile:gap-1 tab:gap-1 absolute right-0 bottom-0 flex items-center gap-1.5">
                  <button onClick={handleLikeClick} type="button">
                    <Image
                      src={liked ? '/icons/like-on.svg' : '/icons/like-off.svg'}
                      alt="Like Icon"
                      width={28}
                      height={28}
                      className="mobile:h-6 mobile:w-6 tab:h-6 tab:w-6"
                    />
                  </button>
                  <span className="text-grayScale-500 mobile:text-md tab:text-md text-lg font-medium">
                    {likeCount}
                  </span>
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
