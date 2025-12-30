'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Tab = () => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="mx-auto mb-[55px] w-full justify-center bg-white pt-4 sm:px-6 md:px-18 lg:px-90">
      <nav className="itmes-center flex gap-[32px] self-stretch text-xl font-semibold text-[var(--color-gray-400)]">
        <Link
          href="/driver/my/requests/confirmed"
          className={`border-b-2 pb-2 ${
            isActive('/driver/my/requests/confirmed')
              ? 'border-black text-black'
              : 'text-gray border-transparent'
          }`}
        >
          보낸 견적 조회
        </Link>

        <Link
          href="/driver/my/requests/rejected"
          className={`border-b-2 pb-2 ${
            isActive('/driver/my/requests/rejected')
              ? 'border-black text-black'
              : 'text-gray border-transparent'
          }`}
        >
          반려 요청
        </Link>
      </nav>
    </div>
  );
};

export default Tab;
