import { useQuery } from '@tanstack/react-query';
import QUERY_KEY from '../../constants/queryKey';
import { getPendingEstimates } from '../../services/estimate.service';

export const useGetPendingEstimatesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.PENDING_ESTIMATES],
    queryFn: getPendingEstimates,
  });
};
