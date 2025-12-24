import { useMutation } from '@tanstack/react-query';
import { addFavoriteDriver, deleteFavoriteDriver } from '../../services/favorite.service';
import { showToast } from '@/shared/ui/sonner';
import { confirmEstimate } from '../../services/estimate.service';

export const useFavoriteMutation = () => {
  return useMutation({
    mutationFn: addFavoriteDriver,
    onError: () => {
      showToast({ kind: 'error', message: '기사님 찜하기에 실패했습니다.' });
    },
  });
};

export const useDeleteFavoriteMutation = () => {
  return useMutation({
    mutationFn: deleteFavoriteDriver,
    onError: () => {
      showToast({ kind: 'error', message: '기사님 찜하기 취소에 실패했습니다.' });
    },
  });
};

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
