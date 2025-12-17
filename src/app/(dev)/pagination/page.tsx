'use client';

import React, { useState, useMemo } from 'react';
import Pagination from '@/shared/ui/Pagination/Pagination';

interface MockItem {
  id: number;
  title: string;
  description: string;
}

// 임시 데이터 생성 함수 (100개의 아이템)
const generateMockData = () => {
  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `${i + 1}번`,
    description: `${i + 1}번째 테스트 데이터`,
  }));
};

// 개발자 페이지 - 페이지네이션
const PaginationPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3; // 페이지당 아이템 수

  const mockData = useMemo(() => generateMockData(), []);
  const totalPages = Math.ceil(mockData.length / itemsPerPage);

  const displayData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return mockData.slice(startIndex, endIndex);
  }, [currentPage, mockData, itemsPerPage]);

  const handlePageChange = (page: number) => {
    console.log(`페이지 ${page}로 이동`);
    setCurrentPage(page);
  };

  return (
    <div className="mb-8 h-full w-full">
      <div className="mb-4 rounded-[8px] bg-white p-4 shadow-md">
        <p className="mb-2 text-black">
          현재 페이지: <span className="text-black">{currentPage}</span> / {totalPages}
        </p>
        <p className="text-sm text-gray-400">
          총 {mockData.length}개 아이템 중 {(currentPage - 1) * itemsPerPage + 1} ~{' '}
          {Math.min(currentPage * itemsPerPage, mockData.length)}번
        </p>
      </div>

      <div className="mb-8 grid grid-flow-col gap-4">
        {displayData.map((item) => (
          <div key={item.id} className="rounded-[8px] bg-white p-6 shadow-md transition-colors">
            <h4 className="mb-2 text-lg font-semibold text-black">{item.title}</h4>
            <p className="text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PaginationPage;
