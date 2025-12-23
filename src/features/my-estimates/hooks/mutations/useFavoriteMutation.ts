import { useMutation } from '@tanstack/react-query';
import { addFavoriteDriver, deleteFavoriteDriver } from '../../services/favorite.service';
import { showToast } from '@/shared/ui/sonner';

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
