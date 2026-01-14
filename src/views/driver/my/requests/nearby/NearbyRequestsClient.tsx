'use client';

import { useMemo, useState } from 'react';
import KakaoMap from '@/features/nearbyRequests/ui/KakaoMap';
import { KakaoMapScript } from '@/features/nearbyRequests/ui/KakaoMapScript';
import {
  useGetMyPageQuery,
  useGetNearbyQuery,
} from '@/features/nearbyRequests/hooks/queries/useNearbyRequestsQuery';
import { RequestReceived } from '@/shared/ui/card';
import { formatDateAgo, formatDateWithWeekday } from '@/shared/lib/day';
import {
  sendEstimate,
  rejectEstimate,
} from '@/features/driver-estimate/services/driverEstimate.service';
import ModalQuetRequest from '@/shared/ui/modal/ModalRequest';
import { showToast } from '@/shared/ui/sonner';
import {
  toMovingInfo,
  type EstimateRequestItem,
} from '@/features/driver-estimate/types/driverEstimate';
import type { NearbyRequestItem } from '@/features/nearbyRequests/types';

const MOVING_TYPE_MAP: Record<
  'SMALL_MOVING' | 'HOME_MOVING' | 'OFFICE_MOVING',
  'small' | 'home' | 'office'
> = {
  SMALL_MOVING: 'small',
  HOME_MOVING: 'home',
  OFFICE_MOVING: 'office',
};

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };

const NearbyRequestsClient = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalType, setSelectedModalType] = useState<'confirm' | 'reject' | null>(null);
  const [price, setPrice] = useState<number>();
  const [comment, setComment] = useState<string>('');

  const { data: nearbyRequests = [] } = useGetNearbyQuery(20);
  const { data: myPage } = useGetMyPageQuery();

  const selectedRequest = useMemo<NearbyRequestItem | null>(() => {
    if (!selectedId) return null;
    return nearbyRequests.find((request) => request.estimateRequestId === selectedId) ?? null;
  }, [nearbyRequests, selectedId]);

  // NearbyRequestItem을 EstimateRequestItem 형태로 변환
  const convertedRequest = useMemo<EstimateRequestItem | null>(() => {
    if (!selectedRequest) return null;
    return {
      id: selectedRequest.estimateRequestId,
      customerName: selectedRequest.user.name,
      movingType: MOVING_TYPE_MAP[selectedRequest.movingType],
      pickedDriver: selectedRequest.isDesignated ?? false,
      pickupAddress: `${selectedRequest.fromAddress.sido} ${selectedRequest.fromAddress.sigungu}`,
      dropoffAddress: `${selectedRequest.toAddress.sido} ${selectedRequest.toAddress.sigungu}`,
      movingDate: formatDateWithWeekday(selectedRequest.movingDate),
      requestTime: formatDateAgo(selectedRequest.createdAt),
    };
  }, [selectedRequest]);

  // 모달 제출 핸들러
  const handleSubmit = async () => {
    if (!selectedRequest || !selectedModalType) return;

    try {
      if (selectedModalType === 'confirm') {
        if (!price || price <= 0) {
          showToast({
            kind: 'error',
            message: '견적가를 입력해주세요.',
          });
          return;
        }
        await sendEstimate({
          estimateRequestId: selectedRequest.estimateRequestId,
          price,
          comment,
        });
        showToast({
          kind: 'success',
          message: '견적이 전송되었습니다.',
        });
      }

      if (selectedModalType === 'reject') {
        await rejectEstimate({
          estimateRequestId: selectedRequest.estimateRequestId,
          rejectReason: comment,
        });
        showToast({
          kind: 'success',
          message: '반려 요청이 완료되었습니다.',
        });
      }

      setIsModalOpen(false);
      setSelectedId(null);
      setPrice(undefined);
      setComment('');
    } catch (error) {
      console.error(error);
      showToast({
        kind: 'error',
        message: '요청 처리 중 오류가 발생했습니다.',
      });
    }
  };

  return (
    <div className="relative h-screen w-full">
      <KakaoMapScript onLoad={() => setIsScriptLoaded(true)} />

      {isScriptLoaded && (
        <KakaoMap
          center={{
            lat: myPage?.profile?.officeLat ?? DEFAULT_CENTER.lat,
            lng: myPage?.profile?.officeLng ?? DEFAULT_CENTER.lng,
          }}
          requests={nearbyRequests}
          onSelectRequest={(id) => {
            setSelectedId(selectedId === id ? null : id);
          }}
        />
      )}

      {/* 카드 - 모달이 열려있지 않을 때만 표시 */}
      {selectedRequest && !isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          onClick={() => setSelectedId(null)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <RequestReceived
              customerName={selectedRequest.user.name}
              movingType={MOVING_TYPE_MAP[selectedRequest.movingType]}
              pickedDriver={selectedRequest.isDesignated ?? false}
              pickupAddress={`${selectedRequest.fromAddress.sido} ${selectedRequest.fromAddress.sigungu}`}
              dropoffAddress={`${selectedRequest.toAddress.sido} ${selectedRequest.toAddress.sigungu}`}
              movingDate={formatDateWithWeekday(selectedRequest.movingDate)}
              requestTime={formatDateAgo(selectedRequest.createdAt)}
              onSendEstimateClick={() => {
                setSelectedModalType('confirm');
                setIsModalOpen(true);
                setPrice(undefined);
                setComment('');
              }}
              onRejectClick={() => {
                setSelectedModalType('reject');
                setIsModalOpen(true);
                setComment('');
              }}
            />
          </div>
        </div>
      )}

      {/* 모달 */}
      {isModalOpen && convertedRequest && selectedModalType && (
        <ModalQuetRequest
          type={selectedModalType}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          user={{ name: convertedRequest.customerName, role: 'user' }}
          mvInfo={toMovingInfo(convertedRequest)}
          price={price}
          setPrice={setPrice}
          comment={comment}
          setComment={setComment}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default NearbyRequestsClient;
