import { useInfiniteQuery } from '@tanstack/react-query';
import FAVORITES_QUERY_KEY from '../../constants/queryKey';
import { getFavoriteDrivers } from '../../services/favorite.service';

export const useGetFavoriteDriversQuery = () => {
  return useInfiniteQuery({
    queryKey: FAVORITES_QUERY_KEY.FAVORITE_DRIVERS,
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      getFavoriteDrivers({ cursor: pageParam, limit: 15 }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage?.pagination?.hasNext ? lastPage?.pagination?.nextCursor : undefined;
    },
  });
};
