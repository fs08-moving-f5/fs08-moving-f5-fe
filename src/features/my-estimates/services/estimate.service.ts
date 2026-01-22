import { api } from '@/shared/api/client';
import type { paths, components } from '@/shared/types/openapi';

type PendingEstimateResponse =
  paths['/api/estimate/pending']['get']['responses'][200]['content']['application/json'];

type PendingEstimateDetailResponse =
  paths['/api/estimate/{estimateId}']['get']['responses'][200]['content']['application/json'];

type ConfirmEstimateResponse =
  paths['/api/estimate/{estimateId}/confirm']['post']['responses'][200]['content']['application/json'];

type ReceivedEstimateResponse =
  paths['/api/estimate/received']['get']['responses'][200]['content']['application/json'];

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

export const getReceivedEstimates = async ({
  cursor,
  limit = 15,
  status,
}: {
  cursor?: string;
  limit: number;
  status?: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED';
}) => {
  const params = new URLSearchParams();

  params.set('limit', String(limit));

  if (cursor) {
    params.set('cursor', cursor);
  }

  if (status) {
    params.set('status', status);
  }

  const res = await api.get<ReceivedEstimateResponse>('estimate/received', {
    searchParams: params,
  });

  return {
    data: res.data,
    pagination: res.pagination,
  };
};

export type PendingEstimate = components['schemas']['PendingEstimate'];
export type PendingEstimateDetail = components['schemas']['EstimateDetail'];
export type ReceivedEstimate = components['schemas']['ReceivedEstimate'];
