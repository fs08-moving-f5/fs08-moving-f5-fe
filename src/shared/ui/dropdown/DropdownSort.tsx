'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
const ic_up = '/icons/dropdown/ic_chevon_up.svg';
const ic_down = '/icons/dropdown/ic_chevon_down.svg';

interface DropdoownSortProps {
  size: 'sm' | 'md';
  listObject: Record<string, string>;
  value: string;
  setValue: (value: string) => void;
}

export default function DropdownSort({
  size = 'md',
  listObject,
  value,
  setValue,
}: DropdoownSortProps) {
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

  const buttonSize = {
    sm: 'h-[32px] pl-[8px] pr-[6px] py-[6px] text-[12px] font-[500] ',
    md: 'h-[40px] px-[10px] py-[8px] text-[14px] font-[500] ',
  };
  const butttonStyle = {
    sm: 'flex gap-[2px] items-center justify-center hover:brightness-95',
    md: 'flex gap-[10px] items-center justify-center hover:brightness-95',
  };

  const listPosition = {
    sm: 'absolute top-[40px] left-0 w-full',
    md: 'absolute top-[48px] left-0 w-full',
  };

  const handleDropdownClick = () => {
    setOpen(!open);
  };
  const handleSelectClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <div ref={dropdownRef} className="relative z-10 text-[#262524]">
      <button
        onClick={handleDropdownClick}
        className={`cursor-pointer rounded-[8px] border border-[var(--color-grayScale-200)] bg-[var(--color-grayScale-50)] shadow-md ${buttonSize[size]} ${butttonStyle[size]}`}
      >
        <span className={open ? 'font-[500] text-[#999]' : 'font-[600]'}>{listObject[value]}</span>
        <Image src={open ? ic_up : ic_down} alt="ic_arrow" width={20} height={20} />
      </button>
      {open && (
        <div className={listPosition[size]}>
          <ul className="flex h-fit w-full flex-col rounded-[8px] border border-[var(--color-grayScale-200)] bg-[var(--color-grayScale-50)] shadow-md">
            {listObject &&
              Object.keys(listObject).map((key) => (
                <li className={buttonSize[size]}>
                  <button
                    value={key}
                    onClick={handleSelectClick}
                    className="flex h-full w-full cursor-pointer items-center justify-start hover:brightness-200"
                  >
                    {listObject[key]}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
