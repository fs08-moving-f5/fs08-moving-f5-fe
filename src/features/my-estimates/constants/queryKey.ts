const MY_ESTIMATES_QUERY_KEY = {
  PENDING_ESTIMATE: ['pending-estimate'],
  PENDING_ESTIMATE_DETAIL: (estimateId: string) => ['pending-estimate', estimateId],
  RECEIVED_ESTIMATE: ['received-estimate'],
  RECEIVED_ESTIMATE_STATUS: (status?: 'ALL' | 'CONFIRMED') => ['received-estimate', status],
};

export default MY_ESTIMATES_QUERY_KEY;
