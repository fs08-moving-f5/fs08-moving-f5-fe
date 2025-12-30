'use client';

import { useState } from 'react';
import Image from 'next/image';
import PendingEstimateDetailHeader from '@/features/my-estimates/ui/detailHeader';
import { useGetMyPageQuery, useGetMyPageReviewsQuery } from '@/features/profile/hooks/queries/useMyPageQueries';
import { Button } from '@/shared/ui/button';
import Pagination from '@/shared/ui/pagination/Pagination';
import ReviewChart from '@/shared/ui/reviewChart/ReviewChart';
import { StarRating } from '@/shared/ui/star';
import Review from '@/shared/ui/card/Review';

const MyPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const { data: myPageData, isLoading: isLoadingData } = useGetMyPageQuery();
  const { data: reviewsData, isLoading: isLoadingReviews } = useGetMyPageReviewsQuery({
    page: currentPage,
    limit,
  });

  if (isLoadingData) {
    return <div>로딩 중...</div>;
  }

  if (!myPageData) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  const { profile, activity, reviewDistribution } = myPageData;

  // 별점 분포 데이터 계산
  const totalReviews = Object.values(reviewDistribution).reduce((sum, count) => sum + count, 0);
  const getPercentage = (count: number) => (totalReviews > 0 ? (count / totalReviews) * 100 : 0);

  return (
    <>
      {/* 헤더 */}
      <PendingEstimateDetailHeader 
        driverImageUrl={profile.imageUrl || '/img/profile.png'} 
        title="마이페이지"
      />

      <div className="container-responsive tab:max-w-[600px] mobile:max-w-[335px] max-w-[1200px] mx-auto px-4 py-8">
        {/* 기사 정보 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Image src="/icons/solid/user.svg" alt="기사" width={20} height={20} />
            <span className="text-xl font-semibold">{profile.name}</span>
          </div>

          {profile.shortIntro && (
            <p className="text-gray-600 mb-4">{profile.shortIntro}</p>
          )}

          {profile.description && (
            <p className="text-gray-700 mb-4 whitespace-pre-wrap">{profile.description}</p>
          )}
        </div>

        {/* 활동 현황 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">활동 현황</h2>
          <div className="flex gap-8 mb-6">
            <div className="text-center">
              <div className="text-sm text-gray-500">작업</div>
              <div className="text-2xl font-bold text-red-500">{activity.completedCount}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">리뷰</div>
              <div className="text-2xl font-bold">{activity.averageRating.toFixed(1)}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">경력</div>
              <div className="text-2xl font-bold">{activity.career || '-'}</div>
            </div>
          </div>
        </div>

        {/* 제공 서비스 */}
        {profile.services && profile.services.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">제공 서비스</h2>
            <div className="flex flex-wrap gap-2">
              {profile.services.map((service) => (
                <span
                  key={service}
                  className="px-4 py-2 bg-red-50 text-red-500 rounded-full text-sm border border-red-200"
                >
                  {service === 'SMALL_MOVING' ? '소형이사' : service === 'HOME_MOVING' ? '가정이사' : '사무실이사'}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 서비스 가능 지역 */}
        {profile.regions && profile.regions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">서비스 가능 지역</h2>
            <div className="flex flex-wrap gap-2">
              {profile.regions.map((region) => (
                <span
                  key={region}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                >
                  {region}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 리뷰 섹션 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">리뷰</h2>

          {/* 별점 요약 */}
          <div className="flex items-start gap-8 mb-6">
            <div className="text-center">
              <div className="text-5xl font-bold">{activity.averageRating.toFixed(1)}</div>
              <div className="flex items-center justify-center gap-1 my-2">
                <StarRating rating={activity.averageRating} size={20} />
              </div>
              <div className="text-sm text-gray-500">({totalReviews}개 리뷰)</div>
            </div>

            {/* 별점 분포 */}
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

          {/* 리뷰 목록 */}
          {isLoadingReviews ? (
            <div>리뷰를 불러오는 중...</div>
          ) : reviewsData && reviewsData.reviews.length > 0 ? (
            <>
              <div className="space-y-4 mb-6">
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

              {/* 페이지네이션 */}
              {reviewsData.pagination.totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={reviewsData.pagination.totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          ) : (
            <div className="text-center text-gray-500 py-8">아직 리뷰가 없습니다.</div>
          )}
        </div>

        {/* 기본 정보 수정 버튼 */}
        <div className="flex justify-center gap-4 mt-8">
          <Button onClick={() => window.location.href = '/driver/profile/edit'}>
            기본 정보 수정
          </Button>
        </div>
      </div>
    </>
  );
};

export default MyPage;

