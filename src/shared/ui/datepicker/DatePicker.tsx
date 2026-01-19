import { useState } from 'react';
import DatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

import styles_1 from './DatePickerCustom1.module.css';
import styles_2 from './DatePickerCustom2.module.css';

import Image from 'next/image';
const ic_left = '/icons/datepicker/ic_left.svg';
const ic_right = '/icons/datepicker/ic_right.svg';

interface DatePickerProps {
  size: 'sm' | 'md';
  date: Date;
  setDate: (date: Date) => void;
}

export default function DatePickerCalendar({ size = 'md', date, setDate }: DatePickerProps) {
  const buttonIconSize = 24;
  const [month, setMonth] = useState(date.getMonth());
  const [monthMode, setMonthMode] = useState(false);

  const handleChange = (date: Date) => {
    setDate(date);
  };

  const handleMonthChange = (date: Date) => {
    setMonth(date.getMonth());
  };

  const style = {
    sm: styles_1,
    md: styles_2,
  };

  const headerStyle = {
    sm: 'flex w-full items-center justify-between gap-[12px] px-[14px] py-[10px]',
    md: 'flex w-full items-center justify-center gap-[12px] mb-[32px]',
  };

  const CustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    decreaseYear,
    increaseYear,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: ReactDatePickerCustomHeaderProps) => {
    return (
      <div className={headerStyle[size]}>
        <button
          onClick={monthMode ? decreaseYear : decreaseMonth}
          disabled={prevMonthButtonDisabled}
          className="h-[24px] w-[24px] cursor-pointer hover:brightness-50"
        >
          <Image src={ic_left} alt="ic_left" width={buttonIconSize} height={buttonIconSize} />
        </button>
        <button
          onClick={() => setMonthMode(!monthMode)}
          className="cursor-pointer text-[18px] font-[600] text-[var(--color-black-500)] hover:text-[var(--color-primary-orange-400)]"
        >
          {monthMode
            ? `${date.getFullYear()}`
            : `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}`}
        </button>
        <button
          onClick={monthMode ? increaseYear : increaseMonth}
          disabled={nextMonthButtonDisabled}
          className="h-[24px] w-[24px] cursor-pointer hover:brightness-50"
        >
          <Image src={ic_right} alt="ic_right" width={buttonIconSize} height={buttonIconSize} />
        </button>
      </div>
    );
  };

  return (
    <div className={`select-none ${style[size].wrapper}`}>
      <DatePicker
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected={date}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(selectDate: any) => selectDate && handleChange(selectDate)}
        onMonthChange={handleMonthChange}
        showMonthYearPicker={monthMode}
        inline
        customInput={<div />}
        renderCustomHeader={CustomHeader}
        minDate={new Date()}
      />
    </div>
  );
}
