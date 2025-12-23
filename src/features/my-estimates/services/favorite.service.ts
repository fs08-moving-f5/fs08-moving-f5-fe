import { api } from '@/shared/api/client';
import type { paths } from '@/shared/types/openapi';

type FavoriteResponse =
  paths['/api/favorite/driver/{driverId}']['post']['responses'][201]['content']['application/json'];

type DeleteFavoriteResponse =
  paths['/api/favorite/driver/{driverId}']['delete']['responses'][200]['content']['application/json'];

export const addFavoriteDriver = async (driverId: string) => {
  const res = await api.post<FavoriteResponse>(`favorite/driver/${driverId}`);
  return res.data;
};

export const deleteFavoriteDriver = async (driverId: string) => {
  const res = await api.delete<DeleteFavoriteResponse>(`favorite/driver/${driverId}`);
  return res.data;
};
