import EstimateDetail from '@/shared/ui/card/EstimateDetail';
import DropdownFilter from '@/shared/ui/dropdown/DropdownFilter';
import { ReceivedEstimate } from '../../services/estimate.service';
import { formatDateWithPeriod, formatDateWithWeekday } from '@/shared/lib/day';
import { useState, useMemo } from 'react';
import {
  useDeleteFavoriteMutation,
  useFavoriteMutation,
} from '../../../favorites/hooks/mutations/useFavoriteMutation';
import QUERY_KEY from '../../constants/queryKey';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const movingTypeMap: Record<
  'SMALL_MOVING' | 'HOME_MOVING' | 'OFFICE_MOVING' | '',
  'small' | 'home' | 'office' | undefined
> = {
  SMALL_MOVING: 'small',
  HOME_MOVING: 'home',
  OFFICE_MOVING: 'office',
  '': undefined,
};

const movingTypeLabelMap: Record<
  'SMALL_MOVING' | 'HOME_MOVING' | 'OFFICE_MOVING' | '',
  '소형 이사' | '가정 이사' | '사무실 이사' | undefined
> = {
  SMALL_MOVING: '소형 이사',
  HOME_MOVING: '가정 이사',
  OFFICE_MOVING: '사무실 이사',
  '': undefined,
};

const estimateStatusMap: Record<
  'PENDING' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED',
  '견적대기' | '견적확정' | '견적거절' | '견적취소'
> = {
  PENDING: '견적대기',
  CONFIRMED: '견적확정',
  REJECTED: '견적거절',
  CANCELLED: '견적취소',
};

const ReceivedInfoCard = ({
  estimateRequest,
  estimates,
}: {
  estimateRequest: ReceivedEstimate;
  estimates: ReceivedEstimate['estimates'];
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectStatus, setSelectStatus] = useState<'ALL' | 'CONFIRMED'>('ALL');

  const handleSelectStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    const statusMap: Record<'전체' | '확정견적', 'ALL' | 'CONFIRMED'> = {
      전체: 'ALL',
      확정견적: 'CONFIRMED',
    };

    const value = e.currentTarget.value;

    if (value === '전체' || value === '확정견적') {
      setSelectStatus(statusMap[value]);
    }
  };

  const filteredEstimates = useMemo(() => {
    if (selectStatus === 'ALL') {
      return estimates ?? [];
    }
    return estimates?.filter((estimate) => estimate.status === 'CONFIRMED') ?? [];
  }, [estimates, selectStatus]);

  const { mutate: addFavoriteDriver } = useFavoriteMutation();
  const { mutate: deleteFavoriteDriver } = useDeleteFavoriteMutation();

  const handleLikeClick = ({ driverId, isLiked }: { driverId: string; isLiked: boolean }) => {
    if (isLiked) {
      deleteFavoriteDriver(driverId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: QUERY_KEY.RECEIVED_ESTIMATE });
        },
      });
    } else {
      addFavoriteDriver(driverId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: QUERY_KEY.RECEIVED_ESTIMATE });
        },
      });
    }
  };

  const handleDetailClick = (estimateId: string) => {
    router.push(`/user/my/estimates/received/${estimateId}`);
  };

  const estimateRequestInfoLabels = [
    {
      id: 1,
      label: '이사 유형',
      value: movingTypeLabelMap[estimateRequest?.movingType ?? ''] ?? '',
    },
    {
      id: 2,
      label: '출발지',
      value: estimateRequest.addresses?.[0]?.address ?? '',
    },
    {
      id: 3,
      label: '도착지',
      value: estimateRequest.addresses?.[1]?.address ?? '',
    },
    {
      id: 4,
      label: '이용일',
      value: formatDateWithWeekday(estimateRequest.movingDate ?? ''),
    },
  ];

  return (
    <div className="border-line-100 tab:gap-10 tab:flex-col flex h-auto items-start gap-15 rounded-[20px] border-[0.5px] bg-gray-50 px-10 py-12 shadow-[-2px_-2px_10px_0_rgba(220,220,220,0.14),2px_2px_10px_0_rgba(220,220,220,0.14)]">
      <div className="tab:w-full flex min-w-[300px] shrink-0 grow-0 basis-auto flex-col gap-10">
        <div className="mobile:justify-center flex items-center justify-between">
          <div className="text-black-400 mobile:text-2lg text-xl font-semibold">견적 정보</div>
          <div className="text-md mobile:hidden flex items-center font-normal text-gray-500">
            {formatDateWithPeriod(estimateRequest?.createdAt ?? '')}
          </div>
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
            {formatDateWithPeriod(estimateRequest?.createdAt ?? '')}
          </div>
        </div>
      </div>

      <div className="tab:hidden mobile:hidden w-[1px] self-stretch bg-[#F2F2F2]" />

      <div className="tab:w-full flex grow flex-col gap-5">
        <div className="flex items-center gap-2">
          <div className="text-black-400 text-xl font-semibold">견적서 목록</div>
          <p className="text-primary-orange-400 text-xl font-semibold">
            {filteredEstimates?.length ?? 0}
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <DropdownFilter
            title={selectStatus === 'ALL' ? '전체' : '확정견적'}
            listObject={{ 전체: '전체', 확정견적: '확정견적' }}
            value={selectStatus}
            setValue={(v) => setSelectStatus(v as 'ALL' | 'CONFIRMED')}
          />
          <div className="flex flex-col gap-2">
            {filteredEstimates?.map((estimate) => (
              <EstimateDetail
                key={estimate.id}
                driverName={estimate.driver?.name ?? ''}
                driverImageUrl={estimate.driver?.driverProfile?.imageUrl ?? ''}
                rating={estimate.driver?.driverProfile?.averageRating ?? 0}
                reviewCount={estimate.driver?.driverProfile?.reviewCount ?? 0}
                experience={`${estimate.driver?.driverProfile?.career ?? 0}년`}
                moveCount={`${estimate.driver?.driverProfile?.confirmedEstimateCount ?? 0}건`}
                likeCount={estimate.driver?.driverProfile?.favoriteDriverCount ?? 0}
                isLiked={estimate.driver?.isFavorite ?? false}
                movingType={movingTypeMap[estimateRequest?.movingType ?? ''] ?? undefined}
                pickedDriver={estimateRequest?.isDesignated}
                estimatePrice={estimate.price ?? 0}
                shortIntro={estimate.comment ?? ''}
                estimateStatus={
                  estimate.status !== 'CONFIRMED'
                    ? estimateStatusMap[estimate.status ?? 'PENDING']
                    : estimateStatusMap['CONFIRMED']
                }
                isConfirmed={estimate.status === 'CONFIRMED'}
                onLikeClick={() =>
                  handleLikeClick({
                    driverId: estimate.driver?.id ?? '',
                    isLiked: estimate.driver?.isFavorite ?? false,
                  })
                }
                onClick={() => handleDetailClick(estimate.id ?? '')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivedInfoCard;
