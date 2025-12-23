import PendingEstimateDetailHeader from '@/features/my-estimates/ui/detailHeader';
import PendingEstimateDriverInfo from '@/features/my-estimates/ui/driverInfo';
import PendingEstimateInfo from '@/features/my-estimates/ui/estimateInfo';
import EstimateConfirmPopup from '@/features/my-estimates/ui/estimateInfo/EstimateConfirmPopup';
import { useGetPendingEstimateDetailQuery } from '@/features/my-estimates/hooks/queries/useEstimateQueries';
import { formatDateWithWeekday } from '@/shared/lib/day';

const movingTypeKoreanMap: Record<
  'SMALL_MOVING' | 'HOME_MOVING' | 'OFFICE_MOVING',
  '소형이사' | '가정이사' | '사무실이사'
> = {
  SMALL_MOVING: '소형이사',
  HOME_MOVING: '가정이사',
  OFFICE_MOVING: '사무실이사',
};

const PendingEstimateDetailPageClient = ({ estimateId }: { estimateId: string }) => {
  const { data: pendingEstimateDetail } = useGetPendingEstimateDetailQuery({ estimateId });

  const estimateReqData = pendingEstimateDetail?.estimateRequest;
  const driverData = pendingEstimateDetail?.driver;

  /*
  TODO
  - 백엔드 createdAt 추가 (requestDate)
  - movingDate 에 시간까지 포함
  */
  return (
    <div className="w-full bg-white pb-[62px]">
      <PendingEstimateDetailHeader
        driverImageUrl={driverData?.driverProfile?.imageUrl ?? '/img/profile.png'}
      />

      <div className="container-responsive flex max-w-[1200px] items-center justify-between">
        <div>
          <PendingEstimateDriverInfo
            movingType={estimateReqData?.movingType ?? 'SMALL_MOVING'}
            isDesignated={estimateReqData?.isDesignated ?? false}
            shortIntro={driverData?.driverProfile?.shortIntro ?? ''}
            estimateStatus={pendingEstimateDetail?.status ?? 'PENDING'}
            driverName={driverData?.name ?? ''}
            favoriteCount={driverData?.driverProfile?.favoriteDriverCount ?? 0}
            rating={driverData?.driverProfile?.averageRating ?? 0}
            career={driverData?.driverProfile?.career ?? ''}
            moveCount={driverData?.driverProfile?.confirmedEstimateCount ?? 0}
            reviewCount={1}
          />

          <PendingEstimateInfo
            price={pendingEstimateDetail?.price ?? 0}
            requestDate="2025-01-01"
            movingType={movingTypeKoreanMap[estimateReqData?.movingType ?? 'SMALL_MOVING']}
            movingDate={formatDateWithWeekday(estimateReqData?.movingDate ?? '')}
            fromAddress={estimateReqData?.addresses?.[0]?.address ?? ''}
            toAddress={estimateReqData?.addresses?.[1]?.address ?? ''}
          />
        </div>
        <EstimateConfirmPopup price={pendingEstimateDetail?.price ?? 0} />
      </div>
    </div>
  );
};

export default PendingEstimateDetailPageClient;
