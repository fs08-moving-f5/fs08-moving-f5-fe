'use client';

import { StarRating } from '@/shared/ui/star';

interface ReviewProps {
  userName: string;
  date: string;
  rating: number;
  content: string;
}

const Review = ({ userName, date, rating, content }: ReviewProps) => {
  const maskName = (name: string) => {
    if (name.length <= 1) return name;
    return name[0] + '*'.repeat(name.length - 1);
  };

  return (
    <article className="mobile:p-4 tab:p-5 w-full max-w-[1200px] bg-white p-6 shadow-md">
      <div className="mobile:gap-3 tab:gap-3 flex flex-col gap-4">
        {/* 헤더: 사용자 이름과 날짜 */}
        <header className="flex items-center gap-2">
          <h3 className="mobile:text-sm tab:text-sm text-black-500 text-base font-medium">
            {maskName(userName)}
          </h3>
          <span
            className="mobile:mx-0.5 mobile:text-xs text-grayScale-200 mx-1 text-sm"
            aria-hidden="true"
          >
            |
          </span>
          <time className="mobile:text-xs tab:text-xs text-grayScale-500 text-sm">{date}</time>
        </header>

        {/* 별점 */}
        <StarRating rating={rating} />

        {/* 리뷰 내용 */}
        <p className="mobile:text-sm tab:text-sm text-black-500 text-lg leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </article>
  );
};

export default Review;
