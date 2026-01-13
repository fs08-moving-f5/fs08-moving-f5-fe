'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PendingEstimateDetailHeader from '@/features/my-estimates/ui/detailHeader';
import {
  useGetMyPageQuery,
  useGetMyPageReviewsQuery,
} from '@/features/profile/hooks/queries/useMyPageQueries';
import {
  MyPageActivitySection,
  MyPageDriverInfoSection,
  MyPageEditButtonsSection,
  MyPageRegionsSection,
  MyPageReviewsSection,
  MyPageServicesSection,
  MyPageOfficeAddressSection,
} from '@/features/profile/ui';

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
            <MyPageDriverInfoSection profile={profile} />
            <MyPageActivitySection activity={activity} />
            <MyPageServicesSection services={profile.services} />
            <MyPageRegionsSection regions={profile.regions} />
            <MyPageOfficeAddressSection address={profile.officeAddress} />
            <MyPageReviewsSection
              averageRating={activity.averageRating}
              reviewDistribution={reviewDistribution}
              reviewsData={reviewsData}
              isLoadingReviews={isLoadingReviews}
              currentPage={currentPage}
              onChangePage={setCurrentPage}
            />
          </div>

          <div className="tab:w-full mobile:w-full w-[30%]">
            <MyPageEditButtonsSection
              onProfileEdit={handleProfileEdit}
              onBasicInfoEdit={handleBasicInfoEdit}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default MyPage;
