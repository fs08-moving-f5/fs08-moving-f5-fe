'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
const ic_up = '/icons/dropdown/ic_chevon_up.svg';
const ic_down = '/icons/dropdown/ic_chevon_down.svg';

interface DropdoownSortProps {
  listObject: Record<string, string>;
  value: string;
  setValue: (value: string) => void;
}

export default function DropdownSort({ listObject, value, setValue }: DropdoownSortProps) {
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

  const buttonSize =
    'mobile:h-[32px] mobile:pl-[8px] mobile:pr-[6px] mobile:py-[6px] mobile:text-[12px] font-[500] h-[40px] px-[10px] py-[8px] text-[14px]';
  const butttonStyle =
    'flex mobilegap-[2px] gap-[10px] items-center justify-center hover:brightness-95';
  const listPosition = 'absolute movile:top-[40px] top-[48px] left-0 w-full';

  const handleDropdownClick = () => {
    setOpen(!open);
  };
  const handleSelectClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setValue(e.currentTarget.value);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative z-10 shrink-0 text-[#262524]">
      <button
        onClick={handleDropdownClick}
        className={`cursor-pointer rounded-[8px] border border-[var(--color-grayScale-200)] bg-[var(--color-grayScale-50)] shadow-md ${buttonSize} ${butttonStyle}`}
      >
        <span className={open ? 'font-[500] text-[#999]' : 'font-[600]'}>{listObject[value]}</span>
        <Image src={open ? ic_up : ic_down} alt="ic_arrow" width={20} height={20} />
      </button>
      {open && (
        <div className={listPosition}>
          <ul className="flex h-fit w-full flex-col rounded-[8px] border border-[var(--color-grayScale-200)] bg-[var(--color-grayScale-50)] shadow-md">
            {listObject &&
              Object.keys(listObject).map((key, idx) => (
                <li
                  key={idx}
                  className={`${buttonSize} translation-all duration-100 hover:bg-[var(--color-grayScale-200)]`}
                >
                  <button
                    value={key}
                    onClick={handleSelectClick}
                    className="flex h-full w-full cursor-pointer items-center justify-start hover:brightness-20"
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
