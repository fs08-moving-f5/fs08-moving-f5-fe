import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReview } from '../services/reviews.service';

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', 'writable'] });
      queryClient.invalidateQueries({ queryKey: ['reviews', 'written'] });
    },
  });
};
