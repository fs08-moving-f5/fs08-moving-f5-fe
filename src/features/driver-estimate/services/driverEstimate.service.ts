import { apiClient } from '@/shared/api/index';
import {
  GetRequestsParams,
  EstimateRequestRaw,
  EstimateRequestResponse,
} from '@/features/driver-estimate/types/driverEstimate';
import { convertDateType1, convertDateType2 } from '@/shared/lib/convertDate';
import { convertMovingType } from '@/shared/lib/convertMovingType';

export const getRequests = async ({
  cursor,
  ...params
}: GetRequestsParams): Promise<EstimateRequestResponse> => {
  const res = await apiClient
    .get('estimate-request/driver/requests', {
      searchParams: {
        ...params,
        ...(cursor && { cursor }),
      },
    })
    .json<{ data: EstimateRequestRaw[] }>();

  const list = res.data ?? [];

  return {
    data: list.map((r) => {
      const requestTimeSource = r.updatedAt ?? r.createdAt;

      return {
        id: r.id,
        customerName: r.name,
        movingType: convertMovingType(r.movingType),
        pickedDriver: r.isDesignated,
        pickupAddress: r.from ? `${r.from.sido} ${r.from.sigungu}` : '',
        dropoffAddress: r.to ? `${r.to.sido} ${r.to.sigungu}` : '',
        movingDate: convertDateType1(new Date(r.movingDate)),
        requestTime: convertDateType2(new Date(requestTimeSource)),
      };
    }),
    nextCursor: list.length ? list[list.length - 1].id : null,
  };
};

export interface SendEstimateParams {
  estimateRequestId: string;
  price: number;
  comment: string;
}

export interface RejectEstimateParams {
  estimateRequestId: string;
  rejectReason: string;
}

export const sendEstimate = async ({ estimateRequestId, price, comment }: SendEstimateParams) => {
  return apiClient.post(`estimate-request/driver/requests/${estimateRequestId}/create`, {
    json: { price, comment },
  });
};

export const rejectEstimate = async ({ estimateRequestId, rejectReason }: RejectEstimateParams) => {
  return apiClient.post(`estimate-request/driver/requests/${estimateRequestId}/reject`, {
    json: { rejectReason },
  });
};
