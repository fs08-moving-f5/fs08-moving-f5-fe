import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
const ic_profile = '/icons/profile.svg';

interface DropdownProfileProps {
  size: 'sm' | 'md';
  userName: string;
  userType: 'guest' | 'user' | 'driver';
  logout?: () => void;
}

export default function DropdownProfile({
  size = 'md',
  userName,
  userType,
  logout,
}: DropdownProfileProps) {
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

  const listObject = {
    guest: [],
    user: [
      ['프로필 수정', '/user/profile/edit'],
      ['찜한 기사님', '/'],
      ['이사 리뷰', '/'],
    ],
    driver: [['마이페이지', '/']],
  };

  const listPosition = {
    sm: 'top-[52px] right-[14px]',
    md: 'top-[80px] right-[36px]',
  };

  const listSize = {
    sm: 'w-[152px] px-[4px] pt-[16px] pb-[6px]',
    md: 'w-[248px] px-[6px] pt-[10px] pb-[6px]',
  };

  const elementSize = {
    sm: 'px-[12px] py-[8px]',
    md: 'px-[24px] py-[14px]',
  };

  const nameText = {
    sm: 'text-[16px] leading-[26px]',
    md: 'text-[18px] leading-[26px]',
  };

  const elementText = {
    sm: 'text-[14px] leading-[24px]',
    md: 'text-[16px] leading-[24px]',
  };

  const logoutText = {
    sm: 'text-[12px] font-[400] leading-[18px] pt-[12px] pb-[8px]',
    md: 'text-[14px] font-[500] leading-[24px] pt-[14px] pb-[8px]',
  };

  const typeName = {
    guest: '',
    user: '고객님',
    driver: '기사님',
  };

  return (
    <div ref={dropdownRef} className="h-fit w-fit">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-fit w-fit cursor-pointer items-center gap-[16px] hover:brightness-95"
      >
        <Image
          src={ic_profile}
          alt="ic_profile"
          width={36}
          height={36}
          className="tab:h-[24px] tab:w-[24px] h-[36px] w-[36px]"
        />
        <span className="tab:hidden block text-[18px] font-[500]">{userName}</span>
      </button>
      {isOpen && (
        <div
          className={`absolute flex flex-col rounded-[16px] border border-[var(--color-grayScale-200)] bg-[var(--color-grayScale-50)] shadow-md ${listSize[size]} ${listPosition[size]}`}
        >
          <div className={userType === 'user' ? (size === 'sm' ? 'mb-[8px]' : 'mb-[10px]') : ''}>
            <div
              className={`flex items-center justify-start font-[700] ${nameText[size]} ${elementSize[size]}`}
            >
              {userName} {typeName[userType]}
            </div>
            <ul className="flex h-fit w-fit flex-col">
              {listObject &&
                listObject[userType].map((e, idx) => (
                  <li
                    key={idx}
                    className={`flex items-center justify-start font-[500] hover:text-[var(--color-primary-orange-400)] ${elementText[size]} ${elementSize[size]}`}
                  >
                    <Link href={e[1]}>{e[0]}</Link>
                  </li>
                ))}
            </ul>
          </div>
          <button
            onClick={logout}
            className={`flex cursor-pointer items-center justify-center border-t border-[var(--color-line-100)] ${logoutText[size]}`}
          >
            <span className="text-[#808080] hover:brightness-50">로그아웃</span>
          </button>
        </div>
      )}
    </div>
  );
}
