import { useState } from 'react';
import type {
  ServiceType,
  RegionType,
  UserProfile,
  DriverProfile,
  UpdateUserProfileRequest,
  UpdateDriverProfileRequest,
} from '../types/types';
import type { UserType } from '@/features/auth/types/types';
import { useImageUpload } from './useImageUpload';
import { useUpdateProfileMutation } from './mutations/useProfileMutations';
import {
  PROFILE_ERROR_MESSAGES,
  PROFILE_VALIDATION_PATTERNS,
} from '../constants/validation.constants';

type ProfileEditFormErrors = Partial<Record<string, string>>;

/**
 * 프로필 폼 로직을 관리하는 Hook
 * Edit과 Setup 모두에서 사용 가능
 */
export function useProfileForm(
  userType: UserType,
  initialProfile?: UserProfile | DriverProfile | null,
) {
  const isDriver = userType === 'DRIVER';

  // 초기값 설정 (페이지 로드시 한번만)
  const [name, setName] = useState(
    (initialProfile && 'name' in initialProfile ? initialProfile.name : '') || '',
  );
  const [email, setEmail] = useState(
    (initialProfile && 'email' in initialProfile ? initialProfile.email : '') || '',
  );
  const [phone, setPhone] = useState(
    (initialProfile && 'phone' in initialProfile ? initialProfile.phone : '') || '',
  );
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>(
    initialProfile?.services || [],
  );
  const [selectedRegions, setSelectedRegions] = useState<RegionType[]>(
    initialProfile?.regions || [],
  );
  const [career, setCareer] = useState(
    initialProfile && 'career' in initialProfile ? initialProfile.career || '' : '',
  );
  const [shortIntro, setShortIntro] = useState(
    initialProfile && 'shortIntro' in initialProfile ? initialProfile.shortIntro || '' : '',
  );
  const [description, setDescription] = useState(
    initialProfile && 'description' in initialProfile ? initialProfile.description || '' : '',
  );
  const [errors, setErrors] = useState<ProfileEditFormErrors>({});

  const { imageUrl, handleImageSelect } = useImageUpload(initialProfile?.imageUrl || null);
  const updateMutation = useUpdateProfileMutation(userType);

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

  // 계정 필드 핸들러
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
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

  const handleSubmit = async (onSuccess?: () => void) => {
    if (!isValid || updateMutation.isPending) return;

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

    if (isDriver) {
      const driverData: UpdateDriverProfileRequest = {
        ...baseData,
        career: career || undefined,
        shortIntro: shortIntro || undefined,
        description: description || undefined,
      };
      updateMutation.mutate(driverData, {
        onSuccess: () => onSuccess?.(),
      });
    } else {
      const userData: UpdateUserProfileRequest = {
        ...baseData,
        name: name || undefined,
        email: email || undefined,
        phone: phone || undefined,
      };
      updateMutation.mutate(userData, {
        onSuccess: () => onSuccess?.(),
      });
    }
  };

  const isValid = selectedServices.length > 0 && selectedRegions.length > 0;

  return {
    // 상태
    name,
    email,
    phone,
    imageUrl,
    selectedServices,
    selectedRegions,
    career,
    shortIntro,
    description,
    errors,
    isLoading: updateMutation.isPending,
    isValid,
    isDriver,

    // 핸들러
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    handleCareerChange,
    handleShortIntroChange,
    handleDescriptionChange,
    handleImageUpload,
    toggleService,
    toggleRegion,
    handleSubmit,
  };
}
