import { api } from '@/shared/api/client';
import { paths } from '@/shared/types/openapi';
import { CursorResponse } from '../ui/Pagenation';

export type getDriverListResponse =
  paths['/api/drivers']['get']['responses'][200]['content']['application/json'];

export type DriverListType =
  paths['/api/drivers']['get']['responses'][200]['content']['application/json']['data'];

type getDriverListParams = paths['/api/drivers']['get']['parameters']['query'];

// export async function getDriverList({
//   params,
// }: {
//   params: getDriverListParams;
// }): Promise<CursorResponse<DriverListType>> {
//   const res = await api.get<getDriverListResponse>('drivers', { searchParams: params });
//   // return ( {
//   //   items: res.data || [],
//   //   hasNext: res.pagination || false,
//   //   nextCursor: res.pagination?.nextCursor || '',
//   // }: {items: getDriverListResponse} );
// }

type getFavoriteDriversResponse =
  paths['/api/favorite']['get']['responses'][200]['content']['application/json'];
type getFavoriteDriversParams = paths['/api/favorite']['get']['parameters']['query'];

// export async function getFavoriteDrivers({
//   params,
// }: {
//   params: getFavoriteDriversParams;
// }): Promise<CursorResponse<getFavoriteDriversResponse['data']>> {
//   const res = await api.get<getFavoriteDriversResponse>('favorite', { searchParams: params });

//   console.log(res);

//   return {
//     items: res.data || [],
//     hasNext: res.pagination || false,
//     nextCursor: res.pagination?.nextCursor || '',
//   };
// }
