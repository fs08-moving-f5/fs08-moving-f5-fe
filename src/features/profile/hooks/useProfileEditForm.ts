import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUpdateProfile } from './useUpdateProfile';
import { useImageUpload } from './useImageUpload';
import {
  PROFILE_ERROR_MESSAGES,
  PROFILE_VALIDATION_PATTERNS,
} from '../constants/validation.constants';
import { showToast } from '@/shared/ui/sonner';

import type { DriverProfile, RegionType, ServiceType, UserProfile } from '../types/types';
import type { UserType } from '@/features/auth/types/types';

interface ProfileEditFormErrors {
  career: string;
  shortIntro: string;
  description: string;
}

export function useProfileEditForm(
  userType: UserType,
  initialProfile: UserProfile | DriverProfile | null,
) {
  const router = useRouter();
  const {
    imageUrl,
    uploadedImageKey,
    isUploading,
    error: imageUploadError,
    setImage,
    handleImageSelect,
  } = useImageUpload(initialProfile?.imageUrl || null, initialProfile?.imageKey || null);
  const { handleUpdateProfile, isLoading, error } = useUpdateProfile(userType);

  const [selectedServices, setSelectedServices] = useState<ServiceType[]>(
    initialProfile?.services || [],
  );
  const [selectedRegions, setSelectedRegions] = useState<RegionType[]>(
    initialProfile?.regions || [],
  );
  const [career, setCareer] = useState(
    initialProfile && 'career' in initialProfile
      ? initialProfile.career !== null && initialProfile.career !== undefined
        ? String(initialProfile.career)
        : ''
      : '',
  );
  const [shortIntro, setShortIntro] = useState(
    initialProfile && 'shortIntro' in initialProfile ? initialProfile.shortIntro || '' : '',
  );
  const [description, setDescription] = useState(
    initialProfile && 'description' in initialProfile ? initialProfile.description || '' : '',
  );
  const [errors, setErrors] = useState<ProfileEditFormErrors>({
    career: '',
    shortIntro: '',
    description: '',
  });

  const isDriver = userType === 'DRIVER';

  // initialProfile이 변경될 때만 이미지 URL 업데이트
  useEffect(() => {
    if (initialProfile?.imageUrl) {
      setImage({ url: initialProfile.imageUrl, key: initialProfile.imageKey || null });
    }
  }, [initialProfile, setImage]);

  // Validation 함수들
  const validateCareer = (value: string): string => {
    if (value && !PROFILE_VALIDATION_PATTERNS.NUMBER_ONLY.test(value)) {
      return PROFILE_ERROR_MESSAGES.CAREER.INVALID_FORMAT;
    }
    return '';
  };

  const validateShortIntro = (value: string): string => {
    if (value && value.length < 8) {
      return PROFILE_ERROR_MESSAGES.SHORT_INTRO.MIN_LENGTH;
    }
    return '';
  };

  const validateDescription = (value: string): string => {
    if (value && value.length < 10) {
      return PROFILE_ERROR_MESSAGES.DESCRIPTION.MIN_LENGTH;
    }
    return '';
  };

  // 입력 핸들러들
  const handleCareerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCareer(value);
    setErrors((prev) => ({ ...prev, career: validateCareer(value) }));
  };

  const handleShortIntroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setShortIntro(value);
    setErrors((prev) => ({ ...prev, shortIntro: validateShortIntro(value) }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDescription(value);
    setErrors((prev) => ({ ...prev, description: validateDescription(value) }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const toggleService = (service: ServiceType) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service],
    );
  };

  const toggleRegion = (region: RegionType) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region],
    );
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = async () => {
    if (!isValid || isLoading) return;

    if (isUploading) {
      showToast({ kind: 'error', message: '이미지 업로드가 완료될 때까지 기다려주세요.' });
      return;
    }

    // 기존 프로필 이미지는 BE에서 presigned URL(http/https)로 내려오므로
    // 새로 업로드(미리보기 data URL)인 경우에만 imageKey를 강제합니다.
    if (imageUrl && imageUrl.startsWith('data:') && !uploadedImageKey) {
      showToast({
        kind: 'error',
        message: imageUploadError || '이미지 업로드가 완료되지 않았습니다.',
      });
      return;
    }

    // 제출 전 validation
    if (isDriver) {
      const careerError = validateCareer(career);
      const shortIntroError = validateShortIntro(shortIntro);
      const descriptionError = validateDescription(description);

      setErrors({
        career: careerError,
        shortIntro: shortIntroError,
        description: descriptionError,
      });

      if (careerError || shortIntroError || descriptionError) {
        return;
      }
    }

    const baseData = {
      imageUrl: uploadedImageKey || undefined,
      services: selectedServices,
      regions: selectedRegions,
    };

    try {
      if (isDriver) {
        await handleUpdateProfile({
          ...baseData,
          career: career ? Number(career) : undefined,
          shortIntro: shortIntro || undefined,
          description: description || undefined,
        });
      } else {
        await handleUpdateProfile(baseData);
      }

      showToast({ kind: 'success', message: '프로필이 수정되었습니다.' });
      router.back();
    } catch (error) {
      showToast({
        kind: 'error',
        message: error instanceof Error ? error.message : '프로필 수정에 실패했습니다.',
      });
    }
  };

  const isValid = selectedServices.length > 0 && selectedRegions.length > 0;

  return {
    // 상태
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

    // 핸들러
    handleCareerChange,
    handleShortIntroChange,
    handleDescriptionChange,
    handleImageUpload,
    toggleService,
    toggleRegion,
    handleCancel,
    handleSubmit,
  };
}
