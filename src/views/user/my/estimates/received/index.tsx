'use client';

import ReceivedEstimatesTab from '@/features/my-estimates/ui/tab';
import { ReceivedCardContainer } from '@/features/my-estimates/ui/cardContainer';
import { useGetReceivedEstimatesQuery } from '@/features/my-estimates/hooks/queries/useEstimateQueries';
import { ReceivedEstimate } from '@/features/my-estimates/services/estimate.service';
import Spinner from '@/shared/ui/spinner';
import { useIntersectionObserver } from '@/shared/hooks/useIntersectionObserver';

const ReceivedEstimatesPageClient = () => {
  const {
    data,
    isLoading: receivedEstimatesLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetReceivedEstimatesQuery();

  // TODO: 타입 추론 개선
  const estimateRequests: ReceivedEstimate[] = (data?.pages?.flat() as ReceivedEstimate[]) ?? [];

  const { ref } = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: hasNextPage && !isFetchingNextPage,
  });

  return (
    <>
      <Spinner isLoading={receivedEstimatesLoading} />
      <div className="bg-bg-100">
        <ReceivedEstimatesTab activeTab="received" />
        <div className="tab:mt-[32px] mobile:mt-[32px] tab:gap-4 mobile:gap-1 mt-[64px] mb-[122px] flex flex-col gap-10">
          <ReceivedCardContainer estimateRequests={estimateRequests} />
          {hasNextPage && <div ref={ref} className="h-4" />}
        </div>
      </div>
    </>
  );
};

export default ReceivedEstimatesPageClient;
