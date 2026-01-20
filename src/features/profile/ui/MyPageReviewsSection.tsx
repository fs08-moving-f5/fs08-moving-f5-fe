'use client';

import Pagination from '@/shared/ui/pagination/Pagination';
import ReviewChart from '@/shared/ui/reviewChart/ReviewChart';
import { StarRating } from '@/shared/ui/star';
import Review from '@/shared/ui/card/Review';

import type { MyPageData, ReviewListData } from '@/features/profile/types/types';

interface MyPageReviewsSectionProps {
  averageRating: number;
  reviewDistribution: MyPageData['reviewDistribution'];
  reviewsData: ReviewListData | undefined;
  isLoadingReviews: boolean;
  currentPage: number;
  onChangePage: (page: number) => void;
}

const MyPageReviewsSection = ({
  averageRating,
  reviewDistribution,
  reviewsData,
  isLoadingReviews,
  currentPage,
  onChangePage,
}: MyPageReviewsSectionProps) => {
  const totalReviews = Object.values(reviewDistribution).reduce((sum, count) => sum + count, 0);
  const getPercentage = (count: number) => (totalReviews > 0 ? (count / totalReviews) * 100 : 0);

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-lg font-semibold">리뷰</h2>

      <div className="mobile:flex-col mb-6 flex items-start justify-between gap-8">
        <div className="flex items-center gap-4 text-center">
          <div className="text-5xl font-bold">{averageRating.toFixed(1)}</div>
          <div className="my-2 flex flex-col items-start justify-center gap-1">
            <StarRating rating={averageRating} size={20} />
            <div className="text-sm text-gray-500">({totalReviews}개 리뷰)</div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <ReviewChart
              key={rating}
              score={rating}
              percentage={getPercentage(reviewDistribution[rating] || 0)}
              count={reviewDistribution[rating] || 0}
            />
          ))}
        </div>
      </div>

      {isLoadingReviews ? (
        <div>리뷰를 불러오는 중...</div>
      ) : reviewsData && reviewsData.reviews.length > 0 ? (
        <>
          <div className="mb-6">
            {reviewsData.reviews.map((review) => (
              <Review
                key={review.id}
                userName={review.userName}
                date={new Date(review.createdAt).toLocaleDateString('ko-KR')}
                rating={review.rating || 0}
                content={review.content || ''}
              />
            ))}
          </div>

          {reviewsData.pagination.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={reviewsData.pagination.totalPages}
              onPageChange={onChangePage}
              scrollToTop={false}
            />
          )}
        </>
      ) : (
        <div className="py-8 text-center text-gray-500">아직 리뷰가 없습니다.</div>
      )}
    </section>
  );
};

export default MyPageReviewsSection;
