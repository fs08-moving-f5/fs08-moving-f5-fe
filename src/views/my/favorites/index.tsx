'use client';

import { useState } from 'react';
import FavoritesSubHeader from '@/features/favorites/ui/subHeader';
import FavoritesMenuWrapper from '@/features/favorites/ui/menuWrapper';
import FavoritesCardContainer from '@/features/favorites/ui/cardContainer';
import { useGetFavoriteDriversQuery } from '@/features/favorites/hooks/queries/useFavoriteQuery';
import Spinner from '@/shared/ui/spinner';
import { useIntersectionObserver } from '@/shared/hooks/useIntersectionObserver';
import type { FavoriteDriver } from '@/features/favorites/services/favorite.service';

const MyFavoritesPageClient = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string | undefined>>(new Set());

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetFavoriteDriversQuery();

  // TODO: 타입 추론 개선
  const favoriteDrivers: FavoriteDriver[] = (data?.pages.flat() as FavoriteDriver[]) ?? [];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(favoriteDrivers.map((driver) => driver.id ?? ''));
      setSelectedIds(allIds);
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleToggleCheck = (id: string | undefined) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const { ref } = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const isAllChecked = favoriteDrivers.length > 0 && selectedIds.size === favoriteDrivers.length;

  const checkedCount = selectedIds.size;
  const totalCount = favoriteDrivers.length;

  return (
    <>
      <Spinner isLoading={isLoading} />
      <div className="bg-bg-100 w-full pb-[100px]">
        <FavoritesSubHeader />
        <FavoritesMenuWrapper
          selectAll={isAllChecked}
          setSelectAll={handleSelectAll}
          checkedCount={checkedCount}
          totalCount={totalCount}
        />
        <FavoritesCardContainer
          favoriteDrivers={favoriteDrivers}
          selectedIds={selectedIds}
          onToggleCheck={handleToggleCheck}
        />
        {hasNextPage && <div ref={ref} className="h-4" />}
      </div>
    </>
  );
};

export default MyFavoritesPageClient;
