import { MovingTypeChip } from '@/shared/ui/chip';

import type { PendingDetailDriverInfoProps } from '../../types/pendingDetailTypes';
import Image from 'next/image';

const movingTypeMap: Record<
  'SMALL_MOVING' | 'HOME_MOVING' | 'OFFICE_MOVING',
  'small' | 'home' | 'office'
> = {
  SMALL_MOVING: 'small',
  HOME_MOVING: 'home',
  OFFICE_MOVING: 'office',
};

const PendingEstimateDriverInfo = ({
  movingType,
  isDesignated,
  shortIntro,
  estimateStatus,
  driverName,
  favoriteCount,
  rating,
  career,
  moveCount,
  reviewCount,
}: PendingDetailDriverInfoProps) => {
  const stroke = (
    <svg xmlns="http://www.w3.org/2000/svg" width="741" height="1" viewBox="0 0 741 1" fill="none">
      <path d="M0 0.5H741" stroke="#F2F2F2" />
    </svg>
  );

  const colStroke = (
    <svg xmlns="http://www.w3.org/2000/svg" width="1" height="14" viewBox="0 0 1 14" fill="none">
      <path d="M0.5 0V14" stroke="#E6E6E6" />
    </svg>
  );

  return (
    <div className="w-full bg-white">
      <div className="container-responsive tab:max-w-[600px] mobile:max-w-[335px] flex max-w-[740px] flex-col gap-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <MovingTypeChip movingType={movingTypeMap[movingType]} />
            {isDesignated && <MovingTypeChip movingType="assign" />}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-black-300 text-2xl font-semibold">{shortIntro}</div>
            <div className="px-2 text-lg font-semibold text-gray-300">
              {estimateStatus === 'PENDING' ? '견적대기' : estimateStatus}
            </div>
          </div>
        </div>
        {stroke}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Image src="/icons/driver-moving.svg" alt="driver-moving" width={20} height={23} />
              <div className="text-black-300 text-2lg font-semibold">{driverName} 기사님</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="text-2lg font-medium text-gray-500">{favoriteCount}</div>
              <Image src="/icons/like-empty.svg" alt="like-empty" width={24} height={24} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-[2px]">
              <Image src="/icons/star.svg" alt="star" width={20} height={20} />
              <div className="text-black-300 text-md font-normal">{rating}</div>
              <div className="text-md font-normal text-gray-300">({reviewCount})</div>
            </div>
            {colStroke}
            <div className="flex items-center gap-1">
              <div className="text-md font-normal text-gray-300">경력</div>
              <div className="text-black-300 text-md font-normal">{career}</div>
            </div>
            {colStroke}
            <div className="flex items-center gap-1">
              <div className="text-black-300 text-md font-normal">{moveCount}</div>
              <div className="text-md font-normal text-gray-300">확정</div>
            </div>
          </div>
        </div>
        {stroke}
      </div>
    </div>
  );
};

export default PendingEstimateDriverInfo;
