'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PendingEstimateDetailHeader from '@/features/my-estimates/ui/detailHeader';
import {
  MyPageActivitySection,
  MyPageDriverInfoSection,
  MyPageRegionsSection,
  MyPageReviewsSection,
  MyPageServicesSection,
  MyPageOfficeAddressSection,
  DriverDetailActionButtons,
} from '@/features/profile/ui';
import {
  useGetDriverPublicProfileQuery,
  useGetDriverPublicReviewsQuery,
} from '@/features/profile/hooks/queries/useProfileQueries';
import ShareButtonsSection from '@/features/driver-estimate/ui/detailUi/ShareButtonsSection';
import {
  useDeleteFavoriteMutation,
  useFavoriteMutation,
} from '@/features/favorites/hooks/mutations/useFavoriteMutation';
import ModalConfirm from '@/shared/ui/modal/ModalConfirm';
import { showToast } from '@/shared/ui/sonner';
import { useAuthStore } from '@/shared/store/authStore';
import {
  getPendingEstimateRequests,
  designatePendingEstimateRequest,
} from '@/features/estimate-request/services/estimateRequest.service';

const FindDriverDetailPage = ({
  id,
  disableFavorite = false,
}: {
  id: string;
  disableFavorite?: boolean;
}) => {
  const router = useRouter();
  const { user, isUserLoaded } = useAuthStore();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDesignatedToThisDriver, setIsDesignatedToThisDriver] = useState(false);
  const [reviewPaging, setReviewPaging] = useState<{ driverId: string; page: number }>(() => ({
    driverId: id,
    page: 1,
  }));
  const reviewLimit = 5;
  const { data, isLoading } = useGetDriverPublicProfileQuery(id);
  const currentReviewPage = reviewPaging.driverId === id ? reviewPaging.page : 1;
  const handleChangeReviewPage = (page: number) => setReviewPaging({ driverId: id, page });
  const { data: publicReviewsData, isLoading: isLoadingReviews } = useGetDriverPublicReviewsQuery({
    driverId: id,
    page: currentReviewPage,
    limit: reviewLimit,
  });
  const [favoriteByDriverId, setFavoriteByDriverId] = useState<Record<string, boolean>>({});
  const [favoritedDeltaByDriverId, setFavoritedDeltaByDriverId] = useState<Record<string, number>>(
    {},
  );
  const isFavorited = favoriteByDriverId[id] ?? false;
  const baseFavoritedCount = data?.favoritedCount ?? 0;
  const favoritedDelta = favoritedDeltaByDriverId[id] ?? 0;
  const favoritedCount = Math.max(0, baseFavoritedCount + favoritedDelta);

  const addFavoriteMutation = useFavoriteMutation();
  const deleteFavoriteMutation = useDeleteFavoriteMutation();

  const favoriteDisabled = addFavoriteMutation.isPending || deleteFavoriteMutation.isPending;

  type PendingEstimateRequestLite = {
    isDesignated?: boolean;
    designatedDriverId?: string | null;
  };

  useEffect(() => {
    if (!isUserLoaded || !user) return;

    (async () => {
      try {
        const pendingRes = await getPendingEstimateRequests();
        const pendingList = Array.isArray(pendingRes.data) ? pendingRes.data : [];
        const latest = pendingList[0] as unknown as PendingEstimateRequestLite | undefined;
        const designatedId = latest?.designatedDriverId ?? null;
        const designated = Boolean(latest?.isDesignated);
        setIsDesignatedToThisDriver(designated && designatedId === id);
      } catch {
        // 조회 실패 시 비활성화하지 않음
      }
    })();
  }, [id, isUserLoaded, user]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!data) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  const driverProfile = data.driverProfile;

  const profileForSections = {
    id: driverProfile?.id ?? '',
    name: data.name,
    imageUrl: driverProfile?.imageUrl ?? null,
    career: driverProfile?.career ?? null,
    shortIntro: driverProfile?.shortIntro ?? null,
    description: driverProfile?.description ?? null,
    services: driverProfile?.services ?? [],
    regions: driverProfile?.regions ?? [],
    favoritedCount,
  };

  const activityForSections = {
    completedCount: 0,
    averageRating: publicReviewsData?.averageRating ?? 0,
    career: driverProfile?.career ?? null,
  };

  const handleToggleFavorite = () => {
    if (favoriteDisabled) return;

    if (isFavorited) {
      deleteFavoriteMutation.mutate(id, {
        onSuccess: () => {
          setFavoriteByDriverId((prev) => ({
            ...prev,
            [id]: false,
          }));
          setFavoritedDeltaByDriverId((prev) => {
            const next = (prev[id] ?? 0) - 1;
            return {
              ...prev,
              [id]: next,
            };
          });
        },
      });
      return;
    }

    addFavoriteMutation.mutate(id, {
      onSuccess: () => {
        setFavoriteByDriverId((prev) => ({
          ...prev,
          [id]: true,
        }));
        setFavoritedDeltaByDriverId((prev) => {
          const next = (prev[id] ?? 0) + 1;
          return {
            ...prev,
            [id]: next,
          };
        });
      },
    });
  };

  const handleRequestDesignatedEstimate = async () => {
    try {
      if (isDesignatedToThisDriver) return;
      if (!user) {
        router.push(`/login/user`);
        return;
      }

      const pendingRes = await getPendingEstimateRequests();
      const pendingList = Array.isArray(pendingRes.data) ? pendingRes.data : [];

      if (pendingList.length === 0) {
        setIsConfirmOpen(true);
        return;
      }

      await designatePendingEstimateRequest(id);
      setIsDesignatedToThisDriver(true);
      showToast({
        kind: 'success',
        message: `${data.name} 기사님에게 지정 견적 요청을 보냈습니다.`,
      });
    } catch (err) {
      showToast({
        kind: 'error',
        message: err instanceof Error ? err.message : '지정 견적 요청에 실패했습니다.',
      });
    }
  };

  const handleModalConfirm = () => {
    if (!isUserLoaded) return;

    const requestUrl = '/user/estimates/request';
    setIsConfirmOpen(false);

    if (!user) {
      router.push(`/login/user`);
      return;
    }

    router.push(requestUrl);
  };

  return (
    <>
      <PendingEstimateDetailHeader
        driverImageUrl={profileForSections.imageUrl || '/img/profile.png'}
        title="기사님 프로필"
        hasImg={true}
      />

      <main className="container-responsive tab:max-w-[600px] mobile:max-w-[335px] mx-auto max-w-[1200px] px-4 py-8">
        <div className="tab:flex-col mobile:flex-col flex gap-8">
          <div className="tab:w-full mobile:w-full w-[70%]">
            <MyPageDriverInfoSection profile={profileForSections} />
            <MyPageActivitySection activity={activityForSections} />
            <MyPageServicesSection services={profileForSections.services} />
            <MyPageRegionsSection regions={profileForSections.regions} />
            <MyPageOfficeAddressSection
              address={
                driverProfile && 'officeAddress' in driverProfile
                  ? (driverProfile as { officeAddress?: string | null }).officeAddress
                  : null
              }
            />
            <MyPageReviewsSection
              averageRating={activityForSections.averageRating}
              reviewDistribution={publicReviewsData?.reviewDistribution ?? {}}
              reviewsData={publicReviewsData?.reviewsData}
              isLoadingReviews={isLoadingReviews}
              currentPage={currentReviewPage}
              onChangePage={handleChangeReviewPage}
            />
          </div>

          <div className="tab:w-full mobile:w-full w-[30%]">
            <div className="tab:items-center mobile:items-center flex w-full flex-col gap-6">
              <span className="text-lg font-semibold">
                {data.name} 기사님에게
                <br />
                지정견적을 요청해보세요!
              </span>
              <DriverDetailActionButtons
                onRequestEstimate={handleRequestDesignatedEstimate}
                onToggleFavorite={handleToggleFavorite}
                isFavorited={isFavorited}
                favoriteDisabled={favoriteDisabled}
                disableFavorite={disableFavorite}
                disableRequestEstimate={isDesignatedToThisDriver}
              />
              <ShareButtonsSection id={id} heading="공유하기" />
            </div>
          </div>
        </div>
      </main>

      <ModalConfirm
        title="지정 견적 요청하기"
        content="일반 견적 요청을 먼저 진행해주세요."
        btnText="일반 견적 요청하기"
        isOpen={isConfirmOpen}
        setIsOpen={setIsConfirmOpen}
        onClick={() => handleModalConfirm()}
      />
    </>
  );
};

export default FindDriverDetailPage;
