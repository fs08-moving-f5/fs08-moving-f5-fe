import { useMutation } from '@tanstack/react-query';
import { confirmEstimate } from '../../services/estimate.service';
import { showToast } from '@/shared/ui/sonner';

export const useConfirmEstimateMutation = () => {
  return useMutation({
    mutationFn: confirmEstimate,
    onSuccess: () => {
      showToast({ kind: 'success', message: '견적을 확정했습니다.' });
    },
    onError: () => {
      showToast({ kind: 'error', message: '견적 확정에 실패했습니다.' });
    },
  });
};
