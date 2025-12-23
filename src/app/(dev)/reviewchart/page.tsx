'use client';

import { useState } from 'react';
import StarRating from '@/shared/ui/reviewChart/StarRating';
import ReviewChart from '@/shared/ui/reviewChart/ReviewChart';

type Rating = 1 | 2 | 3 | 4 | 5;

interface Review {
  rating: Rating;
}

// 개발자 테스트 페이지
const ReviewChartPage = () => {
  const [rating, setRating] = useState<number>(0);

  const reviews: Review[] = [
    { rating: 5 },
    { rating: 5 },
    { rating: 4 },
    { rating: 3 },
    { rating: 1 },
    { rating: 5 },
  ];

  const ratingCount = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  reviews.forEach((r) => ratingCount[r.rating]++);

  const total = reviews.length;

  const ratingPercentage = {
    5: (ratingCount[5] / total) * 100,
    4: (ratingCount[4] / total) * 100,
    3: (ratingCount[3] / total) * 100,
    2: (ratingCount[2] / total) * 100,
    1: (ratingCount[1] / total) * 100,
  };

  const scores: Rating[] = [5, 4, 3, 2, 1];

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
        <StarRating type="get" value={0} />
        <StarRating type="get" value={1} />
        <StarRating type="get" value={2} />
        <StarRating type="get" value={3} />
        <StarRating type="get" value={4} />
        <StarRating type="get" value={5} />
      </div>

      <div className="flex flex-col">
        {scores.map((score) => (
          <ReviewChart
            key={score}
            score={score}
            percentage={ratingPercentage[score]}
            count={ratingCount[score]}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewChartPage;
