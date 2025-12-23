import PendingEstimateDetailHeader from '@/features/my-estimates/ui/detailHeader';
import PendingEstimateDriverInfo from '@/features/my-estimates/ui/driverInfo';
import PendingEstimateInfo from '@/features/my-estimates/ui/estimateInfo';
import EstimateConfirmPopup from '@/features/my-estimates/ui/estimateInfo/EstimateConfirmPopup';

const PendingEstimateDetailPageClient = ({ estimateId }: { estimateId: string }) => {
  return (
    <div className="w-full bg-white pb-[62px]">
      <PendingEstimateDetailHeader
        driverImageUrl={
          'https://i.namu.wiki/i/8kUtA4Ww_VmtkhXXxEHGPBhcxlhLq5dPSDr2WP7uAgsvE9vOy2pycKqkX1f3YVMiTe_pQSP7ARNOj6w1H96qc0hTYKdBXLg-cicsVI1SZJmJIrVL1Bp55QLX27g9NAFtwKbgwHOHuGusCyIkUOLf5w.webp'
        }
      />

      <div className="container-responsive flex max-w-[1200px] justify-between">
        <div>
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

          <PendingEstimateInfo
            price={180000}
            requestDate="2025-01-01"
            movingType="small"
            movingDate="2025-01-01"
            fromAddress="서울특별시 강남구 테헤란로 123"
            toAddress="서울특별시 강남구 테헤란로 123"
          />
        </div>
        <EstimateConfirmPopup price={180000} />
      </div>
    </div>
  );
};

export default PendingEstimateDetailPageClient;
