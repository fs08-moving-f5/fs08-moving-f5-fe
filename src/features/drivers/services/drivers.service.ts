import { api } from '@/shared/api/client';
import { paths } from '@/shared/types/openapi';
import { CursorResponse } from '../ui/Pagenation';

type ElementType<T> = T extends (infer U)[] ? U : never;

export type getDriverListResponse =
  paths['/api/drivers']['get']['responses'][200]['content']['application/json'];

export type DriverInfoType = ElementType<getDriverListResponse['data']>;

type getDriverListParams = paths['/api/drivers']['get']['parameters']['query'];

export async function getDriverList({ params }: { params: getDriverListParams }) {
  const res = await api.get<getDriverListResponse['data']>('drivers', { searchParams: params });
  const result: CursorResponse<DriverInfoType> = {
    items: res.data || [],
    hasNext: res.pagination?.hasNext || false,
    nextCursor: res.pagination?.nextCursor || '',
  };
  return result;
}

type getFavoriteDriversResponse =
  paths['/api/favorite']['get']['responses'][200]['content']['application/json'];
type getFavoriteDriversParams = paths['/api/favorite']['get']['parameters']['query'];
export type FavoriteDriverInfoType = ElementType<getFavoriteDriversResponse['data']>;

export async function getFavoriteDrivers({ params }: { params: getFavoriteDriversParams }) {
  const res = await api.get<getFavoriteDriversResponse['data']>('favorite', {
    searchParams: params,
  });
  const result: CursorResponse<FavoriteDriverInfoType> = {
    items: res.data || [],
    hasNext: res.pagination?.hasNext || false,
    nextCursor: res.pagination?.nextCursor || '',
  };
  return result;
}
