'use client';

import { useState } from 'react';
import { signup } from '../services/signup';

import type { SignupFormData, UserType } from '../types/types';

/**
 * 회원가입 처리 훅
 * - 회원가입 API 호출
 * - 토큰 및 유저 정보 저장
 * - 로딩 상태 관리
 * - 에러 처리
 */
export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (data: SignupFormData, userType: UserType) => {
    if (isLoading) return null;

    setIsLoading(true);
    setError(null);

    try {
      const signupData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        type: userType, // 백엔드는 'type' 필드를 받음
      };

      // 백엔드 응답: { user: UserResponse, accessToken: string }
      const result = await signup(signupData);

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '회원가입에 실패했습니다.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSignup,
    isLoading,
    error,
  };
};
