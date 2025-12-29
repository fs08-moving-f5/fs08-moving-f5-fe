import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getReviewWritable, getReviewWritten } from '../services/reviews.service';
import { OffsetPaginationResponse } from '../types/review';

export type ReviewListType = 'writable' | 'written';

interface UseReviewListParams {
  type: ReviewListType;
  page: number;
  limit?: number;
}

export function useReviewList<T>({ type, page, limit = 10 }: UseReviewListParams) {
  const offset = (page - 1) * limit;

  return useQuery<OffsetPaginationResponse<T>>({
    queryKey: ['reviews', type, page, limit],
    queryFn: () => {
      if (type === 'writable') {
        return getReviewWritable({ offset, limit }) as Promise<OffsetPaginationResponse<T>>;
      }

      return getReviewWritten({ offset, limit }) as Promise<OffsetPaginationResponse<T>>;
    },
    placeholderData: keepPreviousData,
  });
}
