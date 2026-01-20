import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import QUERY_KEY from '../../constants/queryKey';
import MY_ESTIMATES_QUERY_KEY from '@/features/my-estimates/constants/queryKey';
import {
  createEstimateRequest,
  createEstimateRequestWithGeocode,
  getPendingEstimateRequests,
} from '../../services/estimateRequest.service';
import { showToast } from '@/shared/ui/sonner';
import { useRouter } from 'next/navigation';

export const useGetPendingEstimateRequestsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.PENDING_ESTIMATE_REQUEST],
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
      //queryClient.invalidateQueries()
      queryClient.invalidateQueries({ queryKey: MY_ESTIMATES_QUERY_KEY.PENDING_ESTIMATE });
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
