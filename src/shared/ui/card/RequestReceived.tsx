'use client';

import Image from 'next/image';
import { MovingTypeChip } from '@/shared/ui/chip';
import { Button } from '@/shared/ui/button';

interface RequestReceivedProps {
  customerName: string;
  movingType?: 'small' | 'home' | 'office';
  pickedDriver?: boolean;
  pickupAddress: string;
  dropoffAddress: string;
  movingDate: string;
  requestTime?: string;
  onSendEstimateClick?: () => void;
  onRejectClick?: () => void;
}

const RequestReceived = ({
  customerName,
  movingType,
  pickedDriver = false,
  pickupAddress,
  dropoffAddress,
  movingDate,
  requestTime,
  onSendEstimateClick,
  onRejectClick,
}: RequestReceivedProps) => {
  return (
    <article className="mobile:rounded-xl mobile:p-6 mobile:max-w-[327px] relative w-full max-w-[558px] rounded-2xl bg-white px-8 py-6 shadow-md">
      <div className="mobile:gap-3 tab:gap-3 flex flex-col gap-4">
        {/* 헤더: 칩 영역 */}
        <header className="flex w-full items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {movingType && <MovingTypeChip movingType={movingType} />}
            {pickedDriver && <MovingTypeChip movingType="assign" />}
          </div>
          <div>
            {requestTime && <span className="text-grayScale-500 text-md">{requestTime}</span>}
          </div>
        </header>

        {/* 고객 이름 */}
        <section>
          <h3 className="mobile:text-lg tab:text-lg text-black-500 text-xl font-semibold">
            {customerName} 고객님
          </h3>
        </section>

        <hr className="border-line-200" />

        {/* 이사 정보 */}
        <section className="mobile:text-sm tab:text-sm text-black-300 text-md flex flex-row flex-wrap justify-between gap-6">
          <div className="flex flex-row flex-wrap items-end gap-2">
            <div className="flex flex-col items-start gap-2">
              <span className="text-grayScale-500 mobile:text-sm tab:text-sm text-md w-16 flex-shrink-0">
                출발지
              </span>
              <span className="text-black-500 flex-1 font-semibold">{pickupAddress}</span>
            </div>
            <Image src="/icons/arrow-right.svg" alt="to" width={16} height={16} className="h-fit" />
            <div className="flex flex-col items-start gap-2">
              <span className="text-grayScale-500 mobile:text-sm tab:text-sm text-md w-16 flex-shrink-0">
                도착지
              </span>
              <span className="text-black-500 flex-1 font-semibold">{dropoffAddress}</span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2">
            <span className="text-grayScale-500 mobile:text-sm tab:text-sm text-md w-16 flex-shrink-0">
              이사일
            </span>
            <span className="text-black-500 flex-1 font-semibold">{movingDate}</span>
          </div>
        </section>

        <hr className="border-line-200" />

        {/* 버튼 영역 */}
        <section className="mobile:flex-col-reverse mobile:gap-2 tab:flex-col tab:gap-2 flex flex-row gap-3">
          <Button variant="outlined" size="lg" onClick={onRejectClick}>
            반려하기
          </Button>
          <Button
            variant="solid"
            design="primary"
            size="lg"
            isWriting
            onClick={onSendEstimateClick}
          >
            견적 보내기
          </Button>
        </section>
      </div>
    </article>
  );
};

export default RequestReceived;
