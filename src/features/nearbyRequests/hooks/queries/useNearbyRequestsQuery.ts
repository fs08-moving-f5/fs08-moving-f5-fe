import { useQuery } from '@tanstack/react-query';
import NEARBY_REQUESTS_QUERY_KEY from '../../constants/queryKey';
import { getMyPage, getNearbyRequests } from '../../services/nearbyRequests.service';

export const useGetNearbyQuery = (radiusKm?: number) => {
  return useQuery({
    queryKey: NEARBY_REQUESTS_QUERY_KEY.NEARBY_REQUESTS(radiusKm ?? 20),
    queryFn: () => getNearbyRequests({ radiusKm }),
  });
};

export const useGetMyPageQuery = () => {
  return useQuery({
    queryKey: NEARBY_REQUESTS_QUERY_KEY.MY_PAGE,
    queryFn: getMyPage,
  });
};
