'use client';

import PendingEstimatesTab from '@/features/my-estimates/ui/tab';
import PendingEstimatesSubHeader from '@/features/my-estimates/ui/subHeader';
import { combineAddress } from '@/features/my-estimates/lib/address';
import { formatDateOnlyDate, formatDateWithWeekday } from '@/shared/lib/day';
import { PendingCardContainer } from '@/features/my-estimates/ui/cardContainer';
import { useGetPendingEstimatesQuery } from '@/features/my-estimates/hooks/queries/useEstimateQueries';
import { EmptyData } from '@/shared/ui/empty';
import Spinner from '@/shared/ui/spinner';
import { EmptyRedirect } from '@/shared/ui/empty';

const movingTypeMap: Record<string, string> = {
  SMALL_MOVING: '소형이사',
  HOME_MOVING: '가정이사',
  OFFICE_MOVING: '사무실이사',
};

const PendingEstimatesPageClient = () => {
  const { data: pendingEstimates, isLoading: pendingEstimatesLoading } =
    useGetPendingEstimatesQuery();

  const estimateRequestData = pendingEstimates;
  const estimateData = pendingEstimates?.estimates;

  const formattedCreatedAt = formatDateOnlyDate(estimateRequestData?.createdAt ?? '');
  const formattedMovingDate = formatDateWithWeekday(estimateRequestData?.movingDate ?? '');

  return (
    <>
      <Spinner isLoading={pendingEstimatesLoading} />
      <div className="bg-bg-100">
        <PendingEstimatesTab activeTab="pending" />
        {estimateRequestData && (
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
        )}
        {!estimateRequestData ? (
          <div className="tab:min-h-[657px] mobile:min-h-[417px] flex min-h-[900px] w-full items-center justify-center">
            <EmptyRedirect
              message="견적 요청이 없어요."
              subMessage="견적 요청 페이지로 이동합니다."
              redirectPath="/user/estimates/request"
              redirectButtonText="견적 요청하러 가기"
            />
          </div>
        ) : estimateData?.length === 0 ? (
          <div className="tab:min-h-[657px] mobile:min-h-[417px] flex min-h-[900px] w-full items-center justify-center">
            <EmptyData
              message="기사님들이 열심히 확인 중이에요"
              subMessage="곧 견적이 도착할 거예요!"
            />
          </div>
        ) : (
          <PendingCardContainer
            estimates={estimateData}
            movingType={estimateRequestData?.movingType ?? 'SMALL_MOVING'}
          />
        )}
      </div>
    </>
  );
};

export default PendingEstimatesPageClient;
