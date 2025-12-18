'use client';

import React from 'react';
import Image from 'next/image';
// import { useRouter } from 'next/navigation';
import {
  SignupForm,
  SocialLoginButtons,
  SignupHeader,
  useSignup,
  useSocialLogin,
  type SignupFormData,
  type UserType,
} from '@/features/auth/signup';

export default function SignupPage({ usertype }: { usertype: UserType }) {
  // const router = useRouter(); // TODO: 로그인 페이지 이동 시 활성화
  const { handleSignup } = useSignup();
  const { handleSocialLogin } = useSocialLogin();

  const handleSubmit = async (data: SignupFormData) => {
    try {
      const result = await handleSignup(data, usertype);

      if (result) {
        console.log('회원가입 성공:', result);
        // TODO: 성공 메시지 표시 (토스트)
        // TODO: 로그인 페이지로 이동
        // router.push('/login');
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      // TODO: 에러 메시지 표시 (토스트)
      alert(error instanceof Error ? error.message : '회원가입에 실패했습니다.');
    }
  };

  const handleSocial = async (provider: 'google' | 'kakao' | 'naver') => {
    try {
      await handleSocialLogin(provider);
    } catch (error) {
      console.error('SNS 로그인 실패:', error);
      // TODO: 에러 메시지 표시 (토스트)
      alert('SNS 로그인에 실패했습니다.');
    }
  };

  return (
    <div className="mobile:bg-transparent relative min-h-screen w-full bg-[var(--color-primary-orange-400)] p-0 pt-[80px] pb-10">
      {/* 메인 컨테이너 */}
      <div className="tab:px-6 mobile:px-0 mx-auto flex w-full max-w-[1280px] items-start justify-center gap-8 px-4">
        {/* 회원가입 폼 */}
        <div className="tab:max-w-[560px] tab:px-6 mobile:max-w-[100%] mobile:px-5 mobile:py-8 w-full max-w-[640px] rounded-[32px] bg-white px-8 py-12 shadow-lg">
          {/* 로고 - usertype에 따라 다른 로고 표시 */}
          <SignupHeader usertype={usertype} />

          {/* 회원가입 폼 */}
          <SignupForm onSubmit={handleSubmit} />

          {/* SNS 로그인 */}
          <SocialLoginButtons onSocialLogin={handleSocial} />
        </div>

        {/* 이미지 (데스크톱만) */}
        <div className="mobile:hidden tab:w-[240px] tab:translate-x-[145px] absolute bottom-0 left-1/2 translate-x-[245px]">
          <Image
            src={usertype === 'DRIVER' ? '/img/img-truck.png' : '/img/img-character.png'}
            alt="타입별 이미지"
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
