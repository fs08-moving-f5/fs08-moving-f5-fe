'use client';

import { getPageNumbers } from './generateNumbers';
import PageArrowButton from './PageArrowButton';
import PageNumButton from './PageNumButton';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination = ({ currentPage, totalPages, onPageChange, maxVisiblePages = 5 }: Props) => {
  const pages = getPageNumbers(currentPage, totalPages, maxVisiblePages);

  const move = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <PageArrowButton type="first" disabled={currentPage === 1} onClick={() => move(1)} />

      <PageArrowButton
        type="prev"
        disabled={currentPage === 1}
        onClick={() => move(currentPage - 1)}
      />

      {pages.map((page) => (
        <PageNumButton key={page} page={page} currentPage={currentPage} onClick={move} />
      ))}

      <PageArrowButton
        type="next"
        disabled={currentPage === totalPages}
        onClick={() => move(currentPage + 1)}
      />

      <PageArrowButton
        type="last"
        disabled={currentPage === totalPages}
        onClick={() => move(totalPages)}
      />
    </div>
  );
};

export default Pagination;
