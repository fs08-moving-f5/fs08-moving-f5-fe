import { apiClient } from './index';
import {
  GetRequestsParams,
  EstimateRequestRaw,
  EstimateRequestResponse,
} from '@/shared/types/driverEstimate';
import { convertDateType1, convertDateType2 } from '@/shared/lib/convertDate';
import { convertMovingType } from '@/shared/lib/convertMovingType';

export const getRequests = async ({
  cursor,
  ...params
}: GetRequestsParams): Promise<EstimateRequestResponse> => {
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
    data: list.map((r) => ({
      id: r.id,
      customerName: r.name,
      movingType: convertMovingType(r.movingType),
      pickedDriver: r.isDesignated,
      pickupAddress: r.from ? `${r.from.sido} ${r.from.sigungu}` : '',
      dropoffAddress: r.to ? `${r.to.sido} ${r.to.sigungu}` : '',
      movingDate: convertDateType1(new Date(r.movingDate)),
      requestTime: convertDateType2(new Date(r.movingDate)),
    })),
    nextCursor: list.length ? list[list.length - 1].id : null,
  };
};
