'use client';

import { useState, useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getRequests } from '@/shared/api/requests';

import { ActiveChip } from '@/shared/ui/chip';
import GNB from '@/shared/ui/gnb';
import SearchBar from '@/shared/ui/Input/SearchBar';
import { CheckBox } from '@/shared/ui/Button';
import DropdownSort from '@/shared/ui/dropdown/DropdownSort';
import { RequestReceived } from '@/shared/ui/card';

const sortListObj = {
  HighestRating: '평점 높은순',
  HighestMovingDate: '이사 빠른순',
  Latest: '요청일 빠른순',
};

export interface EstimateRequestItem {
  id: string;
  customerName: string;
  movingType?: 'small' | 'home' | 'office';
  pickedDriver: boolean;
  pickupAddress: string;
  dropoffAddress: string;
  movingDate: string;
  requestTime: string;
}

export interface EstimateRequestResponse {
  data: EstimateRequestItem[];
  nextCursor: string | null;
}

const RequestPage = () => {
  const [isSmallActive, setIsSmallActive] = useState<boolean>(false);
  const [isHomeActive, setIsHomeActive] = useState<boolean>(false);
  const [isOfficeActive, setIsOfficeActive] = useState<boolean>(false);
  const [sortValue, setSortValue] = useState<string>('HighestRating');

  const ref = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<EstimateRequestResponse>({
      queryKey: ['requests'],
      queryFn: ({ pageParam }) => getRequests({ cursor: pageParam }),
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const requests = data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    if (!ref.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="flex max-w-[1920px] flex-col justify-center">
      <GNB />

      {/* 받은 요청 GNB Tab */}

      <main className="mx-auto mt-[10px] w-full max-w-[1200px]">
        <section className="flex flex-col gap-[40px]">
          <div className="flex flex-col items-start gap-[24px]">
            <SearchBar />

            <div className="flex gap-[12px]">
              <ActiveChip text="소형이사" isActive={isSmallActive} setIsActive={setIsSmallActive} />
              <ActiveChip text="가정이사" isActive={isHomeActive} setIsActive={setIsHomeActive} />
              <ActiveChip
                text="사무실이사"
                isActive={isOfficeActive}
                setIsActive={setIsOfficeActive}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[24px]">
            <h1 className="text-lg font-semibold text-[var(--color-black-500)]">전체 n건</h1>

            <div className="flex justify-between text-base font-normal text-[var(--color-black-500)]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <CheckBox />
                  지정 견적 요청
                </div>
                <div className="flex items-center gap-2">
                  <CheckBox />
                  서비스 가능 지역
                </div>
              </div>
              <DropdownSort listObject={sortListObj} value={sortValue} setValue={setSortValue} />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {requests.map((request) => (
                <RequestReceived
                  key={request.id}
                  customerName={request.customerName}
                  movingType={request.movingType}
                  pickedDriver={request.pickedDriver}
                  pickupAddress={request.pickupAddress}
                  dropoffAddress={request.dropoffAddress}
                  movingDate={request.movingDate}
                  requestTime={request.requestTime}
                  onSendEstimateClick={() => {}}
                  onRejectClick={() => {}}
                />
              ))}
              <div ref={ref} className="h-10" />

              {isFetchingNextPage && <p className="text-center">불러오는 중...</p>}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RequestPage;
