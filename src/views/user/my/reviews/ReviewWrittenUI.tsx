'use client';

import { useState } from 'react';
import Tab from '@/features/reviews/ui/tab';
import { useReviewList } from '@/features/reviews/hooks/useReviewList';
import { ReviewWrittenItem } from '@/features/reviews/types/review';
import { ReviewWritten } from '@/shared/ui/card';
import ReviewList from '@/features/reviews/ui/ReviewList';
import EmptySection from '@/features/driver-estimate/ui/empty';
import Spinner from '@/shared/ui/spinner';

const LIMIT = 10;

const ReviewWrittenUI = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isPending, isFetching, error } = useReviewList<ReviewWrittenItem>({
    type: 'written',
    page,
    limit: LIMIT,
  });

  const list = data?.data ?? [];
  const hasData = list.length > 0;

  if (isPending) {
    return (
      <main className="flex max-w-[1920px] flex-col justify-center">
        <Tab />

        <section className="mx-auto mt-[10px] w-full max-w-[1200px]">
          <Spinner isLoading={isPending} />
        </section>
      </main>
    );
  }

  if (!data || !hasData) {
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

      <section className="mt-[10px] mb-[14px] w-full max-w-[1200px] px-[20px] md:mb-[77px] lg:mx-auto lg:mb-[84px]">
        <ReviewList
          data={list}
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
              reviewDate={item.updatedAt}
            />
          )}
        />
      </section>
    </main>
  );
};

export default ReviewWrittenUI;
