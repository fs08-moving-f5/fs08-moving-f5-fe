const QUERY_KEY = {
  PENDING_ESTIMATE: ['pending-estimate'],
  PENDING_ESTIMATE_DETAIL: (estimateId: string) => ['pending-estimate', estimateId],
};

export default QUERY_KEY;
