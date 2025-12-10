'use client';

import { useState } from 'react';
import StarRating from '@/shared/ui/ReviewChart/StarRating';

// 개발자 테스트 페이지
const ReviewChartPage = () => {
  const [rating, setRating] = useState<number>(0);

  return (
    <div className="flex flex-col gap-4 bg-[var(--color-grayScale-500)] p-4">
      <div>
        <h1>별점 생성 - 클릭/드래그</h1>
        <StarRating
          type="post"
          defaultValue={0}
          onChange={(value) => {
            setRating(value); // 별점 변경 시 부모 상태 업데이트
          }}
        />
        <p className="mt-2 text-white">선택된 별점: {rating}</p>
      </div>

      <div>
        <h1>별점 조회</h1>
        <StarRating type="get" value={3.2} />
      </div>
    </div>
  );
};

export default ReviewChartPage;
