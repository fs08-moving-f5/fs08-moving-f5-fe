import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getPendingEstimateDetail,
  getPendingEstimates,
  getReceivedEstimates,
} from '../../services/estimate.service';
import MY_ESTIMATES_QUERY_KEY from '@/features/my-estimates/constants/queryKey';

export const useGetPendingEstimatesQuery = () => {
  return useQuery({
    queryKey: MY_ESTIMATES_QUERY_KEY.PENDING_ESTIMATE,
    queryFn: getPendingEstimates,
  });
};

export const useGetPendingEstimateDetailQuery = ({ estimateId }: { estimateId: string }) => {
  return useQuery({
    queryKey: MY_ESTIMATES_QUERY_KEY.PENDING_ESTIMATE_DETAIL(estimateId),
    queryFn: () => getPendingEstimateDetail({ estimateId }),
  });
};

export const useGetReceivedEstimatesQuery = () => {
  return useInfiniteQuery({
    queryKey: MY_ESTIMATES_QUERY_KEY.RECEIVED_ESTIMATE,
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      getReceivedEstimates({ cursor: pageParam, limit: 15 }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage?.pagination?.hasNext ? lastPage?.pagination?.nextCursor : undefined;
    },
  });
};
