import { api } from '@/shared/api/client';

export const getPendingEstimates = async () => {
  const res = await api.get('estimate/pending');
  return res.data;
};
