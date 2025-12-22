import type { PendingEstimatesSubHeaderProps } from '@/features/my-estimates/types/pendingTypes';

const PendingEstimatesSubHeader = ({
  movingType,
  movingDate,
  applyAt,
  fromAddress,
  toAddress,
}: PendingEstimatesSubHeaderProps) => {
  const arrowRightIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
      <path
        d="M8.35355 4.03715C8.54882 3.84189 8.54882 3.5253 8.35355 3.33004L5.17157 0.14806C4.97631 -0.0472026 4.65973 -0.0472026 4.46447 0.14806C4.2692 0.343322 4.2692 0.659904 4.46447 0.855166L7.29289 3.68359L4.46447 6.51202C4.2692 6.70728 4.2692 7.02387 4.46447 7.21913C4.65973 7.41439 4.97631 7.41439 5.17157 7.21913L8.35355 4.03715ZM8 3.68359L8 3.18359L4.37114e-08 3.18359L0 3.68359L-4.37114e-08 4.18359L8 4.18359L8 3.68359Z"
        fill="#302F2D"
      />
    </svg>
  );

  return (
    <div className="w-full bg-white">
      <div className="container-responsive mobile:max-w-[327px] mobile:gap-5 mobile:py-6 tab:flex-col tab:items-start tab:gap-[28px] tab:max-w-[600px] flex max-w-[1200px] items-center justify-between py-8">
        <div className="flex flex-col gap-1">
          <div className="text-black-500 mobile:text-xl text-2xl font-bold">{movingType}</div>
          <div className="text-md mobile:text-xs font-normal text-gray-500">
            견적 신청일: {applyAt}
          </div>
        </div>
        <div className="mobile:flex-col mobile:items-start mobile:gap-0 mobile:w-full flex items-end gap-10">
          <div className="mobile:flex-col mobile:items-start mobile:gap-0 mobile:w-full flex items-end gap-3">
            <div className="mobile:flex-row mobile:justify-between flex w-full flex-col">
              <div className="text-md mobile:text-md font-normal text-gray-500">출발지</div>
              <div className="text-2lg text-black-500 mobile:text-md font-semibold whitespace-nowrap">
                {fromAddress}
              </div>
            </div>

            <div className="mobile:hidden flex h-[26px] flex-col items-center justify-center gap-[10px]">
              {arrowRightIcon}
            </div>

            <div className="mobile:flex-row mobile:justify-between flex w-full flex-col">
              <div className="text-md mobile:text-md font-normal text-gray-500">도착지</div>
              <div className="text-2lg text-black-500 mobile:text-md font-semibold whitespace-nowrap">
                {toAddress}
              </div>
            </div>
          </div>
          <div className="mobile:flex-row mobile:justify-between mobile:w-full flex flex-col">
            <div className="text-md mobile:text-md font-normal text-gray-500">이사일</div>
            <div className="text-2lg text-black-500 mobile:text-md font-semibold">{movingDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingEstimatesSubHeader;
