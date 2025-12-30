'use client';

import Pagination from '@/shared/ui/pagination/Pagination';

interface ReviewListProps<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  renderItem: (item: T) => React.ReactNode;
}

function ReviewList<T>({ data, total, page, limit, onPageChange, renderItem }: ReviewListProps<T>) {
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <ul className="flex flex-col gap-6">{data.map(renderItem)}</ul>

      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </>
  );
}

export default ReviewList;
