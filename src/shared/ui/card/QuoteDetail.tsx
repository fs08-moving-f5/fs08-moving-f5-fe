'use client';
import Image from 'next/image';
import { MovingTypeChip } from '../chip';
import DriverInfo from './DriverInfo';

interface QuoteDetailProps {
  driverName: string;
  driverImageUrl?: string;
  rating: number;
  reviewCount: number;
  experience: string;
  moveCount: string;
  likeCount?: number;
  isLiked?: boolean;
  movingType?: 'small' | 'home' | 'office';
  pickedDriver?: boolean;
  estimatePrice: number;
  isConfirmed?: boolean;
}

const QuoteDetail = ({
  driverName,
  driverImageUrl,
  rating,
  reviewCount,
  experience,
  moveCount,
  likeCount = 0,
  isLiked = false,
  movingType,
  pickedDriver = false,
  estimatePrice,
  isConfirmed = false,
}: QuoteDetailProps) => {
  return (
    <article className="mobile:rounded-xl mobile:p-4 tab:rounded-xl tab:p-5 mobile:max-w-[327px] w-full max-w-[660px] rounded-2xl bg-white p-6 shadow-md">
      <div className="mobile:gap-3 tab:gap-3 flex flex-col gap-4">
        <div className="relative flex flex-col gap-4">
          <header className="flex w-full items-center justify-between">
            <div className="flex flex-row gap-2">
              {movingType && <MovingTypeChip movingType={movingType} />}
              {pickedDriver && <MovingTypeChip movingType="assign" />}
            </div>
          </header>

          <section className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h3 className="mobile:text-lg tab:text-lg text-black-500 text-xl font-semibold">
                고객님의 물품을 안전하게 운송해 드립니다.
              </h3>

              <p className="mobile:text-md tab:text-md text-grayScale-500 mobile:hidden text-lg">
                {isConfirmed ? (
                  <span className="text-primary-orange-400 flex items-center gap-1 font-bold">
                    <Image src="/icons/confirm.svg" alt="confirm icon" width={20} height={20} />
                    확정견적
                  </span>
                ) : (
                  <span className="font-semibold">견적대기</span>
                )}
              </p>
            </div>

            <div className="rounded-xl border-1 border-gray-100 p-3">
              <DriverInfo
                driverName={driverName}
                driverImageUrl={driverImageUrl}
                rating={rating}
                reviewCount={reviewCount}
                experience={experience}
                moveCount={moveCount}
                likeCount={likeCount}
                isLiked={isLiked}
                showLikeButton={true}
                type="quoteWait"
              />
            </div>
          </section>

          <hr className="border-gray-100" />

          <section className="mobile:justify-between flex items-center justify-end">
            <p className="mobile:text-md tab:text-md text-grayScale-500 mobile:block hidden text-lg">
              {isConfirmed ? (
                <span className="text-primary-orange-400 flex items-center gap-1 font-bold">
                  <Image src="/icons/confirm.svg" alt="confirm icon" width={20} height={20} />
                  확정견적
                </span>
              ) : (
                <span className="font-semibold">견적대기</span>
              )}
            </p>
            <div className="mobile:gap-4 flex items-center justify-end gap-6">
              <span className="mobile:text-md tab:text-md text-grayScale-500 text-lg font-medium">
                견적 금액
              </span>
              <strong className="mobile:text-xl tab:text-xl text-black-500 text-2xl font-bold">
                {estimatePrice.toLocaleString()}원
              </strong>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};

export default QuoteDetail;
