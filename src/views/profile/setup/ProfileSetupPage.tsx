'use client';

import { useState } from 'react';
import Image from 'next/image';
import Input from '@/shared/ui/input/Input';
import { ActiveChip } from '@/shared/ui/chip';
import { Button } from '@/shared/ui/button';
import { useCreateProfile } from '@/features/profile/hooks/useCreateProfile';
import { useImageUpload } from '@/features/profile/hooks/useImageUpload';
import type { ServiceType, RegionType } from '@/features/profile/types/types';
import type { UserType } from '@/features/auth/types/types';
import {
  PROFILE_ERROR_MESSAGES,
  PROFILE_VALIDATION_PATTERNS,
} from '@/features/profile/constants/validation.constants';

const SERVICES: { key: ServiceType; label: string }[] = [
  { key: 'SMALL_MOVING', label: '소형이사' },
  { key: 'HOME_MOVING', label: '가정이사' },
  { key: 'OFFICE_MOVING', label: '사무실이사' },
];

const REGIONS: RegionType[] = [
  '서울',
  '경기',
  '인천',
  '강원',
  '충북',
  '충남',
  '대전',
  '세종',
  '전북',
  '전남',
  '광주',
  '경북',
  '경남',
  '대구',
  '부산',
  '울산',
  '제주',
];

interface ProfileSetupPageProps {
  userType: UserType;
}

export default function ProfileSetupPage({ userType }: ProfileSetupPageProps) {
  const { imageUrl, handleImageSelect } = useImageUpload();
  const { handleCreateProfile, isLoading, error } = useCreateProfile(userType);

  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<RegionType[]>([]);

  // 기사님 전용 필드
  const [career, setCareer] = useState('');
  const [shortIntro, setShortIntro] = useState('');
  const [description, setDescription] = useState('');

  // 에러 상태
  const [errors, setErrors] = useState({
    career: '',
    shortIntro: '',
    description: '',
  });

  const isDriver = userType === 'DRIVER';

  // Validation 함수
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

  // 입력 핸들러
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
  };

  const isValid = selectedServices.length > 0 && selectedRegions.length > 0;

  return (
    <div className="tab:px-4 mobile:px-4 mx-auto max-w-[1200px] px-6 py-10">
      <div className="mx-auto max-w-[744px]">
        <div className="mobile:mb-6 mb-10">
          <h1 className="mobile:text-2xl mb-2 text-4xl font-bold">프로필 등록</h1>
          <p className="mobile:text-md text-lg text-gray-500">
            추가 정보를 입력하여 회원가입을 완료해주세요.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="mobile:mb-8 mb-10">
          <h2 className="mobile:text-xl mb-4 text-2xl font-bold">프로필 이미지</h2>
          <div className="flex items-center justify-center">
            <label
              htmlFor="profile-image"
              className="hover:border-primary-orange-400 mobile:h-[120px] mobile:w-[120px] flex h-[160px] w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="프로필 이미지"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <svg
                    className="mobile:h-10 mobile:w-10 mb-2 h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="mobile:text-xs text-sm">이미지 추가</span>
                </div>
              )}
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        {isDriver && (
          <>
            <div className="mobile:mb-8 mb-10">
              <label className="mobile:text-xl mb-4 block text-2xl font-bold">경력</label>
              <Input
                name="career"
                type="text"
                value={career}
                onChange={handleCareerChange}
                placeholder="경력을 숫자로 입력해주세요 (예: 5)"
                errMsg={errors.career}
              />
              <p className="mt-2 text-right text-sm text-gray-400">숫자만 입력 가능</p>
            </div>

            <div className="mobile:mb-8 mb-10">
              <label className="mobile:text-xl mb-4 block text-2xl font-bold">한줄 소개</label>
              <Input
                name="shortIntro"
                type="text"
                value={shortIntro}
                onChange={handleShortIntroChange}
                placeholder="간단한 소개를 입력해주세요 (최소 8자)"
                errMsg={errors.shortIntro}
              />
              <p className="mt-2 text-right text-sm text-gray-400">{shortIntro.length}/100</p>
            </div>

            <div className="mobile:mb-8 mb-10">
              <h2 className="mobile:text-xl mb-4 text-2xl font-bold">상세 설명</h2>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="자세한 소개를 입력해주세요 (최소 10자, 최대 2000자)"
                maxLength={2000}
                className={`text-md focus:border-primary-orange-400 mobile:text-sm w-full rounded-lg border px-4 py-3 focus:outline-none ${
                  errors.description ? 'border-[var(--color-error)]' : 'border-gray-300'
                }`}
                rows={8}
              />
              {errors.description && (
                <div className="mt-1 px-2">
                  <span className="text-[13px] font-[500] text-[var(--color-error)]">
                    {errors.description}
                  </span>
                </div>
              )}
              <p className="mt-2 text-right text-sm text-gray-400">{description.length}/2000</p>
            </div>
          </>
        )}

        <div className="mobile:mb-8 mb-10">
          <h2 className="mobile:text-xl mb-2 text-2xl font-bold">이용 서비스</h2>
          <p className="text-md mobile:text-sm mb-4 text-gray-500">
            * 이용 서비스는 중복 선택 가능하며, 언제든 수정 가능해요!
          </p>
          <div className="mobile:gap-2 flex flex-wrap gap-3">
            {SERVICES.map((service) => (
              <ActiveChip
                key={service.key}
                text={service.label}
                isActive={selectedServices.includes(service.key)}
                setIsActive={() => toggleService(service.key)}
              />
            ))}
          </div>
        </div>

        <div className="mobile:mb-8 mb-10">
          <h2 className="mobile:text-xl mb-2 text-2xl font-bold">내가 사는 지역</h2>
          <p className="text-md mobile:text-sm mb-4 text-gray-500">
            **내가 사는 지역은 언제든 수정 가능해요!
          </p>
          <div className="mobile:gap-2 flex flex-wrap gap-3">
            {REGIONS.map((region) => (
              <ActiveChip
                key={region}
                text={region}
                isActive={selectedRegions.includes(region)}
                setIsActive={() => toggleRegion(region)}
              />
            ))}
          </div>
        </div>

        <div className="mobile:mt-8 mt-12">
          <Button onClick={handleSubmit} disabled={!isValid || isLoading}>
            {isLoading ? '처리 중...' : '시작하기'}
          </Button>
        </div>
      </div>
    </div>
  );
}
