'use client';

import DatePicker from '@/shared/ui/datepicker/DatePicker';
import DropdownDatePicker from '@/shared/ui/dropdown/DropdownDatePicker';
import DropdownFilter from '@/shared/ui/dropdown/DropdownFilter';
import DropdownSort from '@/shared/ui/dropdown/DropdownSort';
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

  type sortList = 'MostReviews' | 'HighestRating' | 'MostExperience' | 'MostConfirmations';
  const [sortValue, setSortValue] = useState('HighestRating');
  const sortListObj = {
    MostReviews: '리뷰 많은순',
    HighestRating: '평점 높은순',
    MostExperience: '경력 많은순',
    MostConfirmations: '확정 많은순',
  };

  return (
    <div className="flex gap-[10px]">
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
      <div className="flex flex-col">
        <span>value: {sortValue}</span>
        <div className="flex gap-[8px]">
          <DropdownSort
            size="sm"
            listObject={sortListObj}
            value={sortValue}
            setValue={setSortValue}
          />
          <DropdownSort
            size="md"
            listObject={sortListObj}
            value={sortValue}
            setValue={setSortValue}
          />
        </div>
      </div>
    </div>
  );
}
