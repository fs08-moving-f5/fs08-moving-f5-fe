'use client';

import { PageItem, PaginationProps } from '@/shared/types/pagination';
import generateNumbers from './generateNumbers';
import PageNumButton from './PageNumButton';
import PageArrowButton from './PageArrowButton';
import PageDropdown from './PageDropdown';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  options = {
    maxVisiblePages: 7,
    edgePageCount: 1,
    siblingCount: 1,
  },
}: PaginationProps) => {
  const pages: PageItem[] = generateNumbers({
    currentPage,
    totalPages,
    ...options,
  });

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <PageArrowButton
        direction="prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {pages.map((page, idx) =>
        typeof page === 'number' ? (
          <PageNumButton key={page} page={page} currentPage={currentPage} onClick={onPageChange} />
        ) : (
          <PageDropdown
            key={`ellipsis-${idx}`}
            startPage={page.start}
            endPage={page.end}
            currentPage={currentPage}
            onClick={onPageChange}
          />
        ),
      )}

      <PageArrowButton
        direction="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;
