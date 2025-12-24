import { useMutation } from '@tanstack/react-query';
import { addFavoriteDriver, deleteFavoriteDriver } from '../../services/favorite.service';
import { queryClient } from '@/shared/lib/queryClient';
import QUERY_KEY from '../../constants/queryKey';
import { showToast } from '@/shared/ui/sonner';

export const useFavoriteMutation = () => {
  return useMutation({
    mutationFn: addFavoriteDriver,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PENDING_ESTIMATES] });
    },
    onError: () => {
      showToast({ kind: 'error', message: '기사님 찜하기에 실패했습니다.' });
    },
  });
};

export const useDeleteFavoriteMutation = () => {
  return useMutation({
    mutationFn: deleteFavoriteDriver,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PENDING_ESTIMATES] });
    },
    onError: () => {
      showToast({ kind: 'error', message: '기사님 찜하기 취소에 실패했습니다.' });
    },
  });
};
