'use client';

import { useState } from 'react';
import Tab from '@/features/reviews/ui/tab';
import { useReviewList } from '@/features/reviews/hooks/useReviewList';
import { ReviewWritableItem } from '@/features/reviews/types/review';
import { ReviewCanWrite } from '@/shared/ui/card';
import ReviewList from '@/features/reviews/ui/ReviewList';
import EmptySection from '@/features/driver-estimate/ui/empty';

const LIMIT = 10;

const ReviewWritableUI = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useReviewList<ReviewWritableItem>({
    type: 'writable',
    page,
    limit: LIMIT,
  });

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
              onWriteReview={() => alert('모달')}
            />
          )}
        />
      </section>
    </main>
  );
};

export default ReviewWritableUI;
