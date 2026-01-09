import { useState } from 'react';
import { updateUserProfile, updateDriverProfile } from '../services/profileService';

import type {
  UpdateUserProfileRequest,
  UpdateDriverProfileRequest,
  UserProfile,
  DriverProfile,
} from '../types/types';

/**
 * 프로필 수정 훅
 * - 유저/기사 프로필 수정 API 호출
 * - 로딩 상태 관리
 * - 에러 처리
 */
export const useUpdateProfile = (userType: 'USER' | 'DRIVER') => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateProfile = async (
    data: UpdateUserProfileRequest | UpdateDriverProfileRequest,
  ): Promise<UserProfile | DriverProfile | null> => {
    if (isLoading) return null;

    setIsLoading(true);
    setError(null);

    try {
      let result;

      if (userType === 'USER') {
        result = await updateUserProfile(data as UpdateUserProfileRequest);
      } else {
        result = await updateDriverProfile(data as UpdateDriverProfileRequest);
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '프로필 수정에 실패했습니다.';
      setError(errorMessage);
      console.error('Profile update error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleUpdateProfile,
    isLoading,
    error,
  };
};
