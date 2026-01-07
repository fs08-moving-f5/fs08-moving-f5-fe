import EstimateDetailUi from '@/features/my-estimates/ui/detailUi';

const PendingEstimateDetailPageClient = ({ estimateId }: { estimateId: string }) => {
  return <EstimateDetailUi estimateId={estimateId} type="pending" />;
};

export default PendingEstimateDetailPageClient;
