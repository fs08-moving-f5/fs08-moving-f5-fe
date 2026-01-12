'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserProfile, createDriverProfile } from '../services/profileService';

import type {
  CreateUserProfileRequest,
  CreateDriverProfileRequest,
  UserProfile,
  DriverProfile,
} from '../types/types';

/**
 * 프로필 생성 훅
 * - 유저/기사 프로필 생성 API 호출
 * - 로딩 상태 관리
 * - 에러 처리
 * - 성공 시 리다이렉트
 */
export const useCreateProfile = (userType: 'USER' | 'DRIVER') => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateProfile = async (
    data: CreateUserProfileRequest | CreateDriverProfileRequest,
  ): Promise<UserProfile | DriverProfile | null> => {
    if (isLoading) return null;

    setIsLoading(true);
    setError(null);

    try {
      let result;

      if (userType === 'USER') {
        result = await createUserProfile(data as CreateUserProfileRequest);
      } else {
        result = await createDriverProfile(data as CreateDriverProfileRequest);
      }

      // 성공 시 메인 페이지로 리다이렉트
      router.push('/');

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '프로필 생성에 실패했습니다.';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCreateProfile,
    isLoading,
    error,
  };
};
