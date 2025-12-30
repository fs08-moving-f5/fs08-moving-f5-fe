const QUERY_KEY = {
  PENDING_ESTIMATE: ['pending-estimate'],
  PENDING_ESTIMATE_DETAIL: (estimateId: string) => ['pending-estimate', estimateId],
  RECEIVED_ESTIMATE: ['received-estimate'],
};

export default QUERY_KEY;
