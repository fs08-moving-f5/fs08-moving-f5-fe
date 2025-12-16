'use client';

import React from 'react';

interface Props {
  page: number;
  currentPage: number;
  onClick: (page: number) => void;
}

const PageNumButton = ({ page, currentPage, onClick }: Props) => {
  const isActive = currentPage === page;

  return (
    <button
      onClick={() => onClick(page)}
      className={`min-h-[40px] min-w-[40px] rounded px-3 py-2 text-[14px] transition-all md:min-h-[45px] md:min-w-[45px] lg:min-h-[50px] lg:min-w-[50px] lg:text-base ${
        isActive
          ? 'border border-[var(--color-black-500)] font-semibold text-[var(--color-black-500)]'
          : 'text-[var(--color-gray-200)] hover:bg-gray-100 hover:text-gray-500'
      } `}
    >
      {page}
    </button>
  );
};

export default PageNumButton;
