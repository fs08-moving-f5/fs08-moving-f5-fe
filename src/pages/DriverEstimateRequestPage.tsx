'use client';

import { useState, useEffect, useRef } from 'react';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { getRequests } from '@/features/driver-estimates/services/driverEstimate';

import { ActiveChip } from '@/shared/ui/chip';
import GNB from '@/shared/ui/gnb';
import SearchBar from '@/shared/ui/input/SearchBar';
import { CheckBox } from '@/shared/ui/button';
import DropdownSort from '@/shared/ui/dropdown/DropdownSort';
import CardList from '@/features/driver-estimates/ui/CardList';
import ModalQuetRequest from '@/shared/ui/modal/ModalRequest';

import {
  EstimateRequestItem,
  EstimateRequestResponse,
  ModalType,
  toMovingInfo,
} from '@/features/driver-estimates/types/driverEstimate';

// const mockRequests: EstimateRequestItem[] = [
//   {
//     id: 'mock-1',
//     customerName: '홍길동',
//     movingType: 'home',
//     pickedDriver: true,
//     pickupAddress: '서울시 강남구',
//     dropoffAddress: '서울시 서초구',
//     movingDate: '2025-07-01T09:00:00.000Z',
//     requestTime: '2025-07-01T08:00:00.000Z',
//   },
//   {
//     id: 'mock-2',
//     customerName: '김철수',
//     movingType: 'small',
//     pickedDriver: false,
//     pickupAddress: '서울시 마포구',
//     dropoffAddress: '서울시 은평구',
//     movingDate: '2025-07-03T14:00:00.000Z',
//     requestTime: '2025-07-02T10:00:00.000Z',
//   },
// ];

const sortListObj = {
  HighestRating: '평점 높은순',
  HighestMovingDate: '이사 빠른순',
  Latest: '요청일 빠른순',
};

const DriverEstimateRequestPage = () => {
  const [isSmallActive, setIsSmallActive] = useState<boolean>(false);
  const [isHomeActive, setIsHomeActive] = useState<boolean>(false);
  const [isOfficeActive, setIsOfficeActive] = useState<boolean>(false);
  const [sortValue, setSortValue] = useState<string>('HighestRating');

  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedRequest, setSelectedRequest] = useState<EstimateRequestItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [price, setPrice] = useState<number>();

  const ref = useRef<HTMLDivElement | null>(null);

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

  const requests = data?.pages.flatMap((page) => page.data) ?? [];

  // 페이지네이션
  useEffect(() => {
    if (!ref.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px', threshold: 0 },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 카드 버튼 클릭 핸들러
  const openConfirmModal = (request: EstimateRequestItem) => {
    setSelectedRequest(request);
    setModalType('confirm');
    setIsModalOpen(true);
  };
  const openRejectModal = (request: EstimateRequestItem) => {
    setSelectedRequest(request);
    setModalType('reject');
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedRequest(null);
    setPrice(undefined);
    setComment('');
  };

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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <CardList
                requests={requests}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
                onConfirm={(r) => openConfirmModal(r)}
                onReject={(r) => openRejectModal(r)}
              />
            </div>

            {/* 모달 */}
            {selectedRequest && modalType && (
              <ModalQuetRequest
                type={modalType}
                isOpen={isModalOpen}
                setIsOpen={closeModal}
                user={{
                  name: selectedRequest.customerName,
                  role: 'user',
                }}
                mvInfo={toMovingInfo(selectedRequest)}
                price={price}
                setPrice={setPrice}
                comment={comment}
                setComment={setComment}
                onSubmit={() => {
                  // TODO: 견적 보내기 / 반려 API 호출
                  setIsModalOpen(false);
                }}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DriverEstimateRequestPage;
