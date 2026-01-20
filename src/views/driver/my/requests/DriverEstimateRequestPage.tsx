'use client';

import { useState, useEffect, useRef } from 'react';
import { useQueryClient, useInfiniteQuery, InfiniteData } from '@tanstack/react-query';

import {
  getRequests,
  sendEstimate,
  rejectEstimate,
} from '@/features/driver-estimate/services/driverEstimate.service';
import { useModal } from '@/features/driver-estimate/hooks/useModal';
import { useDriverProfile } from '@/features/driver-estimate/hooks/useDriverProfile';
import {
  FrontFilter,
  FrontMovingType,
  EstimateRequestResponse,
  toMovingInfo,
} from '@/features/driver-estimate/types/driverEstimate';
import { normalizeRegion } from '@/features/driver-estimate/constants/region';

import { ActiveChip } from '@/shared/ui/chip';
import SearchBar from '@/shared/ui/input/SearchBar';
import { CheckBox } from '@/shared/ui/button';
import DropdownSort from '@/shared/ui/dropdown/DropdownSort';
import { Filter } from '@/shared/ui/button';
import ModalQuetRequest from '@/shared/ui/modal/ModalRequest';
import { showToast } from '@/shared/ui/sonner';
import RequestList from '@/features/driver-estimate/ui/cardContainer/RequestList';
import EmptySection from '@/features/driver-estimate/ui/empty';
import Spinner from '@/shared/ui/spinner';

const sortListObj = {
  Latest: '요청일 빠른순',
  Oldest: '요청일 느린순',
  HighestMovingDate: '이사 빠른순',
  LowestMovingDate: '이사 느린순',
};

export type Filters = {
  keyword: string;
  movingTypes: FrontMovingType[];
  onlyDesignated: boolean;
  onlyServiceable: boolean;
  sort: FrontFilter;
};

