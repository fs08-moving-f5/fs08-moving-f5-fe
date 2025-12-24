'use client';

import React from 'react';

interface ReviewChartProps {
  score: number;
  percentage: number;
  count: number;
}

const ReviewChart = ({ score, percentage, count }: ReviewChartProps) => {
  return (
    <div className="flex items-center gap-[16px]">
      <p className="w-[36px] text-sm font-bold text-[var(--color-black-300)]">{score}점</p>

      <div className="h-[8px] w-[180px]">
        <div className="h-full w-full rounded-[16px] border border-none bg-[var(--color-bg-300)]">
          <div
            className="h-full rounded-[16px] border border-none bg-[var(--color-yellow-100)]"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <span className="w-[36px] text-sm font-bold text-[var(--color-gray-300)]">{count}</span>
    </div>
  );
};

export default ReviewChart;
