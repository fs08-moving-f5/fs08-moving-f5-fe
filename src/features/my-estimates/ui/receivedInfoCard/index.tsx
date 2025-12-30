import EstimateDetail from '@/shared/ui/card/EstimateDetail';
import DropdownFilter from '@/shared/ui/dropdown/DropdownFilter';
import { ReceivedEstimate } from '../../services/estimate.service';

const movingTypeMap: Record<
  'SMALL_MOVING' | 'HOME_MOVING' | 'OFFICE_MOVING' | '',
  'small' | 'home' | 'office' | undefined
> = {
  SMALL_MOVING: 'small',
  HOME_MOVING: 'home',
  OFFICE_MOVING: 'office',
  '': undefined,
};

const estimateRequestInfoLabels = [
  {
    id: 1,
    label: '이사 유형',
    value: '사무실 이사',
  },
  {
    id: 2,
    label: '출발지',
    value: '서울특별시 강남구 테헤란로 123',
  },
  {
    id: 3,
    label: '도착지',
    value: '서울특별시 강남구 테헤란로 123',
  },
  {
    id: 4,
    label: '이용일',
    value: '2026년 01월 26일 (월)',
  },
];

const ReceivedInfoCard = ({
  estimateRequest,
  estimates,
}: {
  estimateRequest: ReceivedEstimate;
  estimates: ReceivedEstimate['estimates'];
}) => {
  return (
    <div className="border-line-100 tab:gap-10 tab:flex-col flex items-start gap-15 rounded-[20px] border-[0.5px] bg-gray-50 px-10 py-12 shadow-[-2px_-2px_10px_0_rgba(220,220,220,0.14),2px_2px_10px_0_rgba(220,220,220,0.14)]">
      <div className="tab:w-full flex min-w-[300px] shrink-0 grow-0 basis-auto flex-col gap-10">
        <div className="mobile:justify-center flex items-center justify-between">
          <div className="text-black-400 mobile:text-2lg text-xl font-semibold">견적 정보</div>
          <div className="text-md mobile:hidden font-normal text-gray-500">25. 12. 25.</div>
        </div>
        <div className="mobile:gap-2 flex flex-col gap-4">
          {estimateRequestInfoLabels.map((label) => (
            <div key={label.id} className="flex items-center justify-between">
              <div className="text-primary-orange-400 mobile:text-md text-lg font-semibold">
                {label.label}
              </div>
              <div className="text-black-400 mobile:text-md text-lg font-semibold">
                {label.value}
              </div>
            </div>
          ))}
          <div className="tab:hidden mobile:block text-md hidden w-full text-right font-normal text-gray-500">
            25. 12. 25.
          </div>
        </div>
      </div>

      <div className="tab:hidden mobile:hidden h-[1160px] w-[1px] bg-[#F2F2F2]" />

      <div className="tab:w-full flex grow flex-col gap-5">
        <div className="flex items-center gap-2">
          <div className="text-black-400 text-xl font-semibold">견적서 목록</div>
          <p className="text-primary-orange-400 text-xl font-semibold">4</p>
        </div>
        <div className="flex flex-col gap-5">
          <DropdownFilter title="전체" list={['전체', '확정견적']} />
          <div className="flex flex-col gap-2">
            {estimates?.map((estimate) => (
              <EstimateDetail
                key={estimate.id}
                driverName={estimate.driver?.name ?? ''}
                driverImageUrl={estimate.driver?.driverProfile?.imageUrl ?? ''}
                rating={estimate.driver?.driverProfile?.averageRating ?? 0}
                reviewCount={0}
                experience={estimate.driver?.driverProfile?.career ?? ''}
                moveCount={`${estimate.driver?.driverProfile?.confirmedEstimateCount ?? 0}건`}
                likeCount={estimate.driver?.driverProfile?.favoriteDriverCount ?? 0}
                isLiked={false}
                movingType={movingTypeMap[estimateRequest?.movingType ?? ''] ?? undefined}
                pickedDriver={estimateRequest?.isDesignated}
                estimatePrice={estimate.price ?? 0}
                isConfirmed={estimate.status === 'CONFIRMED'}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivedInfoCard;
