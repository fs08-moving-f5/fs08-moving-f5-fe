'use client';

import { useEffect, useRef } from 'react';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';

import Tab from '@/features/driver-estimate/ui/tab';
import { EstimateClient } from '@/shared/ui/card';
import EmptySection from '@/features/driver-estimate/ui/empty';

import {
  EstimateListPageProps,
  EstimateListResponse,
} from '@/features/driver-estimate/types/driverEstimate';

const EstimateListPage = ({ queryKey, queryFn, emptyType, status }: EstimateListPageProps) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // useInfiniteQuery - 무한 스크롤
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery<
    EstimateListResponse, // TQueryFnData
    Error, // TError
    InfiniteData<EstimateListResponse>, // TData
    readonly unknown[], // TQueryKey
    string | null // TPageParam
  >({
    queryKey,
    queryFn: ({ pageParam }) => queryFn({ cursor: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const estimates = data?.pages.flatMap((page) => page.data) ?? [];

  // 페이지네이션
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <main className="flex min-h-screen flex-col justify-center">
      <Tab />

      <section className="w-full justify-center">
        {!isLoading && estimates.length === 0 ? (
          <EmptySection type={emptyType} />
        ) : (
          <div className="mb-[14px] grid max-w-[1200px] justify-center gap-6 px-[20px] md:mb-[77px] lg:mx-auto lg:mb-[84px] lg:grid-cols-2">
            {estimates.map((item) => {
              if (item.status === 'rejected') {
                return (
                  <EstimateClient
                    key={item.id}
                    id={item.id}
                    customerName={item.customerName}
                    pickupAddress={item.pickupAddress}
                    dropoffAddress={item.dropoffAddress}
                    movingDate={item.movingDate}
                    movingType={item.movingType}
                    pickedDriver={item.pickedDriver}
                    status="rejected"
                  />
                );
              }

              return (
                <EstimateClient
                  key={item.id}
                  id={item.id}
                  customerName={item.customerName}
                  pickupAddress={item.pickupAddress}
                  dropoffAddress={item.dropoffAddress}
                  movingDate={item.movingDate}
                  movingType={item.movingType}
                  pickedDriver={item.pickedDriver}
                  estimatePrice={item.estimatePrice}
                  isConfirmed={item.isConfirmed}
                  status={status}
                />
              );
            })}
          </div>
        )}
        <div ref={loadMoreRef} />
      </section>
    </main>
  );
};

export default EstimateListPage;
