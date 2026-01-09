'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';

import type { UserType } from '../types/types';

interface AuthLayoutProps {
  children: ReactNode;
  usertype: UserType;
}

export default function AuthLayout({ children, usertype }: AuthLayoutProps) {
  return (
    <>
      <div className="mobile:bg-transparent relative min-h-screen w-full bg-[var(--color-primary-orange-400)] p-0 pt-[80px] pb-10">
        {/* 메인 컨테이너 */}
        <div className="tab:px-6 mobile:px-0 mx-auto flex w-full max-w-[1280px] items-start justify-center gap-8 px-4">
          {/* 회원가입 폼 */}
          <div className="tab:max-w-[560px] tab:px-6 mobile:max-w-[100%] mobile:px-5 mobile:py-8 w-full max-w-[640px] rounded-[32px] bg-white px-8 py-12 shadow-lg">
            {children}
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
      </div>
    </>
  );
}
