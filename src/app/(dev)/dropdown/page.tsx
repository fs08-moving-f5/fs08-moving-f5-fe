'use client';

import DatePicker from '@/shared/ui/datepicker/DatePicker';
import DropdownDatePicker from '@/shared/ui/dropdown/DropdownDatePicker';
import DropdownFilter from '@/shared/ui/dropdown/DropdownFilter';
import { useState } from 'react';

export default function Page() {
  const legion = ['전체', '소형이사', '가정이사', '사무실이사'];
  const legion2 = [
    '전체',
    '서울',
    '경기',
    '인천',
    '강원',
    '충북',
    '충남',
    '세종',
    '대전',
    '전북',
    '전남',
    '경북',
    '경남',
  ];

  const [value, setValue] = useState('');
  const handleCLick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setValue(e.currentTarget.value);
  };
  const [date, setDate] = useState(new Date());
  const [isDateSelected, setIsDateSelected] = useState(false);
  return (
    <div className="flex flex-col gap-[10px]">
      <span>선택된 필터 값: {value}</span>
      <div className="flex gap-[12px]">
        <DropdownFilter size="sm" title="지역" list={legion2} onClick={handleCLick} />
        <DropdownFilter size="sm" title="서비스" list={legion} onClick={handleCLick} />
        <DropdownFilter size="md" title="지역" list={legion2} onClick={handleCLick} />
        <DropdownFilter size="md" title="서비스" list={legion} onClick={handleCLick} />
      </div>
      <span>날짜 선택됨: {isDateSelected ? 'true' : 'false'}</span>
      <div className="flex gap-[12px]">
        <DatePicker size="sm" date={date} setDate={setDate} setIsSelected={setIsDateSelected} />
        <DatePicker size="md" date={date} setDate={setDate} setIsSelected={setIsDateSelected} />
      </div>
      <DropdownDatePicker date={date} setDate={setDate} setIsSelected={setIsDateSelected} />
    </div>
  );
}
