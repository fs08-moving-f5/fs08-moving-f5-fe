'use client';

import { Button } from '@/shared/ui/button';
import type { UserType } from '@/features/auth/types/types';
import { useProfileSetupForm } from '@/features/profile/hooks';
import {
  ProfileSetupHeader,
  ProfileImageSection,
  DriverFieldsSection,
  ServiceSelectionSection,
  RegionSelectionSection,
} from '@/features/profile/ui';

interface ProfileSetupPageProps {
  userType: UserType;
}

export default function ProfileSetupPage({ userType }: ProfileSetupPageProps) {
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
    handleSubmit,
  } = useProfileSetupForm(userType);

  return (
    <div className="tab:px-4 mobile:px-4 mx-auto max-w-[1200px] px-6 py-10">
      <div className="mx-auto max-w-[744px]">
        <ProfileSetupHeader error={error || undefined} />

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

        <div className="mobile:mt-8 mx-auto mt-12 flex justify-center">
          <Button onClick={handleSubmit} disabled={!isValid || isLoading}>
            {isLoading ? '처리 중...' : '시작하기'}
          </Button>
        </div>
      </div>
    </div>
  );
}
