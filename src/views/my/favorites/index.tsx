'use client';

import { useState } from 'react';
import FavoritesSubHeader from '@/features/favorites/ui/subHeader';
import FavoritesMenuWrapper from '@/features/favorites/ui/menuWrapper';
import FavoritesCardContainer from '@/features/favorites/ui/cardContainer';
import { useGetFavoriteDriversQuery } from '@/features/favorites/hooks/queries/useFavoriteQuery';
import Spinner from '@/shared/ui/spinner';
import type { FavoriteDriver } from '@/features/favorites/services/favorite.service';

const MyFavoritesPageClient = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const { data, isLoading } = useGetFavoriteDriversQuery();

  // TODO: 타입 추론 개선
  const favoriteDrivers: FavoriteDriver[] = (data?.pages.flat() as FavoriteDriver[]) ?? [];

  return (
    <>
      <Spinner isLoading={isLoading} />
      <div className="bg-bg-100 w-full pb-[100px]">
        <FavoritesSubHeader />
        <FavoritesMenuWrapper selectAll={selectAll} setSelectAll={setSelectAll} />
        <FavoritesCardContainer favoriteDrivers={favoriteDrivers} />
      </div>
    </>
  );
};

export default MyFavoritesPageClient;
