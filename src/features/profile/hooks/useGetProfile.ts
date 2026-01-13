import { useState, useEffect } from 'react';
import { getUserProfile, getDriverProfile } from '../services/profileService';

import type { UserProfile, DriverProfile } from '../types/types';

/**
 * 프로필 조회 훅
 * - 유저/기사 프로필 조회 API 호출
 * - 로딩 상태 관리
 * - 에러 처리
 */
export const useGetProfile = (userType: 'USER' | 'DRIVER') => {
  const [profile, setProfile] = useState<UserProfile | DriverProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let result;

        if (userType === 'USER') {
          result = await getUserProfile();
        } else {
          result = await getDriverProfile();
        }

        setProfile(result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '프로필 조회에 실패했습니다.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userType]);

  return {
    profile,
    isLoading,
    error,
    refetch: async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = userType === 'USER' ? await getUserProfile() : await getDriverProfile();
        setProfile(result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '프로필 조회에 실패했습니다.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
  };
};
