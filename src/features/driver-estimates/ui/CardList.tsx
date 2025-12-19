'use client';

import { useEffect, useRef } from 'react';
import { RequestReceived, EstimateClient } from '@/shared/ui/card';
import Skeleton from './Skeleton';
import { EstimateRequestItem } from '@/features/driver-estimates/types/driverEstimate';

interface CardListProps {
  requests: EstimateRequestItem[];
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  onConfirm: (item: EstimateRequestItem) => void;
  onReject: (item: EstimateRequestItem) => void;
}

const CardList = ({
  requests,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  onConfirm,
  onReject,
}: CardListProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (!requests.length && isFetchingNextPage) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} />
        ))}
      </>
    );
  }

  return (
    <>
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
          onSendEstimateClick={() => onConfirm(request)}
          onRejectClick={() => onReject(request)}
        />
      ))}

      <div ref={ref} className="h-10" />

      {isFetchingNextPage && Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} />)}
    </>
  );
};

export default CardList;
