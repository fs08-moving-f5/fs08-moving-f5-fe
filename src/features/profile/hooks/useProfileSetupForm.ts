import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateProfile } from './useCreateProfile';
import { useImageUpload } from './useImageUpload';
import { useUpdateDriverOfficeAddressMutation } from './mutations/useProfileMutations';
import {
  PROFILE_ERROR_MESSAGES,
  PROFILE_VALIDATION_PATTERNS,
} from '../constants/validation.constants';
import { showToast } from '@/shared/ui/sonner';

import type { ServiceType, RegionType } from '../types/types';
import type { UserType } from '@/features/auth/types/types';
import type { AddressParams } from '@/features/estimateRequest/types/type';

interface ProfileSetupFormErrors {
  career: string;
  shortIntro: string;
  description: string;
}

export function useProfileSetupForm(userType: UserType) {
  const router = useRouter();
  const {
    imageUrl,
    isUploading,
    error: imageUploadError,
    handleImageSelect,
    uploadPendingImage,
  } = useImageUpload();
  const { handleCreateProfile, isLoading, error } = useCreateProfile(userType);
  const { mutate: updateDriverOfficeAddress } = useUpdateDriverOfficeAddressMutation();

  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<RegionType[]>([]);
  const [career, setCareer] = useState('');
  const [shortIntro, setShortIntro] = useState('');
  const [description, setDescription] = useState('');
  const [officeAddress, setOfficeAddress] = useState<AddressParams | undefined>(undefined);
  const [errors, setErrors] = useState<ProfileSetupFormErrors>({
    career: '',
    shortIntro: '',
    description: '',
  });

  const isDriver = userType === 'DRIVER';

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

  const handleSubmit = async () => {
    if (!isValid || isLoading) return;

    if (isUploading) {
      showToast({ kind: 'error', message: '이미지 업로드가 완료될 때까지 기다려주세요.' });
      return;
    }

    const imageKeyForSubmit = await uploadPendingImage();
    if (imageUrl && imageUrl.startsWith('data:') && !imageKeyForSubmit) {
      showToast({
        kind: 'error',
        message: imageUploadError || '이미지 업로드에 실패했습니다.',
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
      imageUrl: imageKeyForSubmit || undefined,
      services: selectedServices,
      regions: selectedRegions,
    };

    try {
      if (isDriver) {
        await handleCreateProfile({
          ...baseData,
          career: career ? Number(career) : undefined,
          shortIntro: shortIntro || undefined,
          description: description || undefined,
        });
      } else {
        await handleCreateProfile(baseData);
      }

      showToast({ kind: 'success', message: '프로필이 등록되었습니다.' });

      // 프로필 생성 성공 후 사무실 주소가 있으면 등록 API 호출
      if (isDriver && officeAddress) {
        updateDriverOfficeAddress({
          officeAddress: officeAddress.address,
          officeZoneCode: officeAddress.zoneCode || null,
          officeSido: officeAddress.sido || null,
          officeSigungu: officeAddress.sigungu || null,
        });
      }

      router.push('/');
    } catch (error) {
      showToast({
        kind: 'error',
        message: error instanceof Error ? error.message : '프로필 등록에 실패했습니다.',
      });
    }
  };

  const isValid =
    selectedServices.length > 0 &&
    selectedRegions.length > 0 &&
    (isDriver ? !!officeAddress : true);

  return {
    // 상태
    imageUrl,
    selectedServices,
    selectedRegions,
    career,
    shortIntro,
    description,
    officeAddress,
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
    setOfficeAddress,
    handleSubmit,
  };
}
