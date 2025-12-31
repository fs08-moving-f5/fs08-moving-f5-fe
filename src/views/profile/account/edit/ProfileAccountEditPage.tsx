'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import BasicFieldsSection from '@/features/profile/ui/BasicFieldsSection';
import { useGetProfileQuery, useProfileForm } from '@/features/profile/hooks';
import type { UserType } from '@/features/auth/types/types';

interface ProfileAccountEditPageProps {
  userType: UserType;
}

export default function ProfileAccountEditPage({ userType }: ProfileAccountEditPageProps) {
  const router = useRouter();
  const { data: profile, isLoading, error } = useGetProfileQuery(userType);

  const {
    name,
    email,
    phone,
    currentPassword,
    newPassword,
    confirmNewPassword,
    errors,
    isLoading: isUpdating,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    handleCurrentPasswordChange,
    handleNewPasswordChange,
    handleConfirmNewPasswordChange,
    handleSubmit,
  } = useProfileForm(userType, profile, { accountEditMode: true });

  const handleCancel = () => router.back();

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

  return (
    <div className="tab:px-4 mobile:px-4 mx-auto max-w-[1200px] px-6 py-10">
      <div className="mx-auto max-w-[744px]">
        <div className="mobile:mb-6 mb-10">
          <h1 className="mobile:text-2xl mb-2 text-4xl font-bold">기본정보 수정</h1>
          <p className="mobile:text-md text-lg text-gray-500">계정(기본) 정보를 수정해주세요.</p>
        </div>

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

        <div className="mobile:mt-8 mt-12 flex gap-3">
          <Button onClick={handleCancel} variant="outlined">
            취소
          </Button>
          <Button
            onClick={() => handleSubmit(() => router.back())}
            disabled={isUpdating}
          >
            {isUpdating ? '처리 중...' : '수정하기'}
          </Button>
        </div>
      </div>
    </div>
  );
}
