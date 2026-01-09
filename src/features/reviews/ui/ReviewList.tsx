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
    <div className="mx-auto px-5 md:px-[40px]">
      <ul className="mx-auto mb-10 flex w-full max-w-[1200px] flex-col items-center gap-6 md:mb-10 lg:mb-22">
        {data.map(renderItem)}
      </ul>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}

export default ReviewList;
