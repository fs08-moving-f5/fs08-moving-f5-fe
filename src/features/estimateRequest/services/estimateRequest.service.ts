import { api } from '@/shared/api/client';
import type { paths, components } from '@/shared/types/openapi';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

type getPendingEsitimateRequestsResponse =
  paths['/api/estimate-request/user/pending']['get']['responses']['200']['content']['application/json'];
type CreateEstimateRequestRequest =
  paths['/api/estimate-request/user/request']['post']['requestBody']['content']['application/json'];
type CreateEstimateRequestResponse =
  paths['/api/estimate-request/user/request']['post']['responses']['200']['content']['application/json'];

export async function getPendingEsitimateRequests() {
  return await api.get<getPendingEsitimateRequestsResponse>('estimate-request/user/pending');
}

export async function createEstimateRequest(data: CreateEstimateRequestRequest) {
  return await api.post<CreateEstimateRequestResponse>('estimate-request/user/request', data);
}
