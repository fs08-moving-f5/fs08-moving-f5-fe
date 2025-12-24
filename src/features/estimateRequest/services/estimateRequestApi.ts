import { api } from '@/shared/api/client';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

export async function getPendingEsitimateRequest() {
  return await api.get(`${apiUrl}/estimate-request/user/pending`);
}

export async function createEstimateRequest(data: unknown) {
  return await api.post(`${apiUrl}/estimate-request/user/request`, { json: data });
}
