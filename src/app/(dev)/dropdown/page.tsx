'use client';

import DatePicker from '@/shared/ui/datepicker/DatePicker';
import DropdownDatePicker from '@/shared/ui/dropdown/DropdownDatePicker';
import DropdownFilter from '@/shared/ui/dropdown/DropdownFilter';
import DropdownProfile from '@/shared/ui/dropdown/DropdownProfile';
import DropdownSort from '@/shared/ui/dropdown/DropdownSort';
import GNB from '@/shared/ui/gnb';
import { useState } from 'react';

export default function Page() {
  const regionDict = {
    all: '전체',
    seoul: '서울',
    gyeonggi: '경기',
    incheon: '인천',
    gangwon: '강원',
    chungbuk: '충북',
    chungnam: '충남',
    daejeon: '대전',
    sejong: '세종',
    jeonbuk: '전북',
    jeonnam: '전남',
    gwangju: '광주',
    gyeongbuk: '경북',
    gyeongnam: '경남',
    daegu: '대구',
    busan: '부산',
    ulsan: '울산',
    jeju: '제주',
  };

  const serviceDict = {
    all: '전체',
    SMALL_MOVING: '소형이사',
    HOME_MOVING: '가정이사',
    OFFICE_MOVING: '사무실이사',
  };

  const sortDict = {
    review: '리뷰많은순',
    rating: '평점높은순',
    career: '경력많은순',
    'confirmed-estimate': '확정많은순',
  };

  type regionType = keyof typeof regionDict;
  type serviceType = keyof typeof serviceDict;
  type sortType = keyof typeof sortDict;

  const [region, setRegion] = useState<regionType>('all');
  const [service, setService] = useState<serviceType>('all');
  const [sort, setSort] = useState<sortType>('review');

  const [date, setDate] = useState<Date | null>(null);

  return (
    <div>
      <GNB />
      <div className="flex gap-[10px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex gap-[12px]">
            <div>
              <div className="flex gap-[12px]">
                <DropdownFilter
                  title="지역"
                  listObject={regionDict}
                  value={region}
                  setValue={(v) => setRegion(v as regionType)}
                />
                <DropdownFilter
                  title="서비스"
                  listObject={serviceDict}
                  value={service}
                  setValue={(v) => setService(v as serviceType)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-[8px]">
                <DropdownSort
                  listObject={sortDict}
                  value={sort}
                  setValue={(v) => setSort(v as sortType)}
                />
              </div>
            </div>
          </div>
          <span>날짜 선택됨: {date ? 'true' : 'false'}</span>
          <div className="flex gap-[12px]">
            <DatePicker size="sm" date={date || new Date()} setDate={setDate} />
            <DatePicker size="md" date={date || new Date()} setDate={setDate} />
          </div>
          <DropdownDatePicker date={date} setDate={setDate} />
        </div>
      </div>
    </div>
  );
}
