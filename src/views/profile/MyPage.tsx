'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PendingEstimateDetailHeader from '@/features/my-estimates/ui/detailHeader';
import {
  useGetMyPageQuery,
  useGetMyPageReviewsQuery,
} from '@/features/profile/hooks/queries/useMyPageQueries';
import { Button } from '@/shared/ui/button';
import Pagination from '@/shared/ui/pagination/Pagination';
import ReviewChart from '@/shared/ui/reviewChart/ReviewChart';
import { StarRating } from '@/shared/ui/star';
import Review from '@/shared/ui/card/Review';
import { ActiveChip } from '@/shared/ui/chip';

const MyPage = () => {
  const router = useRouter();
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

  const handleBasicInfoEdit = () => {
    router.push('/driver/profile/account/edit');
  };

  const handleProfileEdit = () => {
    router.push('/driver/profile/edit');
  };

  return (
    <>
      {/* 헤더 */}
      <PendingEstimateDetailHeader
        driverImageUrl={profile.imageUrl || '/img/profile.png'}
        title="마이페이지"
        hasImg={false}
      />

      <main className="container-responsive tab:max-w-[600px] mobile:max-w-[335px] mx-auto max-w-[1200px] px-4 py-8">
        <div className="tab:flex-col mobile:flex-col flex gap-8">
          <div className="tab:w-full mobile:w-full w-[70%]">
            {/* 기사 정보 */}
            <section className="mb-8">
              <div className="flex flex-row items-center gap-2">
                <Image
                  src={profile.imageUrl || '/img/profile.png'}
                  alt="profileImg"
                  width={80}
                  height={80}
                  className="mb-4 h-[80px] w-[80px] rounded-[12px] object-cover"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <Image src="/icons/name.svg" alt="이름 아이콘" width={20} height={20} />
                    <h2 className="text-xl font-semibold">{profile.name}</h2>
                  </div>
                  <div className="flex items-center">
                    <Image src="/icons/like-empty.svg" alt="찜 아이콘" width={20} height={20} />
                    <span className="text-gray-600">{profile.favoritedCount}</span>
                  </div>
                </div>
              </div>

              {profile.shortIntro && (
                <p className="text-black-300 mb-4 font-semibold">{profile.shortIntro}</p>
              )}

              {profile.description && (
                <p className="mb-4 whitespace-pre-wrap text-gray-700">{profile.description}</p>
              )}
            </section>

            {/* 활동 현황 */}
            <section className="mb-8 w-full">
              <h2 className="mb-4 text-lg font-semibold">활동 현황</h2>
              <div className="flex w-full items-center justify-evenly">
                <div className="flex flex-col items-center">
                  <div className="text-sm text-gray-500">진행</div>
                  <div className="text-2xl font-bold text-red-500">{activity.completedCount}건</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-sm text-gray-500">리뷰</div>
                  <div className="text-2xl font-bold text-red-500">
                    {activity.averageRating.toFixed(1)}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-sm text-gray-500">총 경력</div>
                  <div className="text-2xl font-bold text-red-500">{activity.career || '-'}년</div>
                </div>
              </div>
            </section>

            {/* 제공 서비스 */}
            {profile.services && profile.services.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-4 text-lg font-semibold">제공 서비스</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.services.map((service) => (
                    <ActiveChip
                      key={service}
                      text={
                        service === 'SMALL_MOVING'
                          ? '소형이사'
                          : service === 'HOME_MOVING'
                            ? '가정이사'
                            : '사무실이사'
                      }
                      isActive={true}
                      setIsActive={() => {}}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* 서비스 가능 지역 */}
            {profile.regions && profile.regions.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-4 text-lg font-semibold">서비스 가능 지역</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.regions.map((region) => (
                    <ActiveChip
                      key={region}
                      text={region}
                      isActive={false}
                      setIsActive={() => {}}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* 리뷰 섹션 */}
            <section className="mb-8">
              <h2 className="mb-4 text-lg font-semibold">리뷰</h2>

              {/* 별점 요약 */}
              <div className="mobile:flex-col mb-6 flex items-start justify-between gap-8">
                <div className="flex items-center gap-4 text-center">
                  <div className="text-5xl font-bold">{activity.averageRating.toFixed(1)}</div>
                  <div className="my-2 flex flex-col items-start justify-center gap-1">
                    <StarRating rating={activity.averageRating} size={20} />
                    <div className="text-sm text-gray-500">({totalReviews}개 리뷰)</div>
                  </div>
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
                <div className="py-8 text-center text-gray-500">아직 리뷰가 없습니다.</div>
              )}
            </section>
          </div>

          <div className="tab:w-full mobile:w-full w-[30%]">
            <div className="tab:flex-row mobile:flex-col tab:justify-center mobile:justify-center flex flex-col gap-4">
              <Button onClick={handleProfileEdit} isWriting={true}>
                내 프로필 수정
              </Button>
              <Button
                onClick={handleBasicInfoEdit}
                isWriting={true}
                variant="outlined"
                design="secondary"
              >
                기본 정보 수정
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MyPage;
