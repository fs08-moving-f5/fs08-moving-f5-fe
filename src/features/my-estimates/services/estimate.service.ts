import { api } from '@/shared/api/client';
import type { paths, components } from '@/shared/types/openapi';

type PendingEstimateResponse =
  paths['/api/estimate/pending']['get']['responses'][200]['content']['application/json'];

export const getPendingEstimates = async () => {
  const res = await api.get<PendingEstimateResponse['data']>('estimate/pending');
  return res.data;
};

export type PendingEstimate = components['schemas']['PendingEstimate'];
