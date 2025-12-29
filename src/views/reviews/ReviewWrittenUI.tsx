'use client';

import { useState } from 'react';
import Tab from '@/features/reviews/ui/tab';
import { useReviewList } from '@/features/reviews/hooks/useReviewList';
import { ReviewWrittenItem } from '@/features/reviews/types/review';
import { ReviewWritten } from '@/shared/ui/card';
import ReviewList from '@/features/reviews/ui/ReviewList';
import EmptySection from '@/features/driver-estimate/ui/empty';

const LIMIT = 10;

const ReviewWrittenUI = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useReviewList<ReviewWrittenItem>({
    type: 'written',
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
        <EmptySection type="written" />
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
            <ReviewWritten
              key={item.id}
              driverName={item.driverName}
              description={item.description}
              movingType={item.movingType}
              pickedDriver={item.pickedDriver}
              driverImageUrl={item.driverImageUrl}
              pickupAddress={item.pickupAddress}
              dropoffAddress={item.dropoffAddress}
              movingDate={item.movingDate}
              rating={item.rating}
              reviewContent={item.content}
              reviewDate={item.createdAt}
            />
          )}
        />
      </section>
    </main>
  );
};

export default ReviewWrittenUI;
