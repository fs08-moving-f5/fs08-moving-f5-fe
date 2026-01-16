'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout, LoginForm, LoginHeader, SocialLoginButtons } from '@/features/auth/ui';
import { useLogin, useSocialLogin } from '@/features/auth/hooks';
import { showToast } from '@/shared/ui/sonner';

import type { LoginFormData, UserType } from '@/features/auth/types/types';

export default function LoginPage({ usertype }: { usertype: UserType }) {
  const router = useRouter();
  const { handleLogin, isLoading } = useLogin();
  const { handleSocialLogin } = useSocialLogin();
  const filteredUsertype = usertype.toLowerCase();

  const handleSubmit = async (data: LoginFormData) => {
    try {
      const result = await handleLogin(data, usertype);

      if (result) {
        console.log('로그인 성공:', result);
        showToast({ kind: 'success', message: '로그인에 성공했습니다.' });
        // 로그인 성공 후 프로필이 없으면 프로필 설정 페이지로 이동
        if (!result.user.hasProfile) {
          router.push(`/${filteredUsertype}/profile/setup`);
        } else {
          router.push('/');
        }
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      showToast({
        kind: 'error',
        message: error instanceof Error ? error.message : '로그인에 실패했습니다.',
      });
    }
  };

  const handleSocial = async (provider: 'google' | 'kakao' | 'naver') => {
    try {
      await handleSocialLogin(provider, usertype);
    } catch (error) {
      console.error('SNS 로그인 실패:', error);
      showToast({ kind: 'error', message: 'SNS 로그인에 실패했습니다.' });
    }
  };

  return (
    <AuthLayout usertype={usertype}>
      {/* 로고 및 헤더 - usertype에 따라 다른 로고 표시 */}
      <LoginHeader usertype={usertype} />

      {/* 로그인 폼 */}
      <LoginForm onSubmit={handleSubmit} usertype={usertype} isLoading={isLoading} />

      {/* SNS 로그인 */}
      <SocialLoginButtons onSocialLogin={handleSocial} />
    </AuthLayout>
  );
}
