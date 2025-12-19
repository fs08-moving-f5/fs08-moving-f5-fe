import { EstimateWait } from '@/shared/ui/card';
import type { PendingEstimate } from '../../services/estimate.service';

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
  return (
    <div className="w-full">
      <div className="mx-auto max-w-[1140px] pt-[78px] pb-[112px]">
        <div className="grid grid-cols-2 gap-6">
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
              isLiked={estimate?.driver?.isFavorite ?? false}
              likeCount={estimate?.driver?.favoriteDriverCount ?? 0}
              estimatePrice={estimate?.price ?? 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PendingCardContainer;
