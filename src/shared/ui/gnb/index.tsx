'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Menu from './Menu';
import DropdownProfile from '../dropdown/DropdownProfile';
import DropdownNotification from '../dropdown/DropdownNotification';
import { useAuthStore } from '@/shared/store/authStore';
import { useLogout } from '@/features/auth/hooks/useLogout';

const menuByRole = {
  guest: [{ id: 1, label: '기사님 찾기', href: '/' }],
  driver: [
    {
      id: 1,
      label: '받은 요청',
      href: '/',
    },
    {
      id: 2,
      label: '내 견적 관리',
      href: '/',
    },
  ],
  user: [
    {
      id: 1,
      label: '견적 요청',
      href: '/',
    },
    {
      id: 2,
      label: '기사님 찾기',
      href: '/',
    },
    {
      id: 3,
      label: '내 견적 관리',
      href: '/',
    },
  ],
};

interface Notification {
  message: [string, string, string];
  createdAt: Date;
}

const alarm: Notification[] = [
  {
    message: ['김코드 기사님의 ', '소형이사 견적', '이 도착했어요'],
    createdAt: new Date(),
  },
  {
    message: ['김코드 기사님의 견적이 ', '확정', '되었어요'],
    createdAt: new Date(),
  },
];

const GNB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();
  const { handleLogout } = useLogout();

  const userRole = user ? (user.type === 'USER' ? 'user' : 'driver') : 'guest';

  return (
    <div className="mobile:h-[54px] mobile:py-[10px] tab:py-[19px] tab:px-[72px] mobile:px-[24px] tab:h-[54px] relative z-20 flex h-[88px] w-full items-center justify-between bg-white px-[160px] py-[26px]">
      <div className="flex items-center gap-[82px]">
        <Link href="/">
          <Image
            src="/img/logo-text.svg"
            alt="logo"
            width={116}
            height={44}
            className="mobile:w-[88px] tab:w-[88px] mobile:h-[34px] tab:h-[34px]"
          />
        </Link>
        {user && (
          <div className="mobile:hidden tab:hidden flex items-center gap-10">
            {menuByRole[userRole].map((menu) => (
              <Link key={menu.id} href={menu.href} className="text-black-500 text-2lg font-bold">
                {menu.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="mobile:hidden tab:hidden">
        {!user && (
          <Link href="/login">
            <button type="button" className="text-black-500 text-lg font-medium">
              로그인
            </button>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-8">
            <DropdownNotification size="md" list={alarm} />
            <DropdownProfile
              size="md"
              userName={user.name}
              userType={userRole}
              logout={handleLogout}
            />
          </div>
        )}
      </div>
      <div className="mobile:flex tab:flex hidden items-center">
        {!user && (
          <button type="button" onClick={() => setIsOpen(true)}>
            <Image src="/icons/menu.svg" alt="menu" width={24} height={24} />
          </button>
        )}
        {user && (
          <div className="flex items-center gap-6">
            <DropdownNotification size="sm" list={alarm} />
            <DropdownProfile
              size="sm"
              userName={user.name}
              userType={userRole}
              logout={handleLogout}
            />
            <button type="button" onClick={() => setIsOpen(true)}>
              <Image src="/icons/menu.svg" alt="menu" width={24} height={24} />
            </button>
          </div>
        )}
      </div>
      <Menu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        menuItems={menuByRole[userRole]}
        role={userRole}
      />
    </div>
  );
};

export default GNB;
