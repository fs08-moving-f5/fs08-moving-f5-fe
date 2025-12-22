'use client';

import { AddressParams, MovingType } from '@/features/estimateRequest/types/type';
import AddressButton from '@/features/estimateRequest/ui/AddressButton';
import MovingTypeSelect from '@/features/estimateRequest/ui/movingTypeButton';
import { Button } from '@/shared/ui/Button';
import DatePicker from '@/shared/ui/datepicker/DatePicker';
import DropdownDatePicker from '@/shared/ui/dropdown/DropdownDatePicker';
import GNB from '@/shared/ui/gnb';
import { use, useState } from 'react';

export default function EstimateRequestPage() {
  const [movingType, setMovingType] = useState<MovingType | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [from, setFrom] = useState<AddressParams>();
  const [to, setTo] = useState<AddressParams>();

  const [progress, setProgress] = useState(0);

  return (
    <div className="h-full min-h-[100vh] w-full bg-white">
      <GNB />
      <main className="mobile:hidden relative flex h-full w-full items-center justify-center bg-[var(--color-bg-100)] pb-[100px]">
        <div className="tab:mt-[37px] tab:mb-[37px] mt-[40px] mb-[76px] rounded-[40px] bg-white p-[79px_40px_40px_40px] 2xl:p-[89px_47px_107px_47px]">
          <div className="tab:w-[700px] tab:gap-[64px] flex h-fit w-[800px] flex-col gap-[80px] leading-none">
            <div className="flex flex-col items-center justify-center">
              <span className="w-fit text-[24px] leading-[32px] font-[700]">
                이사 유형, 예정일과 지역을 선택해주세요
              </span>
              <span className="w-fit text-[16px] leading-[26px] font-[400]">
                {'견적을 요청하면 최대 5개의 견적을 받을 수 있어요 :)'}
              </span>
            </div>
            <div className="tab:gap-[48px] flex flex-col gap-[64px]">
              <div className="flex flex-col gap-[16px]">
                <label className="text-[18px] leading-[26px] font-[700]">이사 유형</label>
                <MovingTypeSelect movingType={movingType} setMovingType={setMovingType} />
              </div>
              <div className="flex flex-col gap-[64px]">
                <div className="flex w-full justify-between gap-[16px]">
                  <label className="w-fit text-[18px] leading-[26px] font-[700]">이사 예정일</label>
                  <DropdownDatePicker date={date} setDate={setDate} />
                </div>
                <div className="flex w-full justify-between gap-[16px]">
                  <label className="w-fit text-[18px] leading-[26px] font-[700]">이사 지역</label>
                  <div className="tab:flex-col mobile:gap-[24px] flex gap-[16px]">
                    <AddressButton type="from" address={from} setAddress={setFrom} />
                    <AddressButton type="to" address={to} setAddress={setTo} />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="w-[200px] 2xl:hidden">
                  <Button
                    size="md"
                    onClick={() => {}}
                    disabled={!(movingType && date && from && to)}
                  >
                    견적 요청하기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-[84px] bottom-[150px] hidden w-[200px] 2xl:block">
          <Button size="md" onClick={() => {}} disabled={!(movingType && date && from && to)}>
            견적 요청하기
          </Button>
        </div>
      </main>
      <main className="mobile:flex flex hidden h-full w-full flex-col items-center justify-center bg-white px-[24px] py-[36px]">
        <div className="flex flex-col items-center justify-center gap-[8px]">
          <ul className="flex h-full w-fit items-center gap-[8px]">
            {[1, 2, 3].map((e, idx) => (
              <li key={idx}>
                <div
                  className={`flex h-[20px] w-[20px] items-center justify-center rounded-[10px] ${progress === idx ? 'bg-[var(--color-primary-orange-400)] text-white' : 'bg-[var(--color-grayScale-100)] text-[var(--color-gray-300)]'}`}
                >
                  <span className="text-[12px] leading-[20px] font-[600]">{e}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center justify-center">
            <span className="w-fit text-[24px] leading-[32px] font-[700]">
              {`${'이사 유형'}을 선택해주세요`}
            </span>
            <span className="w-fit text-[16px] leading-[26px] font-[400]">
              {'견적을 요청하면 최대 5개의 견적을 받을 수 있어요 :)'}
            </span>
          </div>
        </div>
        <section className="h-[560px] w-full p-0">
          {progress === 0 && (
            <div className="pt-[26px]">
              <MovingTypeSelect movingType={movingType} setMovingType={setMovingType} />
            </div>
          )}
          {progress === 1 && (
            <div className="flex w-full items-center justify-center pt-[60px]">
              <DatePicker size="md" date={date || new Date()} setDate={setDate} />
            </div>
          )}
          {progress === 2 && (
            <div className="flex w-full flex-col items-center justify-center gap-[24px] pt-[62px]">
              <AddressButton type="from" address={from} setAddress={setFrom} />
              <AddressButton type="to" address={to} setAddress={setTo} />
            </div>
          )}
        </section>
        <div className="grid w-full grid-cols-2 gap-[8px]">
          <div>
            {progress !== 0 && (
              <Button
                size="sm"
                variant="outlined"
                design="primary"
                onClick={() => setProgress((prev) => (prev > 0 ? prev - 1 : prev))}
              >
                이전
              </Button>
            )}
          </div>
          <div>
            {progress === 2 ? (
              <Button size="sm" onClick={() => {}} disabled={!(movingType && date && from && to)}>
                견적 요청하기
              </Button>
            ) : (
              <Button
                size="sm"
                disabled={[movingType, date, from && to][progress] ? false : true}
                onClick={() => setProgress((prev) => (prev < 2 ? prev + 1 : prev))}
              >
                다음
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
