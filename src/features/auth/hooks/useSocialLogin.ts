'use client';

import { useState } from 'react';
import { socialLogin } from '../services/signup';

/**
 * 소셜 로그인 처리 로직을 관리하는 커스텀 훅
 * - 로딩 상태 관리
 * - 에러 처리
 */
export const useSocialLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSocialLogin = async (
    provider: 'google' | 'kakao' | 'naver',
    usertype: 'USER' | 'DRIVER',
  ) => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      await socialLogin(provider, usertype);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'SNS 로그인에 실패했습니다.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSocialLogin,
    isLoading,
    error,
  };
};
