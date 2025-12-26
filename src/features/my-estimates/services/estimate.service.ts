import { api } from '@/shared/api/client';
import type { paths, components } from '@/shared/types/openapi';

type PendingEstimateResponse =
  paths['/api/estimate/pending']['get']['responses'][200]['content']['application/json'];

type PendingEstimateDetailResponse =
  paths['/api/estimate/{estimateId}']['get']['responses'][200]['content']['application/json'];

type ConfirmEstimateResponse =
  paths['/api/estimate/{estimateId}/confirm']['post']['responses'][200]['content']['application/json'];

export const getPendingEstimates = async () => {
  const res = await api.get<PendingEstimateResponse['data']>('estimate/pending');
  return res.data;
};

export const getPendingEstimateDetail = async ({ estimateId }: { estimateId: string }) => {
  const res = await api.get<PendingEstimateDetailResponse['data']>(`estimate/${estimateId}`);
  return res.data;
};

export const confirmEstimate = async ({ estimateId }: { estimateId: string }) => {
  const res = await api.post<ConfirmEstimateResponse['data']>(`estimate/${estimateId}/confirm`);
  return res.data;
};

export type PendingEstimate = components['schemas']['PendingEstimate'];
export type PendingEstimateDetail = components['schemas']['EstimateDetail'];
