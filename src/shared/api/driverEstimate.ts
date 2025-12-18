import { apiClient } from './index';
import { GetRequestsParams, EstimateRequestRaw } from '@/shared/types/driverEstimate';

export const getRequests = async ({ cursor, ...params }: GetRequestsParams) => {
  const res = await apiClient
    .get('requests', {
      searchParams: {
        ...params,
        ...(cursor && { cursor }),
      },
    })
    .json<{ data: EstimateRequestRaw[] }>();

  const list = res.data ?? [];

  return {
    data: list,
    nextCursor: list.length > 0 ? list[list.length - 1].id : null,
  };
};
