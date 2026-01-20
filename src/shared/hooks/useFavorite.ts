import { showToast } from '../ui/sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addFavoriteDriver,
  deleteFavoriteDriver,
} from '@/features/favorites/services/favorite.service';
import MY_ESTIMATES_QUERY_KEY from '@/features/my-estimates/constants/queryKey';
import DRIVERS_QUERY_KEY from '@/features/drivers/constants/queryKey';

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

export const useHandleFavorite = (estimateId?: string) => {
  const queryClient = useQueryClient();

  const { mutate: addFavoriteDriver } = useFavoriteMutation();
  const { mutate: deleteFavoriteDriver } = useDeleteFavoriteMutation();

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: MY_ESTIMATES_QUERY_KEY.RECEIVED_ESTIMATE });
    queryClient.invalidateQueries({ queryKey: MY_ESTIMATES_QUERY_KEY.PENDING_ESTIMATE });
    queryClient.invalidateQueries({ queryKey: DRIVERS_QUERY_KEY.DRIVER });
    queryClient.invalidateQueries({ queryKey: DRIVERS_QUERY_KEY.FAVORITE_DRIVERS });

    if (estimateId) {
      queryClient.invalidateQueries({
        queryKey: MY_ESTIMATES_QUERY_KEY.PENDING_ESTIMATE_DETAIL(estimateId),
      });
    }
  };

  return ({ driverId, isLiked }: { driverId: string; isLiked: boolean }) => {
    const mutate = isLiked ? deleteFavoriteDriver : addFavoriteDriver;
    mutate(driverId, { onSuccess: handleSuccess });
  };
};
