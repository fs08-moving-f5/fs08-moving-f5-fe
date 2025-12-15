'use client';

import Image from 'next/image';
import { SimpleDriverInfo } from './DriverInfo';

import { MovingTypeChip } from '@/shared/ui/chip';
import { Button } from '@/shared/ui/Button';

interface ReviewCanWriteProps {
  driverName: string;
  description?: string;
  movingType?: 'small' | 'home' | 'office';
  pickedDriver?: boolean;
  driverImageUrl?: string;
  pickupAddress: string;
  dropoffAddress: string;
  movingDate: string;
  estimatedPrice: number;
  disabled?: boolean;
  onWriteReview?: () => void;
}

const ReviewCanWrite = ({
  driverName,
  description,
  movingType,
  pickedDriver = false,
  driverImageUrl,
  pickupAddress,
  dropoffAddress,
  movingDate,
  estimatedPrice,
  disabled = false,
  onWriteReview,
}: ReviewCanWriteProps) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  return (
    <article className="tab:max-w-[600px] flex w-full max-w-[1200px] flex-col rounded-2xl bg-white px-10 py-8 shadow-md">
      <header className="mobile:flex mb-4 hidden w-fit flex-row gap-2">
        {movingType && <MovingTypeChip movingType={movingType} />}
        {pickedDriver && <MovingTypeChip movingType="assign" />}
      </header>
      <div className="mobile:w-full mobile:flex-col mobile:gap-4 tab:w-full tab:flex-col tab:gap-8 relative flex flex-row items-center gap-6">
        {/* 정보 영역 */}
        <div className="mobile:w-full tab:w-full flex flex-1 flex-col gap-3">
          {/* 기사님 프로필 이미지 */}
          <div className="mobile:flex-row-reverse mobile:justify-between flex gap-6">
            <figure className="mobile:h-20 mobile:w-20 tab:h-20 tab:w-20 h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
              <Image
                src={driverImageUrl || '/img/profile.png'}
                alt={`${driverName} 프로필`}
                width={96}
                height={96}
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
          <div className="mobile:text-sm tab:text-sm text-black-300 text-md flex flex-row flex-wrap gap-6">
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
            <div className="border-line-100 mobile:hidden border-1"></div>
            {/* 테블릿/모바일 견적 금액 */}
            <div className="tab:flex mobile:hidden hidden flex-col items-end gap-2">
              <span className="text-grayScale-500 mobile:text-sm tab:text-sm text-md">
                견적 금액
              </span>
              <span className="text-black-500 text-lg font-bold">
                {formatPrice(estimatedPrice)}원
              </span>
            </div>
          </div>
        </div>
        <hr className="text-line-200 mobile:block hidden w-full" />
        {/* 오른쪽 영역: 견적 금액 및 버튼 */}
        <div className="tab:hidden absolute right-0 bottom-0 flex flex-col gap-4">
          {/* 데스크탑 견적 금액 */}
          <div className="tab:hidden flex flex-col items-end gap-1">
            <span className="text-grayScale-500 mobile:text-sm tab:text-sm text-md">견적 금액</span>
            <span className="text-black-500 mobile:text-xl tab:text-xl text-2xl font-bold">
              {formatPrice(estimatedPrice)}원
            </span>
          </div>

          {/* 리뷰 작성하기 버튼 */}
          <div className="w-full">
            <Button variant="solid" size="2xs" onClick={onWriteReview} disabled={disabled}>
              리뷰 작성하기
            </Button>
          </div>
        </div>
        <div className="tab:flex hidden w-full flex-col gap-6">
          <div className="mobile:flex hidden flex-row items-center justify-between gap-1">
            <span className="text-grayScale-500 mobile:text-sm tab:text-sm text-md">견적 금액</span>
            <span className="text-black-500 mobile:text-lg tab:text-xl text-2xl font-bold">
              {formatPrice(estimatedPrice)}원
            </span>
          </div>
          <Button variant="solid" size="lg" onClick={onWriteReview} disabled={disabled}>
            리뷰 작성하기
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ReviewCanWrite;
