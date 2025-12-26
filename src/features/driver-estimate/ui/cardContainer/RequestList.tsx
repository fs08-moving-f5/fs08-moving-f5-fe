'use client';

import { RequestReceived } from '@/shared/ui/card';
import Skeleton from './Skeleton';
import { EstimateRequestItem } from '@/features/driver-estimate/types/driverEstimate';

interface CardListProps {
  requests: EstimateRequestItem[];
  isFetchingNextPage: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  onConfirm: (item: EstimateRequestItem) => void;
  onReject: (item: EstimateRequestItem) => void;
}

const RequestList = ({
  requests,
  isFetchingNextPage,
  loadMoreRef,
  onConfirm,
  onReject,
}: CardListProps) => {
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

      <div ref={loadMoreRef} className="h-10" />

      {isFetchingNextPage && Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} />)}
    </>
  );
};

export default RequestList;
