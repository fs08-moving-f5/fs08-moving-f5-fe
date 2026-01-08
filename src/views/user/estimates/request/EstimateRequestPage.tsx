'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  createEstimateRequest,
  getPendingEsitimateRequests,
} from '@/features/estimateRequest/services/estimateRequest.service';
import { AddressParams, MovingType } from '@/features/estimateRequest/types/type';
import AddressButton from '@/features/estimateRequest/ui/AddressButton';
import MovingTypeSelect from '@/features/estimateRequest/ui/movingTypeButton';
import Button from '@/shared/ui/button/Button';
import DatePicker from '@/shared/ui/datepicker/DatePicker';
import DropdownDatePicker from '@/shared/ui/dropdown/DropdownDatePicker';
import { showToast } from '@/shared/ui/sonner';

const img_truck = '/img/img_truck_transparent.png';

export default function EstimateRequestPage() {
  const router = useRouter();
  const [movingType, setMovingType] = useState<MovingType | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [from, setFrom] = useState<AddressParams>();
  const [to, setTo] = useState<AddressParams>();

  const [progress, setProgress] = useState(0);

  type PageState = 'default' | 'pendingExist' | 'failedToLoad';

  const [pageState, setPageState] = useState<PageState>('failedToLoad');

  useEffect(() => {
    const handleload = async () => {
      try {
        const res = await getPendingEsitimateRequests();
        console.log(res.data);
        if (res.data && Array.isArray(res.data)) {
          if (res.data.length > 0) {
            setPageState('pendingExist');
            console.log('pendingExist');
            return;
          }
          setPageState('default');
          console.log('default');
          return;
        }
        setPageState('failedToLoad');
      } catch {
        setPageState('failedToLoad');
        showToast({ kind: 'error', message: '페이지 로드에 실패했습니다.' });
      }
    };

    handleload();
  }, []);

  const handleRequset = async () => {
    try {
      if (movingType && date && from && to) {
        const res = await createEstimateRequest({
          movingType: movingType,
          movingDate: date.toISOString(),
          from: from,
          to: to,
        });
        console.log(res.data);
        router.push('/user/my/estimates/pending');
      } else {
        console.log('모든 견적 요청 양식을 채워주세요!');
      }
    } catch (err) {
      showToast({
        kind: 'error',
        message: err instanceof Error ? err.message : '견적 요청에 실패했습니다.',
      });
      if (movingType && date && from && to) {
        console.log({
          movingType: movingType,
          movingDate: date.toISOString(),
          from: from,
          to: to,
        });
      }
    }
  };

  return (
    <div className="flex h-[100vh] min-h-[100vh] w-full flex-col bg-white select-none">
      {pageState === 'default' && (
        <div>
          {/* pc, 태블릿 스타일 */}
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
                      <label className="w-fit text-[18px] leading-[26px] font-[700]">
                        이사 예정일
                      </label>
                      <DropdownDatePicker date={date} setDate={setDate} />
                    </div>
                    <div className="flex w-full justify-between gap-[16px]">
                      <label className="w-fit text-[18px] leading-[26px] font-[700]">
                        이사 지역
                      </label>
                      <div className="tab:flex-col mobile:gap-[24px] flex gap-[16px]">
                        <AddressButton type="from" address={from} setAddress={setFrom} />
                        <AddressButton type="to" address={to} setAddress={setTo} />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="w-[200px] 2xl:hidden">
                      <Button
                        aria-label="견적 요청하기"
                        size="md"
                        onClick={handleRequset}
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
              <Button
                aria-label="견적 요청하기"
                size="md"
                onClick={() => {}}
                disabled={!(movingType && date && from && to)}
              >
                견적 요청하기
              </Button>
            </div>
          </main>
          {/* 모바일 스타일 */}
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
                  {`${['이사 유형', '이사 예정일', '이사 지역'][progress]}을 선택해주세요`}
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
                    aria-label="이전"
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
                  <Button
                    aria-label="견적 요청하기"
                    size="sm"
                    onClick={handleRequset}
                    disabled={!(movingType && date && from && to)}
                  >
                    견적 요청하기
                  </Button>
                ) : (
                  <Button
                    aria-label="다음"
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
      )}
      {pageState === 'pendingExist' && (
        <main className="flex h-full w-full flex-col bg-[var(--color-bg-100)]">
          <div className="tab:h-[54px] mobile:h-[74px] flex h-[96px] w-full justify-center bg-white">
            <div className="tab:px-[72px] mobile:px-[24px] flex h-full w-full max-w-[1200px] items-center justify-start">
              <span className="tab:text-[18px] tab:leading-[26px] h-fit w-fit text-[24px] leading-[32px] font-[600]">
                견적 요청
              </span>
            </div>
          </div>
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-fit w-fit flex-col items-center gap-[40px]">
              <div className="flex h-fit w-fit flex-col items-center">
                <Image
                  src={img_truck}
                  alt="img_truck"
                  width={280}
                  height={280}
                  className="tab:w-[180px] tab:h-[180px] tab:min-w-[180px] tab:min-h-[180px] h-[280px] min-h-[280px] w-[280px] min-w-[280px]"
                />
                <div className="flex w-fit flex-col items-center">
                  <span className="tab:text-[14px] tab:leading-[24px] h-fit w-fit shrink-0 text-[20px] leading-[32px] font-[400] text-[#999]">
                    현재 진행 중인 이사견적이 있어요!
                  </span>
                  <span className="tab:text-[14px] tab:leading-[24px] h-fit w-fit shrink-0 text-[20px] leading-[32px] font-[400] text-[#999]">
                    진행 중인 이사 완료 후 새로운 견적을 받아보세요!
                  </span>
                </div>
              </div>
              <Link href={'/user/my/estimates/pending'}>
                <div className="tab:hidden w-[181px]">
                  <Button aria-label="받은 견적 보러가기" size="md">
                    받은 견적 보러가기
                  </Button>
                </div>
                <div className="tab:block hidden w-[167px]">
                  <Button aria-label="받은 견적 보러가기" size="sm">
                    받은 견적 보러가기
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </main>
      )}
      {pageState === 'failedToLoad' && <div></div>}
    </div>
  );
}
