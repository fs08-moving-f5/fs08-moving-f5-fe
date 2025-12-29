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
          href="/user/my/reviews/pending"
          className={`border-b-2 pb-2 ${
            isActive('/user/my/reviews/pending')
              ? 'border-black text-black'
              : 'text-gray border-transparent'
          }`}
        >
          작성 가능한 리뷰
        </Link>

        <Link
          href="/user/my/reviews"
          className={`border-b-2 pb-2 ${
            isActive('/user/my/reviews')
              ? 'border-black text-black'
              : 'text-gray border-transparent'
          }`}
        >
          내가 작성한 리뷰
        </Link>
      </nav>
    </div>
  );
};

export default Tab;
