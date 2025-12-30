import { FindDriver } from '@/shared/ui/card';
import type { FavoriteDriver } from '../../services/favorite.service';

const movingTypeMap: Record<
  'SMALL_MOVING' | 'HOME_MOVING' | 'OFFICE_MOVING',
  'small' | 'home' | 'office'
> = {
  SMALL_MOVING: 'small',
  HOME_MOVING: 'home',
  OFFICE_MOVING: 'office',
};

const FavoritesCardContainer = ({ favoriteDrivers }: { favoriteDrivers: FavoriteDriver[] }) => {
  return (
    <div className="container-responsive tab:max-w-[600px] mobile:max-w-[327px] max-w-[1200px]">
      <div className="flex flex-col gap-5">
        {favoriteDrivers.map((favoriteDriver) => (
          <FindDriver
            key={favoriteDriver.id}
            title={favoriteDriver.driver?.driverProfile?.shortIntro ?? ''}
            description={favoriteDriver.driver?.driverProfile?.description ?? ''}
            driverName={favoriteDriver.driver?.name ?? ''}
            driverImageUrl={favoriteDriver.driver?.driverProfile?.imageUrl ?? ''}
            rating={favoriteDriver.driver?.driverProfile?.averageRating ?? 0}
            reviewCount={favoriteDriver.driver?.driverProfile?.reviewCount ?? 0}
            experience={favoriteDriver.driver?.driverProfile?.career ?? ''}
            moveCount={`${favoriteDriver.driver?.driverProfile?.confirmedEstimateCount ?? 0}건`}
            likeCount={favoriteDriver.driver?.driverProfile?.favoriteDriverCount ?? 0}
            favoriteCard={true}
            movingTypeArray={
              favoriteDriver.driver?.driverProfile?.services?.map(
                (service) => movingTypeMap[service],
              ) ?? undefined
            }
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesCardContainer;
