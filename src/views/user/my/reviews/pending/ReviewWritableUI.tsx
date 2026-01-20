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
import Spinner from '@/shared/ui/spinner';

const LIMIT = 10;

const ReviewWritableUI = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ReviewWritableItem | null>(null);

  const [content, setContent] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  const { mutate: submitReview, isPending: isSubmitPending } = useCreateReview();

  const [page, setPage] = useState<number>(1);

  const {
    data,
    isPending: isListPending,
    isFetching,
    error,
  } = useReviewList<ReviewWritableItem>({
    type: 'writable',
    page,
    limit: LIMIT,
  });

  const list = data?.data ?? [];
  const hasData = list.length > 0;

  // 모달 열기
  const handleOpenReviewModal = (item: ReviewWritableItem) => {
    setSelectedReviewId(item.reviewId);
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

  if (isListPending) {
    return (
      <main className="flex max-w-[1920px] flex-col justify-center">
        <Tab />

        <section className="mx-auto mt-[10px] w-full max-w-[1200px]">
          <Spinner isLoading={isListPending} />
        </section>
      </main>
    );
  }

  if (!data || !hasData) {
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
          user={{ name: selectedItem.driverName, role: 'driver' }}
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
