'use client';

import { MovingTypeChip } from '@/shared/ui/chip';
import DriverInfo from './DriverInfo';
import { Button } from '@/shared/ui/button';

interface EstimateWaitProps {
  driverName: string;
  shortIntro?: string;
  driverImageUrl?: string;
  rating: number;
  reviewCount: number;
  experience: string;
  moveCount: string;
  movingType?: 'small' | 'home' | 'office';
  pickedDriver?: boolean;
  isLiked?: boolean;
  likeCount?: number;
  estimatePrice: number;
  onDetailClick?: () => void;
  onConfirmClick?: () => void;
  onLikeClick?: () => void;
}

const EstimateWait = ({
  driverName,
  shortIntro,
  driverImageUrl,
  rating,
  reviewCount,
  experience,
  moveCount,
  movingType,
  pickedDriver = false,
  isLiked,
  likeCount,
  estimatePrice,
  onDetailClick,
  onConfirmClick,
  onLikeClick = () => {},
}: EstimateWaitProps) => {
  return (
    <article className="mobile:rounded-xl mobile:p-4 tab:rounded-xl tab:p-5 mobile:max-w-[327px] w-full max-w-[558px] rounded-2xl bg-white p-6 shadow-md">
      <div className="mobile:gap-3 tab:gap-3 flex flex-col gap-4">
        <div className="relative flex flex-col gap-4">
          <header className="flex w-fit flex-row gap-2">
            {movingType && <MovingTypeChip movingType={movingType} />}
            {pickedDriver && <MovingTypeChip movingType="assign" />}
          </header>

          <section className="flex flex-col gap-2">
            <h3 className="mobile:text-lg tab:text-lg text-xl font-semibold text-[#1a1a1a]">
              {shortIntro}
            </h3>

            <DriverInfo
              driverName={driverName}
              driverImageUrl={driverImageUrl}
              rating={rating}
              reviewCount={reviewCount}
              experience={experience}
              moveCount={moveCount}
              showLikeButton={true}
              isLiked={isLiked}
              likeCount={likeCount}
              type="estimateWait"
              onLikeClick={onLikeClick}
            />
          </section>

          <hr className="border-gray-100" />

          <section className="flex items-center justify-between">
            <span className="mobile:text-md tab:text-md text-lg font-medium text-[#6b6b6b]">
              견적 금액
            </span>
            <strong className="mobile:text-xl tab:text-xl text-2xl font-bold text-[#1a1a1a]">
              {estimatePrice.toLocaleString()}원
            </strong>
          </section>

          <footer className="mobile:flex-col-reverse tab:flex-row flex w-full flex-row gap-3">
            <Button variant="outlined" design="primary" size="sm" onClick={onDetailClick}>
              상세보기
            </Button>
            <Button variant="solid" design="primary" size="sm" onClick={onConfirmClick}>
              견적 확정하기
            </Button>
          </footer>
        </div>
      </div>
    </article>
  );
};

export default EstimateWait;
