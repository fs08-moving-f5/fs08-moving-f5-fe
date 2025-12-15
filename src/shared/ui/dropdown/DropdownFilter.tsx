'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const up_icon_sm = '/icons/dropdown/ic_chevron_up_sm.svg';
const up_icon_md = '/icons/dropdown/ic_chevron_up_md.svg';
const down_icon_sm = '/icons/dropdown/ic_chevron_down_sm.svg';
const down_icon_md = '/icons/dropdown/ic_chevron_down_md.svg';

interface DropdownFilterProps {
  size: 'sm' | 'md';
  title: string;
  list: string[]; /* 선택지 리스트 */
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void; /* onClick을 통해 클릭한 선택지를 받아오고 외부 컴포넌트에서 상태 저장 해주세요 */
}

export default function DropdownFilter({
  size = 'md',
  title = '',
  list = [],
  onClick,
}: DropdownFilterProps) {
  if (list.length % 2 === 1) {
    list.push(''); //홀 수개면 짝수 맞춰주기.
  }
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // ref 영역 바깥 클릭 시 닫기
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const ToggleSize = {
    sm: 'h-[36px] min-w-[78px] w-fit pl-[14px] pr-[10px] py-[6px] rounded-[8px] text-[14px] font-[500]',
    md: 'h-[50px] min-w-[160px] w-fit pl-[20px] pr-[12px] py-[16px] rounded-[12px] text-[16px] font-[500]',
  };
  const ToggleColor = {
    on: 'text-[var(--color-primary-orange-400)] bg-[var(--color-primary-orange-100)] border border-[var(--color-primary-orange-400)]',
    off: 'text-[#262524] bg-[var(--color-grayScale-50)] border border-[var(--color-grayScale-200)]',
  };
  const ToggleIcon = {
    sm: {
      on: up_icon_sm,
      off: down_icon_sm,
    },
    md: {
      on: up_icon_md,
      off: down_icon_md,
    },
  };
  const ToggleIconSize = {
    sm: 'h-[20px] w-[20px]',
    md: 'h-[36px] w-[36px]',
  };
  const BoxShadow = 'shadow-md';
  // 'shadow-[4px_4px_10px_0_rgba(195,217,242,0.30),4px_4px_10px_0_rgba(195,217,242,0.10)]';
  const ToggleStyle = `flex items-center justify-center cursor-pointer hover:brightness-95 ${ToggleSize[size]} ${ToggleColor[open ? 'on' : 'off']} ${BoxShadow}`;
  const BoxPosition = {
    sm: 'top-[44px] rounded-[8px]',
    md: 'top-[58px] rounded-[12px]',
  };
  const BoxSize =
    list.length > 5
      ? {
          sm: 'h-[200px] w-[150px]',
          md: 'h-[300px] w-[328px]',
        }
      : {
          sm: 'h-fit w-[106px]',
          md: 'h-fit w-[160px]',
        };
  const BoxStyle = `absolute left-0 bg-[var(--color-grayScale-50)] border border-[var(--color-grayScale-200)] overflow-y-auto overflow-x-hidden scrollbar-thin ${BoxPosition[size]} ${BoxSize[size]}`;
  const listGrid =
    list.length > 5
      ? {
          sm: 'grid grid-cols-2 w-[150px] divide-x divide-[var(--color-grayScale-200)]',
          md: 'grid grid-cols-2 w-[328px] divide-x divide-[var(--color-grayScale-200)]',
        }
      : {
          sm: 'grid grid-cols-1 w-[106px]',
          md: 'grid grid-cols-1 w-[160px]',
        };
  const listElementSize = {
    sm: 'h-[40px] px-[14px] text-[14px] font-[500]',
    md: 'h-[60px] px-[20px] text-[16px] font-[500]',
  };
  const listStyle = `text-[#262524] ${listGrid[size]}`;
  //화면 확대 시 witdh 유동적이지 않음 (오류)
  return (
    <div ref={dropdownRef} className="z-10 h-fit w-fit shrink-0 select-none">
      <div className="relative flex h-fit w-fit">
        <button onClick={() => setOpen(!open)} className={ToggleStyle}>
          <div className="flex w-full items-center justify-between gap-[6px]">
            <span className="h-fit w-fit shrink-0">{title}</span>
            <Image
              src={ToggleIcon[size][open ? 'on' : 'off']}
              width={36}
              height={36}
              alt="toggleIcon"
              className={ToggleIconSize[size]}
            />
          </div>
        </button>
        {open && (
          <div className={`${BoxStyle} ${BoxShadow}`}>
            <ul className={listStyle}>
              {list.map((text, idx) => (
                <li key={idx} className={listElementSize[size]}>
                  <button
                    value={text}
                    onClick={onClick}
                    className="flex h-full w-fit cursor-pointer items-center justify-start hover:text-[var(--color-primary-orange-400)]"
                  >
                    {text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
