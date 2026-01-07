'use client';

import { useState, useEffect, useRef } from 'react';
import FavoritesSubHeader from '@/features/favorites/ui/subHeader';
import FavoritesMenuWrapper from '@/features/favorites/ui/menuWrapper';
import FavoritesCardContainer from '@/features/favorites/ui/cardContainer';
import { useGetFavoriteDriversQuery } from '@/features/favorites/hooks/queries/useFavoriteQuery';
import Spinner from '@/shared/ui/spinner';
import type { FavoriteDriver } from '@/features/favorites/services/favorite.service';
import { useDeleteManyFavoriteDriversMutation } from '@/features/favorites/hooks/mutations/useFavoriteMutation';

const MyFavoritesPageClient = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string | undefined>>(new Set());

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetFavoriteDriversQuery();

  const { mutate: deleteManyFavoriteDrivers } = useDeleteManyFavoriteDriversMutation();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // TODO: 타입 추론 개선
  const favoriteDrivers: FavoriteDriver[] = (data?.pages.flat() as FavoriteDriver[]) ?? [];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(
        favoriteDrivers.map((driver) => driver.driver?.id).filter((id) => id !== undefined),
      );
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

  const handleDeleteManyFavoriteDrivers = () => {
    deleteManyFavoriteDrivers(Array.from(selectedIds).filter((id) => id !== undefined));
    setSelectedIds(new Set());
  };

  // 페이지네이션 - 무한 스크롤
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px', threshold: 0 },
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const isAllChecked =
    favoriteDrivers.length > 0 &&
    favoriteDrivers.every((driver) => driver.driver?.id && selectedIds.has(driver.driver.id)) &&
    selectedIds.size === favoriteDrivers.filter((driver) => driver.driver?.id).length;

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
          onDeleteManyFavoriteDrivers={handleDeleteManyFavoriteDrivers}
        />
        <FavoritesCardContainer
          favoriteDrivers={favoriteDrivers}
          selectedIds={selectedIds}
          onToggleCheck={handleToggleCheck}
          loadMoreRef={loadMoreRef}
        />
      </div>
    </>
  );
};

export default MyFavoritesPageClient;
