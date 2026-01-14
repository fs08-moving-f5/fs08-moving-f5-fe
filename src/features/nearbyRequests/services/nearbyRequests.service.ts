import { api } from '@/shared/api/client';
import type { NearbyRequestList, NearbyRequestsResponse, MyPageResponse } from '../types';

export const getNearbyRequests = async ({ radiusKm = 20 }: { radiusKm?: number }) => {
  const res = await api.get<NearbyRequestsResponse['data']>('drivers/me/requests/nearby', {
    searchParams: {
      radiusKm,
    },
  });
  return res.data as NearbyRequestList;
};

export const getMyPage = async () => {
  const res = await api.get<MyPageResponse['data']>('my-page');
  return res.data;
};
