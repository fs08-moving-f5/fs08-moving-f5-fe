'use client';

import { useRouter } from 'next/navigation';
import {
  AuthLayout,
  SignupForm,
  SocialLoginButtons,
  SignupHeader,
  useSignup,
  useSocialLogin,
} from '@/features/auth';
import { showToast } from '@/shared/ui/sonner';
import { EMAIL_VERIFICATION } from '@/features/auth/constants/emailVerification.constants';

import type { SignupFormData, UserType } from '@/features/auth';

export default function SignupPage({ usertype }: { usertype: UserType }) {
  const router = useRouter();
  const { handleSignup } = useSignup();
  const { handleSocialLogin } = useSocialLogin();
  const filteredUsertype = usertype.toLowerCase();

  const handleSubmit = async (data: SignupFormData) => {
    try {
      const result = await handleSignup(data, usertype);

      if (result) {
        showToast({ kind: 'success', message: EMAIL_VERIFICATION.TOAST_MESSAGE_SENT });
        router.push(
          `/login/${filteredUsertype}?${EMAIL_VERIFICATION.REDIRECT_QUERY_KEY}=${EMAIL_VERIFICATION.REDIRECT_QUERY_VALUE_SENT}`,
        );
      }
    } catch (error) {
      showToast({
        kind: 'error',
        message: error instanceof Error ? error.message : '회원가입에 실패했습니다.',
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
      {/* 로고 - usertype에 따라 다른 로고 표시 */}
      <SignupHeader usertype={usertype} />

      {/* 회원가입 폼 */}
      <SignupForm onSubmit={handleSubmit} />

      {/* SNS 로그인 */}
      <SocialLoginButtons onSocialLogin={handleSocial} />
    </AuthLayout>
  );
}
