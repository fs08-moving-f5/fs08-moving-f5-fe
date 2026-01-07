import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addFavoriteDriver,
  deleteFavoriteDriver,
  deleteManyFavoriteDrivers,
} from '../../services/favorite.service';
import { showToast } from '@/shared/ui/sonner';
import { confirmEstimate } from '../../../my-estimates/services/estimate.service';
import FAVORITES_QUERY_KEY from '../../constants/queryKey';

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

export const useDeleteManyFavoriteDriversMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteManyFavoriteDrivers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY.FAVORITE_DRIVERS });
      showToast({ kind: 'success', message: '기사님 찜하기를 삭제했습니다.' });
    },
    onError: () => {
      showToast({ kind: 'error', message: '기사님 찜하기 삭제에 실패했습니다.' });
    },
  });
};
