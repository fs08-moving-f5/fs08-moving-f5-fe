'use client';

import { useState } from 'react';
import Tab from '@/features/reviews/ui/tab';
import { useReviewList } from '@/features/reviews/hooks/useReviewList';
import { ReviewWritableItem } from '@/features/reviews/types/review';
import { ReviewCanWrite } from '@/shared/ui/card';
import ReviewList from '@/features/reviews/ui/ReviewList';
import EmptySection from '@/features/driver-estimate/ui/empty';
import { useCreateReview } from '@/features/reviews/hooks/useCreateReview';
import ModalQuetRequest from '@/shared/ui/modal/ModalRequest';

export const MOCK_REVIEW_WRITABLE_LIST: ReviewWritableItem[] = [
  {
    id: 'review-1',
    driverName: '김이사',
    description: '친절하고 빠른 이사였습니다.',
    movingType: 'home',
    pickedDriver: true,
    driverImageUrl: '/images/driver-sample.png',
    pickupAddress: '서울시 강남구 역삼동',
    dropoffAddress: '서울시 송파구 잠실동',
    movingDate: '2024-06-01',
    estimatedPrice: 250000,
  },
  {
    id: 'review-2',
    driverName: '박기사',
    description: '시간 약속을 잘 지켰어요.',
    movingType: 'small',
    pickedDriver: false,
    driverImageUrl: '/images/driver-sample.png',
    pickupAddress: '서울시 마포구',
    dropoffAddress: '서울시 은평구',
    movingDate: '2024-06-10',
    estimatedPrice: 180000,
  },
];

const LIMIT = 10;

const ReviewWritableUI = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ReviewWritableItem | null>(null);

  const [content, setContent] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  const { mutate: submitReview, isPending } = useCreateReview();

  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useReviewList<ReviewWritableItem>({
    type: 'writable',
    page,
    limit: LIMIT,
  });

  // 모달 열기
  const handleOpenReviewModal = (item: ReviewWritableItem) => {
    setSelectedReviewId(item.id);
    setSelectedItem(item);
    setContent('');
    setRating(0);
    setIsModalOpen(true);
  };

  // 리뷰 제출 핸들러
  const handleSubmitReview = () => {
    if (!selectedReviewId) return;

    submitReview(
      {
        reviewId: selectedReviewId,
        rating,
        content,
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <main className="flex max-w-[1920px] flex-col justify-center">
        <Tab />

        <section className="mx-auto mt-[10px] w-full max-w-[1200px]">
          <div className="flex w-full flex-col items-center p-45">불러오는 중...</div>
        </section>
      </main>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <main className="flex max-w-[1920px] flex-col justify-center">
        <Tab />
        <EmptySection type="writable" />
      </main>
    );
  }

  return (
    <main className="flex max-w-[1920px] flex-col justify-center">
      <Tab />
      <section className="mx-auto mt-[10px] w-full max-w-[1200px]">
        <ReviewList
          data={data.data}
          total={data.total}
          page={page}
          limit={LIMIT}
          onPageChange={setPage}
          renderItem={(item) => (
            <ReviewCanWrite
              key={item.id}
              driverName={item.driverName}
              description={item.description}
              movingType={item.movingType}
              pickedDriver={item.pickedDriver}
              driverImageUrl={item.driverImageUrl}
              pickupAddress={item.pickupAddress}
              dropoffAddress={item.dropoffAddress}
              movingDate={item.movingDate}
              estimatedPrice={item.estimatedPrice}
              disabled={false}
              onWriteReview={() => handleOpenReviewModal(item)}
            />
          )}
        />
      </section>

      {/* 모달 */}
      {isModalOpen && selectedItem && (
        <ModalQuetRequest
          type="review"
          user={{ name: selectedItem.driverName, role: 'user' }}
          mvInfo={{
            movingType: selectedItem.movingType,
            pickedDriver: selectedItem.pickedDriver,
            departure: selectedItem.pickupAddress,
            destination: selectedItem.dropoffAddress,
            date: selectedItem.movingDate,
          }}
          comment={content}
          setComment={setContent}
          score={rating}
          setScore={setRating}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          onSubmit={handleSubmitReview}
        />
      )}
    </main>
  );
};

export default ReviewWritableUI;
