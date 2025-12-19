import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import DatePicker from '../datepicker/DatePicker';
import { Button } from '../button';
const ic_canlendar = 'icons/dropdown/ic_calendar.svg';
const ic_down = '/icons/dropdown/ic_chevron_down_md.svg';
const ic_up = '/icons/dropdown/ic_chevron_up_md.svg';

interface DropdownDatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
  setIsSelected: (isSelected: boolean) => void;
}

export default function DropdownDatePicker({
  date,
  setDate,
  setIsSelected,
}: DropdownDatePickerProps) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const [open, setOpen] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);

  const ButtonColor = {
    on: 'bg-[var(--color-primary-orange-100)] border border-[var(--color-primary-orange-400)]',
    off: 'bg-[var(--color-grayScale-50)] border border-[var(--color-grayScale-200)]',
  };

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
  const handleOpen = () => {
    if (!open) {
      setIsDateSelected(false);
      setIsSelected(false);
    }
    setOpen(!open);
  };
  const handleConfirm = () => {
    setIsSelected(true);
    setOpen(false);
  };
  return (
    <div
      ref={dropdownRef}
      className="relative z-10 flex h-fit w-fit flex-col items-center gap-[8px] select-none"
    >
      <button
        onClick={handleOpen}
        className={`flex h-[50px] w-[350px] items-center justify-between rounded-[12px] p-[0_12px_0_20px] shadow-md outline-none ${ButtonColor[open ? 'on' : 'off']}`}
      >
        <div className="flex gap-[8px]">
          <Image
            src={ic_canlendar}
            alt="ic_calendar"
            width={24}
            height={24}
            className="h-[24px] w-[24px]"
          />
          <span className="text-[16px] font-[500] text-[#262524]">{`${year}년 ${month}월 ${day}일`}</span>
        </div>
        <Image
          src={open ? ic_up : ic_down}
          alt="ic_arrow"
          width={36}
          height={36}
          className="w-[36 px] h-[36px]"
        />
      </button>
      {open && (
        <div className="absolute top-[58px] flex h-fit w-[350px] flex-col items-center gap-[12px] rounded-[12px] border border-[var(--color-grayScale-200)] bg-[var(--color-grayScale-50)] p-[20px_16px_28px_16px] shadow-md">
          <DatePicker size="sm" date={date} setDate={setDate} setIsSelected={setIsDateSelected} />
          <Button size="sm" disabled={!isDateSelected} onClick={handleConfirm}>
            선택완료
          </Button>
        </div>
      )}
    </div>
  );
}
