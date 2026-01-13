'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HTTPError } from 'ky';
import { Button } from '@/shared/ui/button';
import { useGetProfileQuery, useProfileForm } from '@/features/profile/hooks';
import {
  ProfileImageSection,
  DriverFieldsSection,
  ServiceSelectionSection,
  RegionSelectionSection,
  DriverOfficeAddressFields,
} from '@/features/profile/ui';
import BasicFieldsSection from '@/features/profile/ui/BasicFieldsSection';

import type { UserType } from '@/features/auth/types/types';
import type { DriverProfile, UserProfile } from '@/features/profile/types/types';

interface ProfileEditPageProps {
  userType: UserType;
}

interface ProfileEditFormProps {
  userType: UserType;
  profile: UserProfile | DriverProfile;
}

function ProfileEditForm({ userType, profile }: ProfileEditFormProps) {
  const router = useRouter();
  // 상위에서 전달된 profile을 초기값으로 사용

  const {
    name,
    email,
    phone,
    imageUrl,
    selectedServices,
    selectedRegions,
    career,
    shortIntro,
    description,
    officeAddress,
    currentPassword,
    newPassword,
    confirmNewPassword,
    errors,
    isLoading,
    isValid,
    isDriver,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    handleCareerChange,
    handleShortIntroChange,
    handleDescriptionChange,
    handleCurrentPasswordChange,
    handleNewPasswordChange,
    handleConfirmNewPasswordChange,
    handleImageUpload,
    toggleService,
    toggleRegion,
    setOfficeAddress,
    handleSubmit,
  } = useProfileForm(userType, profile);

  const handleCancel = () => {
    router.back();
  };

  const onSubmit = () => {
    handleSubmit(() => {
      router.back();
    });
  };

  return (
    <div className="tab:px-4 mobile:px-4 mx-auto max-w-[1200px] px-6 py-10">
      <div className="mx-auto max-w-[744px]">
        <div className="mobile:mb-6 mb-10">
          <h1 className="mobile:text-2xl mb-2 text-4xl font-bold">프로필 수정</h1>
          <p className="mobile:text-md text-lg text-gray-500">프로필 정보를 수정해주세요.</p>
        </div>

        <ProfileImageSection imageUrl={imageUrl} onImageUpload={handleImageUpload} />

        {!isDriver && (
          <BasicFieldsSection
            name={name}
            email={email}
            phone={phone}
            currentPassword={currentPassword}
            newPassword={newPassword}
            confirmNewPassword={confirmNewPassword}
            errors={errors}
            onNameChange={handleNameChange}
            onEmailChange={handleEmailChange}
            onPhoneChange={handlePhoneChange}
            onCurrentPasswordChange={handleCurrentPasswordChange}
            onNewPasswordChange={handleNewPasswordChange}
            onConfirmNewPasswordChange={handleConfirmNewPasswordChange}
          />
        )}

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

        {isDriver && (
          <DriverOfficeAddressFields address={officeAddress} setAddress={setOfficeAddress} />
        )}

        <div className="mobile:mt-8 mt-12 flex gap-3">
          <Button aria-label="취소" onClick={handleCancel} disabled={isLoading} variant="outlined">
            취소
          </Button>
          <Button aria-label="수정하기" onClick={onSubmit} disabled={!isValid || isLoading}>
            {isLoading ? '처리 중...' : '수정하기'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ProfileEditPage({ userType }: ProfileEditPageProps) {
  const router = useRouter();
  const { data: profile, isLoading, error } = useGetProfileQuery(userType);

  const isProfileNotFound =
    error instanceof HTTPError &&
    (error.response?.status === 404 || error.response?.status === 410);

  useEffect(() => {
    if (!isProfileNotFound) return;

    const setupPath = userType === 'USER' ? '/user/profile/setup' : '/driver/profile/setup';
    router.replace(setupPath);
  }, [isProfileNotFound, router, userType]);

  // 프로필 로딩 중
  if (isLoading) {
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

  // 프로필이 없으면(404) 프로필 등록 페이지로 이동
  if (isProfileNotFound) {
    return (
      <div className="tab:px-4 mobile:px-4 mx-auto max-w-[1200px] px-6 py-10">
        <div className="mx-auto max-w-[744px]">
          <div className="flex items-center justify-center py-20">
            <div className="text-lg text-gray-500">프로필 등록 페이지로 이동 중...</div>
          </div>
        </div>
      </div>
    );
  }

  // 프로필 조회 에러
  if (error || !profile) {
    return (
      <div className="tab:px-4 mobile:px-4 mx-auto max-w-[1200px] px-6 py-10">
        <div className="mx-auto max-w-[744px]">
          <div className="rounded-lg bg-red-50 p-6 text-center">
            <p className="text-red-600">
              {error instanceof Error ? error.message : '프로필을 찾을 수 없습니다.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 프로필 로드 완료 후 폼 렌더링
  return <ProfileEditForm userType={userType} profile={profile} />;
}
