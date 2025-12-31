'use client';

import { useQueryClient } from '@tanstack/react-query';
import PendingEstimateDetailHeader from '@/features/my-estimates/ui/detailHeader';
import PendingEstimateDriverInfo from '@/features/my-estimates/ui/driverInfo';
import PendingEstimateInfo, {
  EstimateRequestButtonWrapper,
} from '@/features/my-estimates/ui/estimateInfo';
import EstimateConfirmPopup from '@/features/my-estimates/ui/estimateInfo/EstimateConfirmPopup';
import { useGetPendingEstimateDetailQuery } from '@/features/my-estimates/hooks/queries/useEstimateQueries';
import { formatDateWithPeriod, formatDateWithWeekday } from '@/shared/lib/day';
import IconWrapper from '@/features/my-estimates/ui/estimateInfo/IconWrapper';
import {
  useDeleteFavoriteMutation,
  useConfirmEstimateMutation,
  useFavoriteMutation,
} from '@/features/favorites/hooks/mutations/useFavoriteMutation';
import QUERY_KEY from '@/features/my-estimates/constants/queryKey';
import { useRouter } from 'next/navigation';
import NonConfirmMessage from '../nonConfirmMessage';

const movingTypeKoreanMap: Record<
  'SMALL_MOVING' | 'HOME_MOVING' | 'OFFICE_MOVING',
  '소형이사' | '가정이사' | '사무실이사'
> = {
  SMALL_MOVING: '소형이사',
  HOME_MOVING: '가정이사',
  OFFICE_MOVING: '사무실이사',
};

const EstimateDetailUi = ({
  estimateId,
  type,
}: {
  estimateId: string;
  type: 'pending' | 'received';
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: pendingEstimateDetail } = useGetPendingEstimateDetailQuery({ estimateId });

  const estimateReqData = pendingEstimateDetail?.estimateRequest;
  const driverData = pendingEstimateDetail?.driver;

  const { mutate: addFavoriteDriver } = useFavoriteMutation();
  const { mutate: deleteFavoriteDriver } = useDeleteFavoriteMutation();
  const { mutate: confirmEstimate } = useConfirmEstimateMutation();

  const handleConfirmEstimate = () => {
    confirmEstimate(
      { estimateId },
      {
        onSuccess: () => {
          router.push('/user/my/estimates/received');
        },
      },
    );
  };

  const handleLikeClick = ({ driverId, isLiked }: { driverId: string; isLiked: boolean }) => {
    if (isLiked) {
      deleteFavoriteDriver(driverId, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: QUERY_KEY.PENDING_ESTIMATE,
          });
          queryClient.invalidateQueries({
            queryKey: QUERY_KEY.PENDING_ESTIMATE_DETAIL(estimateId),
          });
        },
      });
    } else {
      addFavoriteDriver(driverId, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: QUERY_KEY.PENDING_ESTIMATE,
          });
          queryClient.invalidateQueries({
            queryKey: QUERY_KEY.PENDING_ESTIMATE_DETAIL(estimateId),
          });
        },
      });
    }
  };

  const stroke = <div className="h-[1px] w-full bg-[#F2F2F2]" />;

  /*
  TODO: movingDate 에 시간까지 포함
  시간 입력 필드가 없어서 상세 주소 추가 시 함께 진행
  */
  return (
    <div className="w-full bg-white pb-[62px]">
      <PendingEstimateDetailHeader
        driverImageUrl={driverData?.driverProfile?.imageUrl ?? '/img/profile.png'}
        title="견적 상세"
      />

      <div className="container-responsive tab:max-w-[600px] mobile:max-w-[335px] tab:flex-col mobile:flex-col tab:gap-8 mobile:gap-8 tab:justify-start mobile:justify-start flex w-full max-w-[1200px] flex-row items-start justify-between">
        <div className="tab:w-full mobile:w-full w-[740px]">
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
            isLiked={driverData?.isFavorite ?? false}
            onLikeClick={() =>
              handleLikeClick({
                driverId: driverData?.id ?? '',
                isLiked: driverData?.isFavorite ?? false,
              })
            }
          />

          <PendingEstimateInfo
            price={pendingEstimateDetail?.price ?? 0}
            requestDate={formatDateWithPeriod(estimateReqData?.createdAt ?? '')}
            movingType={movingTypeKoreanMap[estimateReqData?.movingType ?? 'SMALL_MOVING']}
            movingDate={formatDateWithWeekday(estimateReqData?.movingDate ?? '')}
            fromAddress={estimateReqData?.addresses?.[0]?.address ?? ''}
            toAddress={estimateReqData?.addresses?.[1]?.address ?? ''}
          />

          {type === 'received' && pendingEstimateDetail?.status !== 'CONFIRMED' && (
            <NonConfirmMessage />
          )}
        </div>
        <div className="tab:block mobile:block hidden w-full">{stroke}</div>
        <IconWrapper type="mobile" />
        {type === 'pending' && (
          <EstimateRequestButtonWrapper
            isLiked={driverData?.isFavorite ?? false}
            onConfirmClick={handleConfirmEstimate}
            onLikeClick={() =>
              handleLikeClick({
                driverId: driverData?.id ?? '',
                isLiked: driverData?.isFavorite ?? false,
              })
            }
          />
        )}
        <EstimateConfirmPopup
          price={pendingEstimateDetail?.price ?? 0}
          type={type}
          onConfirmClick={handleConfirmEstimate}
        />
      </div>
    </div>
  );
};

export default EstimateDetailUi;
