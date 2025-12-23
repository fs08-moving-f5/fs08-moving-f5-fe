'use client';

import PendingEstimatesTab from '@/features/my-estimates/ui/tab';
import PendingEstimatesSubHeader from '@/features/my-estimates/ui/subHeader';
import { combineAddress } from '@/features/my-estimates/lib/address';
import { formatDateOnlyDate, formatDateWithWeekday } from '@/shared/lib/day';
import { PendingCardContainer } from '@/features/my-estimates/ui/cardContainer';
import { useGetPendingEstimatesQuery } from '@/features/my-estimates/hooks/queries/useEstimateQueries';

const movingTypeMap: Record<string, string> = {
  SMALL_MOVING: '소형이사',
  HOME_MOVING: '가정이사',
  OFFICE_MOVING: '사무실이사',
};

const PendingEstimatesPageClient = () => {
  const { data: pendingEstimates } = useGetPendingEstimatesQuery();

  const estimateRequestData = pendingEstimates;
  const estimateData = pendingEstimates?.estimates;

  const formattedCreatedAt = formatDateOnlyDate(estimateRequestData?.createdAt ?? '');
  const formattedMovingDate = formatDateWithWeekday(estimateRequestData?.movingDate ?? '');

  return (
    <div className="bg-bg-100">
      <PendingEstimatesTab activeTab="pending" />
      <PendingEstimatesSubHeader
        movingType={movingTypeMap[estimateRequestData?.movingType ?? '']}
        movingDate={formattedMovingDate}
        applyAt={formattedCreatedAt}
        fromAddress={combineAddress({
          sido: estimateRequestData?.addresses?.[0]?.sido ?? '',
          sigungu: estimateRequestData?.addresses?.[0]?.sigungu ?? '',
        })}
        toAddress={combineAddress({
          sido: estimateRequestData?.addresses?.[1]?.sido ?? '',
          sigungu: estimateRequestData?.addresses?.[1]?.sigungu ?? '',
        })}
      />
      <PendingCardContainer
        estimates={estimateData}
        movingType={estimateRequestData?.movingType ?? 'SMALL_MOVING'}
      />
    </div>
  );
};

export default PendingEstimatesPageClient;
