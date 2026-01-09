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
    <div className="mx-auto mb-[78px] px-5 md:mb-[70px] md:px-[40px] lg:mb-[76px]">
      <ul className="mb-10 flex flex-col items-center gap-6 lg:mb-22">{data.map(renderItem)}</ul>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}

export default ReviewList;
