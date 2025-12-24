'use client';

import { useRouter } from 'next/navigation';
import { EstimateWait } from '@/shared/ui/card';
import {
  useDeleteFavoriteMutation,
  useFavoriteMutation,
} from '@/features/my-estimates/hooks/mutations/useFavoriteMutation';
import { queryClient } from '@/shared/lib/queryClient';
import QUERY_KEY from '@/features/my-estimates/constants/queryKey';
import type { PendingEstimate } from '@/features/my-estimates/services/estimate.service';

const movingTypeMap: Record<
  'SMALL_MOVING' | 'HOME_MOVING' | 'OFFICE_MOVING',
  'small' | 'home' | 'office'
> = {
  SMALL_MOVING: 'small',
  HOME_MOVING: 'home',
  OFFICE_MOVING: 'office',
};

const PendingCardContainer = ({
  estimates,
  movingType,
}: {
  estimates: PendingEstimate['estimates'];
  movingType: 'SMALL_MOVING' | 'HOME_MOVING' | 'OFFICE_MOVING';
}) => {
  const router = useRouter();

  const { mutate: addFavoriteDriver } = useFavoriteMutation();
  const { mutate: deleteFavoriteDriver } = useDeleteFavoriteMutation();

  const handleLikeClick = ({ driverId, isLiked }: { driverId: string; isLiked: boolean }) => {
    if (isLiked) {
      deleteFavoriteDriver(driverId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: QUERY_KEY.PENDING_ESTIMATE });
        },
      });
    } else {
      addFavoriteDriver(driverId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: QUERY_KEY.PENDING_ESTIMATE });
        },
      });
    }
  };

  const handleDetailClick = (estimateId: string) => {
    router.push(`/user/my/estimates/pending/${estimateId}`);
  };

  return (
    <div className="w-full">
      <div className="container-responsive tab:max-w-[600px] mobile:max-w-[327px] max-w-[1200px] pt-[78px] pb-[112px]">
        <div className="tab:grid-cols-1 mobile:grid-cols-1 tab:gap-8 mobile:gap-5 grid grid-cols-2 gap-6">
          {estimates?.map((estimate) => (
            <EstimateWait
              key={estimate.id}
              driverName={estimate.driver?.name ?? ''}
              shortIntro={estimate.driver?.driverProfile?.shortIntro ?? ''}
              driverImageUrl={estimate.driver?.driverProfile?.imageUrl ?? ''}
              rating={estimate.driver?.driverProfile?.averageRating ?? 0}
              reviewCount={estimate.driver?.driverProfile?.confirmedEstimateCount ?? 0}
              experience={estimate.driver?.driverProfile?.career ?? ''}
              moveCount={`${estimate.driver?.driverProfile?.confirmedEstimateCount}건`}
              movingType={movingTypeMap[movingType] ?? undefined}
              pickedDriver={estimate?.isDesignated ?? false}
              isLiked={estimate?.driver?.isFavorite ?? false}
              likeCount={estimate?.driver?.favoriteDriverCount ?? 0}
              estimatePrice={estimate?.price ?? 0}
              onLikeClick={() =>
                handleLikeClick({
                  driverId: estimate.driver?.id ?? '',
                  isLiked: estimate?.driver?.isFavorite ?? false,
                })
              }
              onDetailClick={() => handleDetailClick(estimate.id ?? '')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PendingCardContainer;
