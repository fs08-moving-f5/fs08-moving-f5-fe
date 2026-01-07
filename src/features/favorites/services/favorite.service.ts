import { api } from '@/shared/api/client';
import type { components, paths } from '@/shared/types/openapi';

type FavoriteResponse =
  paths['/api/favorite/driver/{driverId}']['post']['responses'][201]['content']['application/json'];

type DeleteFavoriteResponse =
  paths['/api/favorite/driver/{driverId}']['delete']['responses'][200]['content']['application/json'];

type GetFavoriteDriversResponse =
  paths['/api/favorite']['get']['responses'][200]['content']['application/json'];

type DeleteManyFavoriteDriversResponse =
  paths['/api/favorite/driver']['delete']['responses'][200]['content']['application/json'];

export const addFavoriteDriver = async (driverId: string) => {
  const res = await api.post<FavoriteResponse>(`favorite/driver/${driverId}`);
  return res.data;
};

export const deleteFavoriteDriver = async (driverId: string) => {
  const res = await api.delete<DeleteFavoriteResponse>(`favorite/driver/${driverId}`);
  return res.data;
};

export const getFavoriteDrivers = async ({
  cursor,
  limit,
}: {
  cursor?: string;
  limit?: number;
}) => {
  const res = await api.get<GetFavoriteDriversResponse>(`favorite`, {
    searchParams: {
      cursor,
      limit,
    },
  });
  return res.data;
};

export const deleteManyFavoriteDrivers = async (driverIds: string[]) => {
  const res = await api.delete<DeleteManyFavoriteDriversResponse>(`favorite/driver`, driverIds);
  return res.data;
};

export type FavoriteDriver = components['schemas']['FavoriteDriverWithDetails'];
export type DeleteManyFavoriteDrivers = components['schemas']['DeleteResponse'];
