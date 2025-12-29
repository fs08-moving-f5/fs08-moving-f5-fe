'use client';

import { useRouter } from 'next/navigation';
import {
  AuthLayout,
  SignupForm,
  SocialLoginButtons,
  SignupHeader,
  useSignup,
  useSocialLogin,
  type SignupFormData,
  type UserType,
} from '@/features/auth';
import { showToast } from '@/shared/ui/sonner';

export default function SignupPage({ usertype }: { usertype: UserType }) {
  const router = useRouter();
  const { handleSignup } = useSignup();
  const { handleSocialLogin } = useSocialLogin();

  const handleSubmit = async (data: SignupFormData) => {
    try {
      const result = await handleSignup(data, usertype);

      if (result) {
        showToast({ kind: 'success', message: '회원가입에 성공했습니다!' });
        // 회원가입 성공 후 프로필 등록 페이지로 이동
        router.push('/profile/setup');
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
      await handleSocialLogin(provider);
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
