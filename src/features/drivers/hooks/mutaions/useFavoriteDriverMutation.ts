import {
  addFavoriteDriver,
  deleteFavoriteDriver,
} from '@/features/favorites/services/favorite.service';
import { showToast } from '@/shared/ui/sonner';
import { useMutation } from '@tanstack/react-query';

export const useAddFavoriteMutation = () => {
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
