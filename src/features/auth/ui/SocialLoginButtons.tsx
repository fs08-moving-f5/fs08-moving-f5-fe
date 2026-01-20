'use client';

import React from 'react';
import Image from 'next/image';

interface SocialLoginButtonsProps {
  onSocialLogin: (provider: 'google' | 'kakao' | 'naver') => void;
}

export default function SocialLoginButtons({ onSocialLogin }: SocialLoginButtonsProps) {
  return (
    <div className="mobile:mt-6 mt-8">
      <div className="text-md mobile:text-sm mb-4 text-center font-medium text-[var(--color-black-300)]">
        SNS 계정으로 간편 가입하기
      </div>
      <div className="flex items-center justify-center gap-4">
        {/* Google */}
        <button
          type="button"
          onClick={() => onSocialLogin('google')}
          className="cursor-pointer flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white shadow-md transition hover:shadow-lg"
        >
          <Image src="/icons/social/ic-google.svg" alt="Google" width={56} height={56} />
        </button>

        {/* Kakao */}
        <button
          type="button"
          onClick={() => onSocialLogin('kakao')}
          className="cursor-pointer flex h-[56px] w-[56px] items-center justify-center rounded-full shadow-md transition hover:shadow-lg"
        >
          <Image src="/icons/social/ic-kakao.svg" alt="Kakao" width={56} height={56} />
        </button>

        {/* Naver */}
        <button
          type="button"
          onClick={() => onSocialLogin('naver')}
          className="cursor-pointer flex h-[56px] w-[56px] items-center justify-center rounded-full shadow-md transition hover:shadow-lg"
        >
          <Image src="/icons/social/ic-naver.svg" alt="Naver" width={56} height={56} />
        </button>
      </div>
    </div>
  );
}
