'use client';

import PendingEstimatesTab from '@/features/my-estimates/ui/tab';
import PendingEstimatesSubHeader from '@/features/my-estimates/ui/subHeader';
import { combineAddress } from '@/features/my-estimates/lib/address';
import { formatDateOnlyDate, formatDateWithWeekday } from '@/shared/lib/day';
import { PendingCardContainer } from '@/features/my-estimates/ui/cardContainer';
import { useGetPendingEstimatesQuery } from '@/features/my-estimates/hooks/queries/useEstimateQueries';

// TODO: 실제 데이터 받아오기
const mockEstimateRequest = {
  movingType: 'SMALL_MOVING',
  movingDate: '2025-11-20T10:23:02.997Z',
  createdAt: '2025-12-15T10:23:03.104Z',
  addresses: [
    {
      addressType: 'FROM',
      sido: '서울특별시',
      sigungu: '강남구',
    },
    {
      addressType: 'TO',
      sido: '서울특별시',
      sigungu: '송파구',
    },
  ],
};

const movingTypeMap: Record<string, string> = {
  SMALL_MOVING: '소형이사',
  HOME_MOVING: '가정이사',
  OFFICE_MOVING: '사무실이사',
};

const PendingEstimatesPageClient = () => {
  const { data: pendingEstimates } = useGetPendingEstimatesQuery();

  // const estimateRequestData = pendingEstimates?.data?.estimateRequest;

  const formattedCreatedAt = formatDateOnlyDate(mockEstimateRequest.createdAt);
  const formattedMovingDate = formatDateWithWeekday(mockEstimateRequest.movingDate);

  return (
    <div className="bg-bg-100">
      <PendingEstimatesTab activeTab="pending" />
      <PendingEstimatesSubHeader
        movingType={movingTypeMap[mockEstimateRequest.movingType]}
        movingDate={formattedMovingDate}
        applyAt={formattedCreatedAt}
        fromAddress={combineAddress(mockEstimateRequest.addresses[0])}
        toAddress={combineAddress(mockEstimateRequest.addresses[1])}
      />
      <PendingCardContainer />
    </div>
  );
};

export default PendingEstimatesPageClient;
