import EstimateDetailUi from '@/features/my-estimates/ui/detailUi';

const ReceivedEstimateDetailPageClient = ({ estimateId }: { estimateId: string }) => {
  return <EstimateDetailUi estimateId={estimateId} type="received" />;
};

export default ReceivedEstimateDetailPageClient;
