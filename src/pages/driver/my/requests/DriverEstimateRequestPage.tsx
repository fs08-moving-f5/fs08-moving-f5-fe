'use client';

import { useState, useEffect, useRef } from 'react';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';

import {
  getRequests,
  sendEstimate,
  rejectEstimate,
} from '@/features/driver-estimate/services/driverEstimate.service';
import { useModal } from '@/features/driver-estimate/hooks/useModal';

import { ActiveChip } from '@/shared/ui/chip';
import SearchBar from '@/shared/ui/input/SearchBar';
import { CheckBox } from '@/shared/ui/button';
import DropdownSort from '@/shared/ui/dropdown/DropdownSort';
import RequestList from '@/features/driver-estimate/ui/cardContainer/RequestList';
import ModalQuetRequest from '@/shared/ui/modal/ModalRequest';
import { showToast } from '@/shared/ui/sonner';

import {
  EstimateRequestResponse,
  toMovingInfo,
  EstimateRequestItem,
} from '@/features/driver-estimate/types/driverEstimate';

const mockRequests: EstimateRequestItem[] = [
  {
    id: 'mock-1',
    customerName: '홍길동',
    movingType: 'home',
    pickedDriver: true,
    pickupAddress: '서울시 강남구',
    dropoffAddress: '서울시 서초구',
    movingDate: '2025-07-01T09:00:00.000Z',
    requestTime: '2025-07-01T08:00:00.000Z',
  },
  {
    id: 'mock-2',
    customerName: '김철수',
    movingType: 'small',
    pickedDriver: false,
    pickupAddress: '서울시 마포구',
    dropoffAddress: '서울시 은평구',
    movingDate: '2025-07-03T14:00:00.000Z',
    requestTime: '2025-07-02T10:00:00.000Z',
  },
];

const sortListObj = {
  Latest: '요청일 빠른순',
  Oldest: '요청일 느린순',
  HighestMovingDate: '이사 빠른순',
  LowestMovingDate: '이사 느린순',
  // HighestRating: '평점 높은순',
};

const DriverEstimateRequestPage = () => {
  const [isSmallActive, setIsSmallActive] = useState<boolean>(false);
  const [isHomeActive, setIsHomeActive] = useState<boolean>(false);
  const [isOfficeActive, setIsOfficeActive] = useState<boolean>(false);
  const [sortValue, setSortValue] = useState<string>('Latest');
  const [comment, setComment] = useState<string>('');
  const [price, setPrice] = useState<number>();

  const { isOpen, type, selected, openConfirm, openReject, close } = useModal();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // useInfiniteQuery - 무한 스크롤
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
    EstimateRequestResponse, // TQueryFnData
    Error, // TError
    InfiniteData<EstimateRequestResponse>, // TData
    ['requests'], // TQueryKey
    string | null // TPageParam
  >({
    queryKey: ['requests'],
    queryFn: ({ pageParam }) => getRequests({ cursor: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const requests = data?.pages.flatMap((page) => page.data) ?? mockRequests ?? [];

  // 페이지네이션
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

  // 모달 버튼
  const handleSubmit = async () => {
    if (!selected || !type) return;

    try {
      if (type === 'confirm') {
        if (!price || price <= 0) return;
        await sendEstimate({
          estimateRequestId: selected.id,
          price,
          comment,
        });
      }

      if (type === 'reject') {
        await rejectEstimate({
          estimateRequestId: selected.id,
          rejectReason: comment,
        });
      }

      close();
    } catch (error) {
      console.error(error);

      showToast({
        kind: 'error',
        message: '요청 처리 중 오류가 발생했습니다.',
      });
    }
  };

  return (
    <main className="flex max-w-[1920px] flex-col justify-center">
      <section className="mx-auto mt-[10px] w-full max-w-[1200px]">
        <div className="itmes-center w-full self-stretch py-[32px]">
          <h1 className="text-2xl font-semibold text-[var(--color-black-500)]">받은 요청</h1>
        </div>

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
            <h1 className="text-lg font-semibold text-[var(--color-black-500)]">
              전체 {requests.length}건
            </h1>

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
          </div>

          <div className="flex flex-col gap-[24px]">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
              <RequestList
                requests={requests}
                isFetchingNextPage={isFetchingNextPage}
                onConfirm={openConfirm}
                onReject={openReject}
                loadMoreRef={loadMoreRef}
              />
            </div>
          </div>
        </section>
      </section>

      {/* 모달 */}
      {isOpen && selected && type && (
        <ModalQuetRequest
          type={type}
          isOpen={isOpen}
          setIsOpen={close}
          user={{ name: selected.customerName, role: 'user' }}
          mvInfo={toMovingInfo(selected)}
          price={price}
          setPrice={setPrice}
          comment={comment}
          setComment={setComment}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  );
};

export default DriverEstimateRequestPage;
