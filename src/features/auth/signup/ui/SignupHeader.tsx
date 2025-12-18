import Image from 'next/image';
import Link from 'next/link';
import { UserType } from '@/features/auth/signup/model/types';

interface SignupHeaderProps {
  usertype: UserType;
}

export default function SignupHeader({ usertype }: SignupHeaderProps) {
  return (
    <div className="mb-8 flex justify-center">
      <div className="text-center flex items-center flex-col gap-6">
        <Image
          src="/img/logo-text-only.svg"
          alt="Moving F5 Logo"
          width={105}
          height={55}
        />
        <div className="text-xl text-[var(--color-black-300)]">
          {usertype === 'DRIVER' ? (
            <>
              일반 유저라면?{' '}
              <Link 
                href="/signup/user" 
                className="font-semibold text-[var(--color-primary-orange-400)] underline hover:text-[var(--color-primary-orange-500)]"
              >
                일반 유저 전용 페이지
              </Link>
            </>
          ) : (
            <>
              기사님이신가요?{' '}
              <Link 
                href="/signup/driver" 
                className="font-semibold text-[var(--color-primary-orange-400)] underline hover:text-[var(--color-primary-orange-500)]"
              >
                기사님 전용 페이지
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
