'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MovingTypeChip } from '@/shared/ui/chip';
import { Button } from '@/shared/ui/button';
import { EstimateClientProps } from '@/features/driver-estimate/types/driverEstimate';

// interface EstimateClientProps {
//   customerName: string;
//   movingType?: 'small' | 'home' | 'office';
//   pickedDriver?: boolean;
//   pickupAddress: string;
//   dropoffAddress: string;
//   movingDate: string;
//   estimatePrice?: number | undefined;
//   isConfirmed?: boolean;
//   status?: 'completed' | 'rejected';
//   onDetailClick?: () => void;
// }

const EstimateClient = (props: EstimateClientProps) => {
  const router = useRouter();

  const {
    id,
    customerName,
    movingType,
    pickedDriver = false,
    pickupAddress,
    dropoffAddress,
    movingDate,
    isConfirmed = false,
    status,
  } = props;

  return (
    <article className="mobile:rounded-xl mobile:p-4 tab:rounded-xl tab:p-5 mobile:max-w-[327px] relative w-full max-w-[588px] rounded-2xl bg-white p-6 shadow-md">
      <div className="mobile:gap-3 tab:gap-3 flex flex-col gap-4">
        {/* 헤더: 칩 영역 */}
        <header className="flex w-full items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {movingType && <MovingTypeChip movingType={movingType} />}
            {pickedDriver && <MovingTypeChip movingType="assign" />}
          </div>
          {isConfirmed && (
            <span className="text-primary-orange-400 flex items-center gap-1 font-bold">
              <Image src="/icons/confirm.svg" alt="confirm icon" width={20} height={20} />
              확정견적
            </span>
          )}
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
        {/* 견적 금액 */}
        {status !== 'rejected' && props.estimatePrice !== undefined && (
          <section className="flex items-center justify-between">
            <span className="mobile:text-md tab:text-md text-grayScale-500 text-lg font-medium">
              견적 금액
            </span>
            <strong className="mobile:text-xl tab:text-xl text-black-500 text-2xl font-bold">
              {props.estimatePrice.toLocaleString()}원
            </strong>
          </section>
        )}
      </div>

      {/* 이사 완료 오버레이 */}
      {status === 'completed' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-[rgba(4,4,4,0.64)]">
          <p className="mb-4 text-lg font-semibold text-white">이사 완료된 견적이에요</p>
          <Button
            variant="outlined"
            design="secondary"
            size="xs"
            onClick={() => router.push(`/estimates/${id}`)}
          >
            견적 상세보기
          </Button>
        </div>
      )}

      {/* 반려된 요청 오버레이 */}
      {status === 'rejected' && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[rgba(4,4,4,0.64)]">
          <p className="text-lg font-semibold text-white">반려된 요청이에요</p>
        </div>
      )}
    </article>
  );
};

export default EstimateClient;