const DriverEstimateRequestPage = () => {
  const [comment, setComment] = useState<string>('');
  const [price, setPrice] = useState<number>();

  const [filters, setFilters] = useState<Filters>({
    keyword: '',
    movingTypes: [],
    onlyDesignated: false,
    onlyServiceable: false,
    sort: 'Latest',
  });

  const { isOpen, type, selected, openConfirm, openReject, close } = useModal();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const queryClient = useQueryClient();

  // useInfiniteQuery - 무한 스크롤
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useInfiniteQuery<
    EstimateRequestResponse, // TQueryFnData
    Error, // TError
    InfiniteData<EstimateRequestResponse>, // TData
    ['requests', { keyword?: string; sort: FrontFilter }], // TQueryKey
    string | null // TPageParam
  >({
    queryKey: [
      'requests',
      {
        keyword: filters.keyword,
        sort: filters.sort,
      },
    ],
    queryFn: ({ pageParam }) =>
      getRequests({
        cursor: pageParam,
        sort: filters.sort,
        ...(filters.keyword && { keyword: filters.keyword }),
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  //기사 프로필 - 서비스 가능 지역 정보 불러오기
  const { data: driverProfile } = useDriverProfile();
  const driverRegions = driverProfile?.regions ?? [];

  const requests =
    data?.pages
      .flatMap((page) => page.data)
      .filter((item) => {
        // 이사 유형
        if (filters.movingTypes.length > 0 && !filters.movingTypes.includes(item.movingType)) {
          return false;
        }

        // 지정 견적 요청
        if (filters.onlyDesignated && !item.pickedDriver) {
          return false;
        }

        // 서비스 가능 지역
        if (filters.onlyServiceable) {
          const fromRegion = normalizeRegion(item.pickupAddress);
          const toRegion = normalizeRegion(item.dropoffAddress);

          const matched =
            (fromRegion && driverRegions.includes(fromRegion)) ||
            (toRegion && driverRegions.includes(toRegion));

          if (!matched) return false;
        }

        return true;
      }) ?? [];

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

  // 총 n건
  const total = data?.pages[0]?.total ?? 0;

  // 모달 닫기
  const handleCloseModal = () => {
    setComment('');
    setPrice(undefined);
    close();
  };

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

      // 쿼리 무효화
      await queryClient.invalidateQueries({
        queryKey: ['requests'],
      });
  
      handleCloseModal();
  
      showToast({
        kind: 'success',
        message: '요청이 정상적으로 처리되었습니다.',
      });
    } catch (error) {
      showToast({
        kind: 'error',
        message: '요청 처리 중 오류가 발생했습니다.',
      });
    }
  };

  // 이사 유형 필터
  const toggleMovingType = (type: 'small' | 'home' | 'office') => {
    setFilters((prev) => ({
      ...prev,
      movingTypes: prev.movingTypes.includes(type)
        ? prev.movingTypes.filter((t) => t !== type)
        : [...prev.movingTypes, type],
    }));
  };

  if (isPending) {
    return (
      <main className="flex max-w-[1920px] flex-col justify-center">
        <section className="mx-auto mt-[10px] w-full max-w-[1200px]">
          <Spinner isLoading={isPending} />
        </section>
      </main>
    );
  }

  return (
    <main className="flex max-w-[1920px] flex-col justify-center">
      <section className="mt-[10px] w-full justify-center">
        <section className="itmes-center mx-[20px] max-w-[1200px] self-stretch py-[32px] md:mx-[72px] lg:mx-auto">
          <h1 className="text-2xl font-semibold text-[var(--color-black-500)]">받은 요청</h1>
        </section>

        <section className="mx-[20px] flex max-w-[1200px] flex-col justify-center gap-[40px] md:mx-[72px] lg:mx-auto">
          <div className="flex flex-col items-start gap-[24px]">
            {/* 검색 */}
            <SearchBar
              widthFull={true}
              onSubmit={(value: string) => setFilters((prev) => ({ ...prev, keyword: value }))}
            />

            {/* 이사 유형 필터 */}
            <div className="flex hidden gap-[12px] lg:flex">
              <ActiveChip
                text="소형이사"
                isActive={filters.movingTypes.includes('small')}
                setIsActive={() => toggleMovingType('small')}
              />
              <ActiveChip
                text="가정이사"
                isActive={filters.movingTypes.includes('home')}
                setIsActive={() => toggleMovingType('home')}
              />
              <ActiveChip
                text="사무실이사"
                isActive={filters.movingTypes.includes('office')}
                setIsActive={() => toggleMovingType('office')}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[24px]">
            <h1 className="text-lg font-semibold text-[var(--color-black-500)]">전체 {total}건</h1>

            <div className="flex justify-end text-base font-normal text-[var(--color-black-500)] lg:justify-between">
              <div className="flex hidden items-center gap-3 lg:flex">
                {/* 지정 요청 여부 */}
                <div className="flex items-center gap-2">
                  <CheckBox
                    shape="square"
                    aria-label="지정 요청 여부 체크"
                    checked={filters.onlyDesignated}
                    onChange={(checked: boolean) =>
                      setFilters((prev) => ({ ...prev, onlyDesignated: checked }))
                    }
                  />
                  지정 견적 요청
                </div>

                {/* 서비스 가능 지역 여부 */}
                <div className="flex items-center justify-center gap-2">
                  <CheckBox
                    shape="square"
                    aria-label="서비스 가능 지역 여부 체크"
                    checked={filters.onlyServiceable}
                    onChange={(checked: boolean) =>
                      setFilters((prev) => ({ ...prev, onlyServiceable: checked }))
                    }
                  />
                  서비스 가능 지역
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* 정렬 드롭다운 */}
                <DropdownSort
                  listObject={sortListObj}
                  value={filters.sort}
                  setValue={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      sort: value as FrontFilter,
                    }))
                  }
                />
                <div className="lg:hidden">
                  <Filter filters={filters} setFilters={setFilters} />
                </div>
              </div>
            </div>
          </div>

          <div>
            {requests.length === 0 ? (
              <EmptySection type="request" />
            ) : (
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                <RequestList
                  requests={requests}
                  isFetchingNextPage={isFetchingNextPage}
                  onConfirm={openConfirm}
                  onReject={openReject}
                  loadMoreRef={loadMoreRef}
                />
              </div>
            )}

            {isPending && !isFetchingNextPage && (
              <div className="pointer-events-none inset-0 flex items-center justify-center">
                <span className="rounded-md bg-white/80 px-4 py-2 text-sm text-gray-500 shadow">
                  불러오는 중...
                </span>
              </div>
            )}
          </div>
        </section>
      </section>

      {/* 모달 */}
      {isOpen && selected && type && (
        <ModalQuetRequest
          type={type}
          isOpen={isOpen}
          setIsOpen={handleCloseModal}
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
