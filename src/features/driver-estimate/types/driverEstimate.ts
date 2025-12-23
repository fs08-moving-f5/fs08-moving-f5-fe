export type BackendMovingType = 'SMALL_MOVING' | 'HOME_MOVING' | 'OFFICE_MOVING';

export type FrontMovingType = 'small' | 'home' | 'office';

export interface EstimateRequestItem {
  id: string;
  customerName: string;
  movingType?: FrontMovingType;
  pickedDriver: boolean;
  pickupAddress: string;
  dropoffAddress: string;
  movingDate: string;
  requestTime: string;
}

export interface EstimateRequestResponse {
  data: EstimateRequestItem[];
  nextCursor: string | null;
}

export type ModalType = 'confirm' | 'reject' | null;

export const toMovingInfo = (r: EstimateRequestItem) => ({
  movingTypes: r.movingType ? [r.movingType] : [],
  departure: r.pickupAddress,
  destination: r.dropoffAddress,
  date: new Date(r.movingDate),
});

// api/driverEstimate
export interface GetRequestsParams {
  cursor?: string | null;
  take?: number;
  movingType?: BackendMovingType;
  sort?: 'latest' | 'oldest' | 'moving-latest' | 'moving-oldest';
}
export interface EstimateRequestRaw {
  id: string;
  name: string;
  movingType: BackendMovingType;
  movingDate: string;
  isDesignated: boolean;
  createdAt: string;
  updatedAt?: string | null;
  from: { sido: string; sigungu: string } | null;
  to: { sido: string; sigungu: string } | null;
}
