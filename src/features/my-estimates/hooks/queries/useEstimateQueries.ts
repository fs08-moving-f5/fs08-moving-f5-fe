import { useQuery } from '@tanstack/react-query';
import QUERY_KEY from '../../constants/queryKey';
import { getPendingEstimateDetail, getPendingEstimates } from '../../services/estimate.service';

export const useGetPendingEstimatesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.PENDING_ESTIMATES],
    queryFn: getPendingEstimates,
  });
};

export const useGetPendingEstimateDetailQuery = ({ estimateId }: { estimateId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEY.PENDING_ESTIMATE_DETAIL, estimateId],
    queryFn: () => getPendingEstimateDetail({ estimateId }),
  });
};
