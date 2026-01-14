'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/store/authStore';
import { useNotificationStore } from '@/shared/store/notificationStore';

import Menu from './Menu';
import DropdownProfile from '../dropdown/DropdownProfile';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useGetNotificationListQuery } from './notificationQuery';
import { NotificationDropdown } from '../dropdown';
import { useReadNotificationMutation } from './notificationMutation';
import {
  useGetDriverProfileQuery,
  useGetUserProfileQuery,
} from '@/features/profile/hooks/queries/useProfileQueries';

const menuByRole = {
  guest: [{ id: 1, label: '기사님 찾기', href: '/' }],
  driver: [
    {
      id: 1,
      label: '받은 요청',
      href: '/driver/my/requests',
    },
    {
      id: 2,
      label: '내 근처 요청',
      href: '/driver/my/requests/nearby',
    },
    {
      id: 3,
      label: '내 견적 관리',
      href: '/driver/my/requests/confirmed',
    },
  ],
  user: [
    {
      id: 1,
      label: '견적 요청',
      href: '/user/estimates/request',
    },
    {
      id: 2,
      label: '기사님 찾기',
      href: '/user/drivers',
    },
    {
      id: 3,
      label: '내 견적 관리',
      href: '/user/my/estimates/pending',
    },
  ],
};

const GNB = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();
  const { handleLogout } = useLogout();
  const setHasUnread = useNotificationStore((state) => state.setHasUnread);
  const hasUnread = useNotificationStore((state) => state.hasUnread);

  const userRole = user ? (user.type === 'USER' ? 'user' : 'driver') : 'guest';

  const userProfileQuery = useGetUserProfileQuery(Boolean(user) && user?.type === 'USER');
  const driverProfileQuery = useGetDriverProfileQuery(Boolean(user) && user?.type === 'DRIVER');

  const profileImageUrl =
    user?.type === 'USER'
      ? userProfileQuery.data?.imageUrl
      : user?.type === 'DRIVER'
        ? driverProfileQuery.data?.imageUrl
        : null;

  const { data: notifications } = useGetNotificationListQuery();

  const { mutate: readNotification } = useReadNotificationMutation();

  // notifications 목록이 업데이트될 때 hasUnread 상태 동기화
  useEffect(() => {
    if (notifications) {
      const hasUnreadNotifications = notifications.some((notification) => !notification.isRead);
      // SSE로 받은 값과 다를 수 있으므로 notifications 기반으로도 확인
      if (hasUnreadNotifications !== hasUnread) {
        setHasUnread(hasUnreadNotifications);
      }
    }
  }, [notifications, setHasUnread, hasUnread]);

  const handleReadNotification = (id: string) => {
    readNotification(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notification'] });
      },
    });
  };

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
          <Link href="/login/user">
            <button
              type="button"
              className="text-2lg bg-primary-orange-400 w-[116px] cursor-pointer items-center justify-center rounded-[12px] px-4 py-3 font-semibold text-gray-50 hover:brightness-90"
            >
              로그인
            </button>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-8">
            <NotificationDropdown
              notifications={notifications}
              handleReadNotification={handleReadNotification}
            />
            <DropdownProfile
              size="md"
              userName={user.name}
              userType={userRole}
              profileImageUrl={profileImageUrl}
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
            <NotificationDropdown
              notifications={notifications}
              handleReadNotification={handleReadNotification}
            />
            <DropdownProfile
              size="sm"
              userName={user.name}
              userType={userRole}
              profileImageUrl={profileImageUrl}
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
