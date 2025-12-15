'use client';

import Image from 'next/image';
import { SimpleDriverInfo } from './DriverInfo';
import { MovingTypeChip } from '@/shared/ui/chip';
import { StarRating } from '@/shared/ui/star';

interface ReviewWrittenProps {
  driverName: string;
  description?: string;
  movingType?: 'small' | 'home' | 'office';
  pickedDriver?: boolean;
  driverImageUrl?: string;
  pickupAddress: string;
  dropoffAddress: string;
  movingDate: string;
  rating: number;
  reviewContent: string;
  reviewDate: string;
}

const ReviewWritten = ({
  driverName,
  description,
  movingType,
  pickedDriver = false,
  driverImageUrl,
  pickupAddress,
  dropoffAddress,
  movingDate,
  rating,
  reviewContent,
  reviewDate,
}: ReviewWrittenProps) => {
  return (
    <article className="tab:max-w-[600px] flex w-full max-w-[1200px] flex-col rounded-2xl bg-white px-10 py-8 shadow-md">
      <header className="mobile:flex mb-4 hidden w-fit flex-row gap-2">
        {movingType && <MovingTypeChip movingType={movingType} />}
        {pickedDriver && <MovingTypeChip movingType="assign" />}
      </header>
      <div className="mobile:w-full mobile:flex-col mobile:gap-4 tab:w-full tab:flex-col tab:gap-8 relative flex flex-row items-start gap-6">
        {/* 정보 영역 */}
        <div className="mobile:w-full tab:w-full flex flex-1 flex-col gap-3">
          {/* 기사님 프로필 이미지 */}
          <div className="mobile:flex-row-reverse mobile:justify-between flex gap-6">
            <figure className="mobile:h-12 mobile:w-12 h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
              <Image
                src={driverImageUrl || '/img/profile.png'}
                alt={`${driverName} 프로필`}
                width={80}
                height={80}
              />
            </figure>
            <div className="flex flex-col gap-1">
              <SimpleDriverInfo driverName={driverName} description={description} />
              <div className="mobile:hidden mb-4 flex w-fit flex-row gap-2">
                {movingType && <MovingTypeChip movingType={movingType} />}
                {pickedDriver && <MovingTypeChip movingType="assign" />}
              </div>
            </div>
          </div>

          {/* 이사 정보 */}
          <div className="mobile:text-sm mobile:gap-2 tab:text-sm text-black-300 text-md flex flex-row flex-wrap gap-6">
            <div className="flex flex-col items-start gap-2">
              <span className="text-grayScale-500 mobile:text-sm tab:text-sm text-md w-16 flex-shrink-0">
                출발지
              </span>
              <span className="flex-1">{pickupAddress}</span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="text-grayScale-500 mobile:text-sm tab:text-sm text-md w-16 flex-shrink-0">
                도착지
              </span>
              <span className="flex-1">{dropoffAddress}</span>
            </div>
            <div className="border-line-100 border-1"></div>
            <div className="flex flex-col items-start gap-2">
              <span className="text-grayScale-500 mobile:text-sm tab:text-sm text-md w-16 flex-shrink-0">
                이사일
              </span>
              <span className="flex-1">{movingDate}</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="text-line-200 my-6 w-full" />

      {/* 리뷰 내용 */}
      <div className="mobile:gap-3 tab:gap-4 flex flex-col gap-4">
        <div className="tab:flex mobile:flex flex-col gap-2">
          <StarRating rating={rating} />
        </div>

        <p className="mobile:text-sm tab:text-sm text-black-500 text-lg leading-relaxed whitespace-pre-wrap">
          {reviewContent}
        </p>

        <time className="text-grayScale-500 mobile:text-sm tab:text-sm block text-right text-sm">
          작성일 {reviewDate}
        </time>
      </div>
    </article>
  );
};

export default ReviewWritten;
