import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useImageUpload } from './useImageUpload';
import { showToast } from '@/shared/ui/sonner';
import {
  useUpdateDriverOfficeAddressMutation,
  useUpdateProfileMutation,
} from './mutations/useProfileMutations';
import MY_PAGE_QUERY_KEY from '../constants/myPageQueryKey';
import PROFILE_QUERY_KEY from '../constants/queryKey';
import {
  PROFILE_ERROR_MESSAGES,
  PROFILE_VALIDATION_PATTERNS,
  PROFILE_VALIDATION_PATTERNS_EXT,
  PROFILE_VALIDATION_RULES,
} from '../constants/validation.constants';

import type {
  ServiceType,
  RegionType,
  UserProfile,
  DriverProfile,
  UpdateUserProfileRequest,
  UpdateDriverProfileRequest,
} from '../types/types';
import type { UserType } from '@/features/auth/types/types';
import type { AddressParams } from '@/features/estimateRequest/types/type';

type ProfileEditFormErrors = Partial<Record<string, string>>;

/**
 * 프로필 폼 로직을 관리하는 Hook
 * Edit과 Setup 모두에서 사용 가능
 */
export function useProfileForm(
  userType: UserType,
  initialProfile?: UserProfile | DriverProfile | null,
  options?: {
    /** 계정 정보만 수정하는 모드 (services/regions 불필요) */
    accountEditMode?: boolean;
  },
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
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  // 초기 프로필에서 사무실 주소 정보를 가져와서 AddressParams 형식으로 변환
  const getInitialOfficeAddress = (): AddressParams | undefined => {
    if (!isDriver || !initialProfile || !('officeAddress' in initialProfile)) {
      return undefined;
    }
    const profile = initialProfile as DriverProfile;
    if (!profile.officeAddress) {
      return undefined;
    }
    return {
      zoneCode: profile.officeZoneCode || '',
      address: profile.officeAddress,
      addressEnglish: '', // API 응답에 없으면 빈 문자열
      sido: profile.officeSido || '',
      sidoEnglish: '', // API 응답에 없으면 빈 문자열
      sigungu: profile.officeSigungu || '',
      sigunguEnglish: '', // API 응답에 없으면 빈 문자열
    };
  };
  const [officeAddress, setOfficeAddress] = useState<AddressParams | undefined>(
    getInitialOfficeAddress(),
  );
  const [errors, setErrors] = useState<ProfileEditFormErrors>({});

  const {
    imageUrl,
    uploadedImageKey,
    isUploading,
    error: imageUploadError,
    handleImageSelect,
  } = useImageUpload(initialProfile?.imageUrl || null, initialProfile?.imageKey || null);
  const updateMutation = useUpdateProfileMutation(userType);
  const { mutate: updateDriverOfficeAddress } = useUpdateDriverOfficeAddressMutation();
  const queryClient = useQueryClient();

  // initialProfile이 변경될 때 사무실 주소 초기값 업데이트
  useEffect(() => {
    const initialOfficeAddress = getInitialOfficeAddress();
    setOfficeAddress(initialOfficeAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialProfile, isDriver]);

  // Validation 함수들

  // 기본 계정 필드 검증
  const validateName = (value: string): string => {
    if (!value || value.trim().length < PROFILE_VALIDATION_RULES.NAME_MIN_LENGTH) {
      return PROFILE_ERROR_MESSAGES.NAME.MIN_LENGTH;
    }
    if (value.trim().length > PROFILE_VALIDATION_RULES.NAME_MAX_LENGTH) {
      return PROFILE_ERROR_MESSAGES.NAME.MAX_LENGTH;
    }
    return '';
  };

  const validateEmail = (value: string): string => {
    if (!value) return PROFILE_ERROR_MESSAGES.EMAIL.REQUIRED;
    if (!PROFILE_VALIDATION_PATTERNS_EXT.EMAIL.test(value))
      return PROFILE_ERROR_MESSAGES.EMAIL.INVALID_FORMAT;
    return '';
  };

  const validatePhone = (value: string): string => {
    if (!value) return PROFILE_ERROR_MESSAGES.PHONE.REQUIRED;
    if (!PROFILE_VALIDATION_PATTERNS_EXT.PHONE.test(value))
      return PROFILE_ERROR_MESSAGES.PHONE.INVALID_FORMAT;
    return '';
  };

  // 기사 필드 검증
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

  // 비밀번호 검증
  const validatePassword = (value: string): string => {
    if (!value) return '';
    if (value.length < 8) {
      return PROFILE_ERROR_MESSAGES.PASSWORD.MIN_LENGTH;
    }
    if (!PROFILE_VALIDATION_PATTERNS_EXT.PASSWORD.test(value)) {
      return PROFILE_ERROR_MESSAGES.PASSWORD.INVALID_FORMAT;
    }
    return '';
  };

  const validateConfirmPassword = (value: string, newPasswordValue: string): string => {
    if (!value) return '';
    if (value !== newPasswordValue) {
      return PROFILE_ERROR_MESSAGES.PASSWORD.MISMATCH;
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
    const v = e.target.value;
    setName(v);
    setErrors((prev) => ({ ...prev, name: validateName(v) }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setEmail(v);
    setErrors((prev) => ({ ...prev, email: validateEmail(v) }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setPhone(v);
    setErrors((prev) => ({ ...prev, phone: validatePhone(v) }));
  };

  // 비밀번호 핸들러
  const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setCurrentPassword(v);
    // 새 비밀번호가 있으면 현재 비밀번호도 필수
    if (newPassword && !v) {
      setErrors((prev) => ({
        ...prev,
        currentPassword: PROFILE_ERROR_MESSAGES.PASSWORD.CURRENT_REQUIRED,
      }));
    } else {
      setErrors((prev) => ({ ...prev, currentPassword: '' }));
    }
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setNewPassword(v);
    setErrors((prev) => ({
      ...prev,
      newPassword: validatePassword(v),
      confirmNewPassword: confirmNewPassword ? validateConfirmPassword(confirmNewPassword, v) : '',
    }));
  };

  const handleConfirmNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setConfirmNewPassword(v);
    setErrors((prev) => ({ ...prev, confirmNewPassword: validateConfirmPassword(v, newPassword) }));
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

    if (isDriver) {
      // 계정 정보 수정 모드와 프로필 수정 모드 구분
      if (options?.accountEditMode) {
        // 계정 정보 수정 모드: 기본 필드만 검증
        const nameError = validateName(name);
        const emailError = validateEmail(email);
        const phoneError = validatePhone(phone);

        // 비밀번호 검증 (비밀번호가 입력된 경우에만)
        const passwordErrors: Record<string, string> = {};
        if (newPassword || currentPassword || confirmNewPassword) {
          if (!currentPassword) {
            passwordErrors.currentPassword = PROFILE_ERROR_MESSAGES.PASSWORD.CURRENT_REQUIRED;
          }
          if (newPassword) {
            const newPasswordError = validatePassword(newPassword);
            if (newPasswordError) {
              passwordErrors.newPassword = newPasswordError;
            }
          }
          if (confirmNewPassword) {
            const confirmError = validateConfirmPassword(confirmNewPassword, newPassword);
            if (confirmError) {
              passwordErrors.confirmNewPassword = confirmError;
            }
          }
        }

        setErrors({
          name: nameError,
          email: emailError,
          phone: phoneError,
          ...passwordErrors,
        });

        if (nameError || emailError || phoneError || Object.keys(passwordErrors).length > 0) {
          return;
        }

        const driverData: UpdateDriverProfileRequest = {
          name: name || undefined,
          email: email || undefined,
          phone: phone || undefined,
          ...(newPassword && currentPassword ? { currentPassword, newPassword } : {}),
        };
        updateMutation.mutate(driverData, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: MY_PAGE_QUERY_KEY.MY_PAGE });
            queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY.MY_PROFILE });
            queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY.DRIVER_PROFILE });
            onSuccess?.();
          },
        });
        return;
      }

      // 프로필 수정 모드: 기사 필드 검증
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

      const driverData: UpdateDriverProfileRequest = {
        ...baseData,
        career: career ? Number(career) : undefined,
        shortIntro: shortIntro || undefined,
        description: description || undefined,
      };
      updateMutation.mutate(driverData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: MY_PAGE_QUERY_KEY.MY_PAGE });
          queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY.MY_PROFILE });
          queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY.DRIVER_PROFILE });

          // 프로필 수정 성공 후 사무실 주소가 있으면 등록/수정 API 호출
          if (isDriver && officeAddress) {
            updateDriverOfficeAddress({
              officeAddress: officeAddress.address,
              officeZoneCode: officeAddress.zoneCode || null,
              officeSido: officeAddress.sido || null,
              officeSigungu: officeAddress.sigungu || null,
            });
          }

          onSuccess?.();
        },
      });
    } else {
      // 사용자(계정) 필드 검증
      const nameError = validateName(name);
      const emailError = validateEmail(email);
      const phoneError = validatePhone(phone);

      // 비밀번호 검증 (비밀번호가 입력된 경우에만)
      const passwordErrors: Record<string, string> = {};
      if (newPassword || currentPassword || confirmNewPassword) {
        if (!currentPassword) {
          passwordErrors.currentPassword = PROFILE_ERROR_MESSAGES.PASSWORD.CURRENT_REQUIRED;
        }
        if (newPassword) {
          const newPasswordError = validatePassword(newPassword);
          if (newPasswordError) {
            passwordErrors.newPassword = newPasswordError;
          }
        }
        if (confirmNewPassword) {
          const confirmError = validateConfirmPassword(confirmNewPassword, newPassword);
          if (confirmError) {
            passwordErrors.confirmNewPassword = confirmError;
          }
        }
      }

      setErrors((prev) => ({
        ...prev,
        name: nameError,
        email: emailError,
        phone: phoneError,
        ...passwordErrors,
      }));

      if (nameError || emailError || phoneError || Object.keys(passwordErrors).length > 0) {
        return;
      }
      const userData: UpdateUserProfileRequest = {
        ...baseData,
        name: name || undefined,
        email: email || undefined,
        phone: phone || undefined,
        ...(newPassword && currentPassword ? { currentPassword, newPassword } : {}),
      };
      updateMutation.mutate(userData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: MY_PAGE_QUERY_KEY.MY_PAGE });
          queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY.MY_PROFILE });
          queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY.USER_PROFILE });
          onSuccess?.();
        },
      });
    }
  };

  const isValid = options?.accountEditMode
    ? true // 계정 정보 수정 모드에서는 항상 true (제출 시 개별 필드 검증)
    : selectedServices.length > 0 &&
      selectedRegions.length > 0 &&
      (isDriver ? !!officeAddress : true);

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
    officeAddress,
    currentPassword,
    newPassword,
    confirmNewPassword,
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
    handleCurrentPasswordChange,
    handleNewPasswordChange,
    handleConfirmNewPasswordChange,
    handleImageUpload,
    toggleService,
    toggleRegion,
    setOfficeAddress,
    handleSubmit,
  };
}
