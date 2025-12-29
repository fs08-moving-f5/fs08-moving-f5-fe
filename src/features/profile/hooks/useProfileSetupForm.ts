import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ServiceType, RegionType } from '../types/types';
import type { UserType } from '@/features/auth/types/types';
import { useCreateProfile } from './useCreateProfile';
import { useImageUpload } from './useImageUpload';
import {
  PROFILE_ERROR_MESSAGES,
  PROFILE_VALIDATION_PATTERNS,
} from '../constants/validation.constants';
import { showToast } from '@/shared/ui/sonner';

interface ProfileSetupFormErrors {
  career: string;
  shortIntro: string;
  description: string;
}

export function useProfileSetupForm(userType: UserType) {
  const router = useRouter();
  const { imageUrl, handleImageSelect } = useImageUpload();
  const { handleCreateProfile, isLoading, error } = useCreateProfile(userType);

  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<RegionType[]>([]);
  const [career, setCareer] = useState('');
  const [shortIntro, setShortIntro] = useState('');
  const [description, setDescription] = useState('');
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
      imageUrl: imageUrl || undefined,
      services: selectedServices,
      regions: selectedRegions,
    };

    try {
      if (isDriver) {
        await handleCreateProfile({
          ...baseData,
          career: career || undefined,
          shortIntro: shortIntro || undefined,
          description: description || undefined,
        });
      } else {
        await handleCreateProfile(baseData);
      }

      showToast({ kind: 'success', message: '프로필이 등록되었습니다.' });
      router.push('/');
    } catch (error) {
      console.error('프로필 등록 실패:', error);
      showToast({
        kind: 'error',
        message: error instanceof Error ? error.message : '프로필 등록에 실패했습니다.',
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
    handleSubmit,
  };
}
