import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useNotificationStore } from '@/shared/store/notificationStore';
import { formatDateAgo } from '@/shared/lib/day';
import type { Notification } from '@/shared/ui/gnb/notification.service';
import NotificationDetail from './NotificationDetail';

const ic_x = '/icons/x.svg';
const ic_alarm_unread = '/icons/alarm_unread.svg';
const ic_alarm = '/icons/alarm.svg';

const dropdownPosition = {
  default:
    'absolute flex flex-col rounded-[16px] border border-[var(--color-grayScale-200)] bg-[var(--color-grayScale-50)] px-[16px] py-[10px] shadow-md',
  desktop:
    'top-[80px] right-[263px] tab:right-[108px] mobile:right-[20px] w-[359px] tab:w-[312px] mobile:w-[312px]',
  mobile: 'top-[52px] right-[20px]',
};

const NotificationDropdown = ({
  notifications,
  handleReadNotification,
}: {
  notifications?: Notification[];
  handleReadNotification: (id: string) => void;
}) => {
  const queryClient = useQueryClient();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  const hasUnread = useNotificationStore((state) => state.hasUnread);

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);

    if (hasUnread && !isOpen) {
      queryClient.invalidateQueries({ queryKey: ['notification'] });
    }
  };

  return (
    <div ref={dropdownRef} className="flex h-full items-center">
      <button
        onClick={handleOpenDropdown}
        className="mobile:h-6 mobile:w-6 tab:h-6 tab:w-6 flex h-9 w-9 cursor-pointer items-center justify-center hover:brightness-80"
      >
        <Image
          src={hasUnread ? ic_alarm_unread : ic_alarm}
          alt="ic_alarm"
          width={36}
          height={36}
          className="mobile:h-6 mobile:w-6 tab:h-6 tab:w-6 h-9 w-9"
        />
      </button>
      {isOpen && (
        <div
          className={clsx(
            dropdownPosition.default,
            dropdownPosition.desktop,
            'tab:top-[52px] mobile:top-[52px] tab:right-[20px] mobile:right-[20px] tab:min-h-[160px] mobile:min-h-[160px] min-h-[250px]',
          )}
        >
          <ul className="h-full w-full">
            <li className="flex justify-between px-6 py-[14px]">
              <span className="text-2lg tab:text-lg mobile:text-lg font-bold">알림</span>
              <button
                onClick={() => setIsOpen(false)}
                className="flex cursor-pointer items-center justify-center hover:brightness-80"
              >
                <Image src={ic_x} alt="ic_close" width={24} height={24} />
              </button>
            </li>
            {notifications?.length === 0 && (
              <li className="flex h-full items-center justify-center text-center">
                <span className="text-2lg tab:text-lg mobile:text-lg font-normal">
                  알림이 없습니다.
                </span>
              </li>
            )}
            {notifications &&
              notifications.length > 0 &&
              notifications
                ?.filter((notification) => !notification.isRead)
                .map((notification) => (
                  <NotificationDetail
                    key={notification.id}
                    title={notification.message ?? ''}
                    time={formatDateAgo(notification.createdAt ?? '')}
                    onClick={() => handleReadNotification(notification.id ?? '')}
                  />
                ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
