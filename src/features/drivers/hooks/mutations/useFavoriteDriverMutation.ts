import {
  addFavoriteDriver,
  deleteFavoriteDriver,
} from '@/features/favorites/services/favorite.service';
import { showToast } from '@/shared/ui/sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DRIVERS_QUERY_KEY from '../../constants/queryKey';

export const useAddFavoriteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addFavoriteDriver,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DRIVERS_QUERY_KEY.DRIVER });
      queryClient.invalidateQueries({ queryKey: DRIVERS_QUERY_KEY.FAVORITE_DRIVERS });
    },
    onError: () => {
      showToast({ kind: 'error', message: '기사님 찜하기에 실패했습니다.' });
    },
  });
};

export const useDeleteFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFavoriteDriver,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DRIVERS_QUERY_KEY.DRIVER });
      queryClient.invalidateQueries({ queryKey: DRIVERS_QUERY_KEY.FAVORITE_DRIVERS });
    },
    onError: () => {
      showToast({ kind: 'error', message: '기사님 찜하기 취소에 실패했습니다.' });
    },
  });
};
