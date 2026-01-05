'use client';

import { useState } from 'react';
import PendingEstimateDetailHeader from '@/features/my-estimates/ui/detailHeader';
import {
	MyPageActivitySection,
	MyPageDriverInfoSection,
	MyPageRegionsSection,
	MyPageReviewsSection,
	MyPageServicesSection,
	DriverDetailActionButtons,
} from '@/features/profile/ui';
import { useGetDriverPublicProfileQuery } from '@/features/profile/hooks/queries/useProfileQueries';
import ShareButtonsSection from '@/features/driver-estimate/ui/detailUi/ShareButtonsSection';
import {
  useDeleteFavoriteMutation,
  useFavoriteMutation,
} from '@/features/favorites/hooks/mutations/useFavoriteMutation';

const FindDriverDetailPage = ({ id, disableFavorite = false }: { id: string; disableFavorite?: boolean }) => {
	const { data, isLoading } = useGetDriverPublicProfileQuery(id);
	const [favoriteByDriverId, setFavoriteByDriverId] = useState<Record<string, boolean>>({});
	const isFavorited = favoriteByDriverId[id] ?? false;

	const addFavoriteMutation = useFavoriteMutation();
	const deleteFavoriteMutation = useDeleteFavoriteMutation();

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
		favoritedCount: 0,
	};

	const activityForSections = {
		completedCount: 0,
		averageRating: 0,
		career: driverProfile?.career ?? null,
	};

	const favoriteDisabled = addFavoriteMutation.isPending || deleteFavoriteMutation.isPending;

	const handleToggleFavorite = () => {
		if (favoriteDisabled) return;

		if (isFavorited) {
			deleteFavoriteMutation.mutate(id, {
				onSuccess: () =>
					setFavoriteByDriverId((prev) => ({
						...prev,
						[id]: false,
					})),
			});
			return;
		}

		addFavoriteMutation.mutate(id, {
			onSuccess: () =>
				setFavoriteByDriverId((prev) => ({
					...prev,
					[id]: true,
				})),
		});
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
						<MyPageReviewsSection
							averageRating={activityForSections.averageRating}
							reviewDistribution={{}}
							reviewsData={undefined}
							isLoadingReviews={false}
							currentPage={1}
							onChangePage={() => {}}
						/>
					</div>

					<div className="tab:w-full mobile:w-full w-[30%]">
						<div className="tab:items-center mobile:items-center flex w-full flex-col gap-6">
              <span className='text-lg font-semibold'>{data.name} 기사님에게<br/>지정견적을 요청해보세요!</span>
							<DriverDetailActionButtons
								onRequestEstimate={() => {}}
								onToggleFavorite={handleToggleFavorite}
								isFavorited={isFavorited}
								favoriteDisabled={favoriteDisabled}
								disableFavorite={disableFavorite}
							/>
							<ShareButtonsSection heading="공유하기" />
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default FindDriverDetailPage;
