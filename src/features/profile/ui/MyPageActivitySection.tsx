'use client';

import type { MyPageData } from '@/features/profile/types/types';

interface MyPageActivitySectionProps {
  activity: MyPageData['activity'];
}

const MyPageActivitySection = ({ activity }: MyPageActivitySectionProps) => {
  return (
    <section className="mb-8 w-full">
      <h2 className="mb-4 text-lg font-semibold">활동 현황</h2>
      <div className="flex w-full items-center justify-evenly">
        <div className="flex flex-col items-center">
          <div className="text-sm text-gray-500">진행</div>
          <div className="text-2xl font-bold text-red-500">{activity.completedCount}건</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-sm text-gray-500">리뷰</div>
          <div className="text-2xl font-bold text-red-500">{activity.averageRating.toFixed(1)}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-sm text-gray-500">총 경력</div>
          <div className="text-2xl font-bold text-red-500">{activity.career || '-'}년</div>
        </div>
      </div>
    </section>
  );
};

export default MyPageActivitySection;
