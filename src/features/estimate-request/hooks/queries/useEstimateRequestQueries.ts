import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import QUERY_KEY_ESTIMATE_REQUEST from '../../constants/queryKey';
import QUERY_KEY_MY_ESTIMATES from '@/features/my-estimates/constants/queryKey';

import {
  createEstimateRequest,
  createEstimateRequestWithGeocode,
  getPendingEstimateRequests,
} from '../../services/estimateRequest.service';
import { showToast } from '@/shared/ui/sonner';
import { useRouter } from 'next/navigation';

const { PENDING_ESTIMATE_REQUEST } = QUERY_KEY_ESTIMATE_REQUEST;
const { PENDING_ESTIMATE } = QUERY_KEY_MY_ESTIMATES;

export const useGetPendingEstimateRequestsQuery = () => {
  return useQuery({
    queryKey: [PENDING_ESTIMATE_REQUEST],
    queryFn: getPendingEstimateRequests,
  });
};

export const useCreateEstimateRequestMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn: createEstimateRequest,
    mutationFn: createEstimateRequestWithGeocode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PENDING_ESTIMATE_REQUEST] });
      queryClient.invalidateQueries({ queryKey: [PENDING_ESTIMATE] });
      showToast({
        kind: 'success',
        message: '견적 요청에 성공했습니다.',
      });
      router.push('/user/my/estimates/pending');
    },
    onError: () => {
      showToast({
        kind: 'error',
        message: '견적 요청에 실패했습니다.',
      });
    },
  });
};
