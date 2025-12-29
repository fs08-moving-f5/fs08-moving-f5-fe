'use client';

import { Button } from '@/shared/ui/button';
import type { UserType } from '@/features/auth/types/types';
import { useGetProfile, useProfileEditForm } from '@/features/profile/hooks';
import {
  ProfileImageSection,
  DriverFieldsSection,
  ServiceSelectionSection,
  RegionSelectionSection,
} from '@/features/profile/ui';

interface ProfileEditPageProps {
  userType: UserType;
}

export default function ProfileEditPage({ userType }: ProfileEditPageProps) {
  const { profile, isLoading: isLoadingProfile, error: profileError } = useGetProfile(userType);

  const {
    imageUrl,
    selectedServices,
    selectedRegions,
    career,
    shortIntro,
    description,
    errors,
    isLoading,
    error,
    isValid,
    isDriver,
    handleCareerChange,
    handleShortIntroChange,
    handleDescriptionChange,
    handleImageUpload,
    toggleService,
    toggleRegion,
    handleCancel,
    handleSubmit,
  } = useProfileEditForm(userType, profile);

  // 프로필 로딩 중
  if (isLoadingProfile) {
    return (
      <div className="tab:px-4 mobile:px-4 mx-auto max-w-[1200px] px-6 py-10">
        <div className="mx-auto max-w-[744px]">
          <div className="flex items-center justify-center py-20">
            <div className="text-lg text-gray-500">프로필 정보를 불러오는 중...</div>
          </div>
        </div>
      </div>
    );
  }

  // 프로필 조회 에러
  if (profileError || !profile) {
    return (
      <div className="tab:px-4 mobile:px-4 mx-auto max-w-[1200px] px-6 py-10">
        <div className="mx-auto max-w-[744px]">
          <div className="rounded-lg bg-red-50 p-6 text-center">
            <p className="text-red-600">{profileError || '프로필을 찾을 수 없습니다.'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tab:px-4 mobile:px-4 mx-auto max-w-[1200px] px-6 py-10">
      <div className="mx-auto max-w-[744px]">
        <div className="mobile:mb-6 mb-10">
          <h1 className="mobile:text-2xl mb-2 text-4xl font-bold">프로필 수정</h1>
          <p className="mobile:text-md text-lg text-gray-500">프로필 정보를 수정해주세요.</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <ProfileImageSection imageUrl={imageUrl} onImageUpload={handleImageUpload} />

        {isDriver && (
          <DriverFieldsSection
            career={career}
            shortIntro={shortIntro}
            description={description}
            errors={errors}
            onCareerChange={handleCareerChange}
            onShortIntroChange={handleShortIntroChange}
            onDescriptionChange={handleDescriptionChange}
          />
        )}

        <ServiceSelectionSection
          selectedServices={selectedServices}
          onToggleService={toggleService}
        />

        <RegionSelectionSection selectedRegions={selectedRegions} onToggleRegion={toggleRegion} />

        <div className="mobile:mt-8 mt-12 flex gap-3">
          <Button onClick={handleCancel} disabled={isLoading} variant="outlined">
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid || isLoading}>
            {isLoading ? '처리 중...' : '수정하기'}
          </Button>
        </div>
      </div>
    </div>
  );
}
