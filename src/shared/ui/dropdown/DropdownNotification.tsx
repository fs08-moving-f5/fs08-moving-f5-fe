'use client';
import { convertDateType2 } from '@/shared/lib/convertDate';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useNotificationStore } from '@/shared/store/notificationStore';
const ic_x = '/icons/x.svg';
const ic_alarm = '/icons/alarm.svg';
const ic_alarm_unread = '/icons/alarm_unread.svg';

interface Notification {
  message: [string, string, string];
  createdAt: Date;
}

interface DropdownNotificationProps {
  size: 'sm' | 'md';
  list?: Notification[];
}

export default function DropdownNotification({ size, list }: DropdownNotificationProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // ref 영역 바깥 클릭 시 닫기
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  const hasUnread = useNotificationStore((state) => state.hasUnread);

  const listPosition = {
    sm: 'top-[52px] right-[263px] tab:right-[108px] mobile:right-[20px]',
    md: 'top-[80px] right-[263px] tab:right-[108px] mobile:right-[20px]',
  };
  const titleSize = {
    sm: 'w-[280px] h-fit flex justify-between gap-[2px] pr-[16px] pl-[12px] py-[14px] text-[16px] font-[700]',
    md: 'w-[327px] h-fit flex justify-between gap-[2px] pr-[24px] pl-[12px] py-[14px] text-[18px] font-[700]',
  };
  const elementsize = {
    sm: 'w-[280px] h-fit flex flex-col gap-[2px] px-[16px] py-[12px] text-[14px] font-[500]',
    md: 'w-[327px] h-fit flex flex-col gap-[2px] px-[24px] py-[16px] text-[16px] font-[500]',
  };
  const timeText = {
    sm: 'text-[13px] text-[#ABABAB]',
    md: 'text-[14px] text-[#ABABAB]',
  };

  return (
    <div ref={dropdownRef} className="flex h-full items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
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
          className={`absolute flex flex-col rounded-[16px] border border-[var(--color-grayScale-200)] bg-[var(--color-grayScale-50)] px-[16px] py-[10px] shadow-md ${listPosition[size]}`}
        >
          <ul>
            <li className={titleSize[size]}>
              <span>알림</span>
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer hover:brightness-80"
              >
                <Image src={ic_x} alt="ic_close" width={24} height={24} />
              </button>
            </li>
            {list &&
              list.map((e, idx) => (
                <li key={idx} className={elementsize[size]}>
                  <div className="flex">
                    <span>{e.message[0]}</span>
                    <span className="text-[var(--color-primary-orange-400)]">{e.message[1]}</span>
                    <span>{e.message[2]}</span>
                  </div>
                  <span className={timeText[size]}>{convertDateType2(e.createdAt)}</span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
