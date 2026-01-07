import { apiClient } from '@/shared/api/index';
// import type { paths, components } from '@/shared/types/openapi';

import {
  GetRequestsUIParams,
  EstimateRequestRaw,
  EstimateRequestResponse,
  FrontFilter,
  BackendFilter,
  SendEstimateParams,
  RejectEstimateParams,
  EstimateListResponse,
  EstimateConfirmRaw,
  GetConfirmEstimatesParams,
  EstimateRejectRaw,
  ConfirmDetailPageProps,
  EstimateConfirmDetailRaw,
} from '@/features/driver-estimate/types/driverEstimate';
import { convertDateType1, convertDateType2 } from '@/shared/lib/convertDate';
import { convertMovingType, convertMovingTypeToBackend } from '@/shared/lib/convertMovingType';

const convertSort: Record<FrontFilter, BackendFilter> = {
  Latest: 'latest',
  Oldest: 'oldest',
  HighestMovingDate: 'moving-latest',
  LowestMovingDate: 'moving-oldest',
};

// 받은 요청 목록 조회
export const getRequests = async ({
  cursor,
  sort,
  movingTypes,
  keyword,
  onlyDesignated,
  onlyServiceable,
  take,
}: GetRequestsUIParams): Promise<EstimateRequestResponse> => {
  const searchParams = new URLSearchParams();

  if (sort) searchParams.set('sort', convertSort[sort]);
  if (keyword) searchParams.set('search', keyword);
  if (onlyDesignated) searchParams.set('isDesignated', 'true');
  if (onlyServiceable) searchParams.set('serviceRegionFilter', 'true');
  if (cursor) searchParams.set('cursor', cursor);
  if (take) searchParams.set('take', String(take));
  if (movingTypes?.length) {
    movingTypes.forEach((type) => {
      const backendType = convertMovingTypeToBackend(type);
      if (backendType) {
        searchParams.append('movingTypes', backendType);
      }
    });
  }

  const res = await apiClient
    .get('estimate-request/driver/requests', { searchParams })
    .json<{ data: EstimateRequestRaw[] }>();

  const list = res.data ?? [];

  return {
    data: list.map((r) => {
      const requestTimeSource = r.updatedAt ?? r.createdAt;
      const movingType = convertMovingType(r.movingType);

      if (!movingType) {
        throw new Error(`Invalid movingType: ${r.movingType}`);
      }

      return {
        id: r.id,
        customerName: r.user.name,
        movingType,
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

// 견적 생성
export const sendEstimate = async ({ estimateRequestId, price, comment }: SendEstimateParams) => {
  return apiClient.post(`estimate-request/driver/requests/${estimateRequestId}/create`, {
    json: { estimateRequestId, price, comment },
  });
};

// 견적 반려
export const rejectEstimate = async ({ estimateRequestId, rejectReason }: RejectEstimateParams) => {
  return apiClient.post(`estimate-request/driver/requests/${estimateRequestId}/reject`, {
    json: { estimateRequestId, rejectReason },
  });
};

// 확정 견적 목록 조회
export const getConfirmEstimates = async ({
  cursor,
}: GetConfirmEstimatesParams): Promise<EstimateListResponse> => {
  const res = await apiClient
    .get('estimate-request/driver/confirms', {
      searchParams: {
        ...(cursor && { cursor }),
      },
    })
    .json<{ data: EstimateConfirmRaw[] }>();

  const list = res.data ?? [];

  return {
    data: list.map((r) => ({
      id: r.id,
      customerName: r.user.name,
      movingType: convertMovingType(r.movingType),
      pickedDriver: r.isDesignated,
      pickupAddress: r.from ? `${r.from.sido} ${r.from.sigungu}` : '',
      dropoffAddress: r.to ? `${r.to.sido} ${r.to.sigungu}` : '',
      movingDate: convertDateType1(new Date(r.movingDate)),
      estimatePrice: r.price,
      isConfirmed: r.status === 'CONFIRMED',
      status: r.type,
    })),
    nextCursor: list.length ? list[list.length - 1].id : null,
  };
};

// 반려 견적 목록 조회
export const getRejectEstimates = async ({
  cursor,
}: {
  cursor: string | null;
}): Promise<EstimateListResponse> => {
  const res = await apiClient
    .get('estimate-request/driver/rejects', {
      searchParams: { ...(cursor && { cursor }) },
    })
    .json<{ data: EstimateRejectRaw[] }>();

  const list = res.data ?? [];

  return {
    data: list.map((r) => ({
      id: r.id,
      customerName: r.user.name,
      movingType: convertMovingType(r.movingType),
      pickedDriver: r.isDesignated,
      pickupAddress: r.from ? `${r.from.sido} ${r.from.sigungu}` : '',
      dropoffAddress: r.to ? `${r.to.sido} ${r.to.sigungu}` : '',
      movingDate: convertDateType1(new Date(r.movingDate)),
      status: r.type,
    })),
    nextCursor: list.length ? list[list.length - 1].id : null,
  };
};

// 확정 견적 상세 조회
export const getConfirmDetailEstimates = async (
  estimateId: string,
): Promise<ConfirmDetailPageProps> => {
  const res = await apiClient
    .get(`estimate-request/driver/confirms/${estimateId}`)
    .json<{ data: EstimateConfirmDetailRaw }>();

  const r = res.data;

  return {
    id: r.id,
    customerName: r.userName,
    movingType: convertMovingType(r.movingType),
    pickedDriver: r.isDesignated,
    requestTime: convertDateType2(new Date(r.createdAt)),
    pickupAddress: r.fromAddress ?? '',
    dropoffAddress: r.toAddress ?? '',
    movingDate: convertDateType1(new Date(r.movingDate)),
    estimatePrice: r.price,
  };
};
