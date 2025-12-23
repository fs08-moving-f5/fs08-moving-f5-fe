import type { PendingDetailEstimatePriceInfoProps } from '../../types/pendingDetailTypes';

const EstimateRequestInfo = ({
  requestDate,
  movingType,
  movingDate,
  fromAddress,
  toAddress,
}: Omit<PendingDetailEstimatePriceInfoProps, 'price'>) => {
  const requestInfo: { id: number; label: string; value: string }[] = [
    {
      id: 1,
      label: '견적 요청일',
      value: requestDate,
    },
    {
      id: 2,
      label: '서비스',
      value: movingType,
    },
    {
      id: 3,
      label: '이용일',
      value: movingDate,
    },
    {
      id: 4,
      label: '출발지',
      value: fromAddress,
    },
    {
      id: 5,
      label: '도착지',
      value: toAddress,
    },
  ];

  return (
    <div className="mt-[30px] flex flex-col gap-7">
      <div className="text-black-400 text-xl font-semibold">견적 정보</div>
      <div className="flex flex-col gap-4">
        {requestInfo.map((info) => (
          <div key={info.id} className="flex items-center gap-[23px]">
            <div className="w-[90px] text-lg font-normal text-gray-300">{info.label}</div>
            <div className="text-black-400 text-lg font-semibold">{info.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstimateRequestInfo;
