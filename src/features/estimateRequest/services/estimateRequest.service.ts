import { api } from '@/shared/api/client';
import type { paths } from '@/shared/types/openapi';

type getPendingEstimateRequestsResponse =
  paths['/api/estimate-request/user/pending']['get']['responses']['200']['content']['application/json'];
type CreateEstimateRequestRequest =
  paths['/api/estimate-request/user/request']['post']['requestBody']['content']['application/json'];
type CreateEstimateRequestResponse =
  paths['/api/estimate-request/user/request']['post']['responses']['200']['content']['application/json'];

type CreateDesignatedEstimateRequestRequest = CreateEstimateRequestRequest & {
  designatedDriverId: string;
};

export async function getPendingEsitimateRequests() {
  return await api.get<getPendingEstimateRequestsResponse>('estimate-request/user/pending');
}

export async function createEstimateRequest(data: CreateEstimateRequestRequest) {
  return await api.post<CreateEstimateRequestResponse>('estimate-request/user/request', data);
}

// 기존 진행 중(PENDING) 견적 요청을 지정 견적 요청으로 전환
export async function designatePendingEstimateRequest(designatedDriverId: string) {
  return await api.post<CreateEstimateRequestResponse>('estimate-request/user/request/designated', {
    designatedDriverId,
  } as unknown as CreateDesignatedEstimateRequestRequest);
}

export const createEstimateRequestWithGeocode = async (data: CreateEstimateRequestRequest) => {
  const res = await api.post('estimate-request/user/request/geocode', data);
  return res.data;
};
