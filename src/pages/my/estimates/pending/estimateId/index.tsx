import PendingEstimateDetailHeader from '@/features/my-estimates/ui/detailHeader';
import PendingEstimateDriverInfo from '@/features/my-estimates/ui/driverInfo';

const PendingEstimateDetailPageClient = ({ estimateId }: { estimateId: string }) => {
  return (
    <div>
      <PendingEstimateDetailHeader
        driverImageUrl={
          'https://i.namu.wiki/i/8kUtA4Ww_VmtkhXXxEHGPBhcxlhLq5dPSDr2WP7uAgsvE9vOy2pycKqkX1f3YVMiTe_pQSP7ARNOj6w1H96qc0hTYKdBXLg-cicsVI1SZJmJIrVL1Bp55QLX27g9NAFtwKbgwHOHuGusCyIkUOLf5w.webp'
        }
      />

      <PendingEstimateDriverInfo
        movingType="small"
        isDesignated={true}
        shortIntro="shortIntro"
        estimateStatus="pending"
        driverName="driverName"
        favoriteCount={1}
        rating={4.5}
        career="career"
        moveCount={1}
        reviewCount={1}
      />
    </div>
  );
};

export default PendingEstimateDetailPageClient;
