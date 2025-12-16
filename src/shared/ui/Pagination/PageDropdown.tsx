'use client';

import React, { useState } from 'react';

interface Props {
  startPage: number;
  endPage: number;
  currentPage: number;
  onClick: (p: number) => void;
}

const PageDropDown = ({ startPage, endPage, currentPage, onClick }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  // 드롭다운에 표시할 페이지 목록 생성
  const dropdownPages = [];
  for (let i = startPage; i <= endPage; i++) {
    dropdownPages.push(i);
  }

  const handlePageSelect = (page: number) => {
    onClick(page);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group min-h-[40px] min-w-[40px] rounded px-3 py-2 text-[14px] text-[var(--color-gray-200)] transition-all md:min-h-[45px] md:min-w-[45px] lg:min-h-[50px] lg:min-w-[50px] lg:text-base"
        aria-label="더 많은 페이지 보기"
      >
        ...
        <span className="absolute right-0 bottom-0 h-0 w-0 border-b-[8px] border-l-[8px] border-b-white border-l-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          <div className="absolute z-20 mt-2 max-h-60 overflow-y-auto border border-white bg-white shadow-lg">
            <div className="min-w-[100px] py-1">
              {dropdownPages.map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageSelect(page)}
                  className={`w-full px-4 py-2 text-left text-black transition-colors hover:bg-gray-100 ${
                    currentPage === page ? 'bg-gray-900 font-semibold' : 'text-black'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PageDropDown;
