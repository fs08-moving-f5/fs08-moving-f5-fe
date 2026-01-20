'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { MovingTypeChip } from '@/shared/ui/chip';
import { getConfirmDetailEstimates } from '@/features/driver-estimate/services/driverEstimate.service';
import { FrontMovingType } from '@/features/driver-estimate/types/driverEstimate';
import Spinner from '@/shared/ui/spinner';
import ShareButtonsSection from '@/features/driver-estimate/ui/detailUi/ShareButtonsSection';

const ConfirmDetail = ({ id }: { id: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['confirm-detail', id],
    queryFn: () => getConfirmDetailEstimates(id),
  });

  if (isLoading || !data) return null;

  const {
    customerName,
    movingType,
    pickedDriver,
    requestTime,
    pickupAddress,
    dropoffAddress,
    movingDate,
    estimatePrice,
    isConfirmed,
  } = data;

  const MOVING_TYPE_LABEL: Record<FrontMovingType, string> = {
    small: '소형 이사',
    home: '가정 이사',
    office: '사무실 이사',
  };

  //로딩중 바
  if (isLoading) {
    return (
      <main className="flex max-w-[1920px] flex-col justify-center">
        <section className="mx-auto mt-[10px] w-full max-w-[1200px]">
          <Spinner isLoading={isLoading} />
        </section>
      </main>
    );
  }

  return (
    <main className="flex max-w-[1920px] flex-col justify-center">
      <section className="mx-auto mt-[10px] w-full justify-center">
        <section className="max-w-[1200px] items-center self-stretch px-[20px] py-[32px] md:px-[72px] lg:mx-auto">
          <h1 className="text-2xl font-semibold text-[var(--color-black-500)]">견적 상세</h1>
        </section>

        <div className="h-45 w-full bg-[url(/img/myPendingEstimate/bg-img.png)] bg-cover bg-center bg-no-repeat" />

        <section className="mt-[35px] flex max-w-[1200px] flex-col gap-[139px] px-5 pb-30 md:mt-[46px] md:px-18 md:pb-[138px] lg:mx-auto lg:mt-[43px] lg:flex-row lg:gap-[139px] lg:pb-[190px]">
          <article className="w-full lg:w-[740px]">
            {/* 칩 & 고객 이름 */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap gap-2">
                {movingType && <MovingTypeChip movingType={movingType} />}
                {pickedDriver && <MovingTypeChip movingType="assign" />}
              </div>

              <div className="flex justify-between">
                <h3 className="mobile:text-2lg tab:text-xl text-2xl font-semibold text-[var(--color-black-400)]">
                  {customerName} 고객님
                </h3>
                {isConfirmed && (
                  <span className="text-primary-orange-400 flex items-center gap-1 font-bold">
                    <Image src="/icons/confirm.svg" alt="confirm icon" width={20} height={20} />
                    확정견적
                  </span>
                )}
              </div>
            </div>

            <hr className="border-line-200 my-[27px]" />

            {/* 견적가 */}
            <div className="flex gap-[61px]">
              <h3 className="mobile:text-lg tab:text-xl text-xl font-semibold text-[var(--color-black-400)]">
                견적가
              </h3>
              <strong className="mobile:text-xl tab:text-xl text-black-500 text-2xl font-bold">
                {estimatePrice.toLocaleString()}원
              </strong>
            </div>

            <hr className="border-line-200 mt-[27px] mb-[30px]" />

            {/* 견적 정보 */}
            <div className="mt-[30px] flex flex-col gap-7">
              <div className="text-black-400 text-xl font-semibold">견적 정보</div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-[23px]">
                  <div className="w-[90px] text-lg font-normal text-gray-300">견적 요청일</div>
                  <div className="text-black-400 text-lg font-semibold">{requestTime}</div>
                </div>

                <div className="flex items-center gap-[23px]">
                  <div className="w-[90px] text-lg font-normal text-gray-300">서비스</div>
                  <div className="text-black-400 text-lg font-semibold">
                    {movingType && MOVING_TYPE_LABEL[movingType]}
                  </div>
                </div>

                <div className="flex items-center gap-[23px]">
                  <div className="w-[90px] text-lg font-normal text-gray-300">이용일</div>
                  <div className="text-black-400 text-lg font-semibold">{movingDate}</div>
                </div>

                <div className="flex items-center gap-[23px]">
                  <div className="w-[90px] text-lg font-normal text-gray-300">출발지</div>
                  <div className="text-black-400 text-lg font-semibold">{pickupAddress}</div>
                </div>

                <div className="flex items-center gap-[23px]">
                  <div className="w-[90px] text-lg font-normal text-gray-300">도착지</div>
                  <div className="text-black-400 text-lg font-semibold">{dropoffAddress}</div>
                </div>
              </div>

              <hr className="border-line-200 my-[27px]" />
            </div>
          </article>

          <ShareButtonsSection id={id} heading="견적서 공유하기" />
        </section>
      </section>
    </main>
  );
};

export default ConfirmDetail;
