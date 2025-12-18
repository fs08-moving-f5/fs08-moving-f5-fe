export interface EstimateRequestItem {
  id: string;
  customerName: string;
  movingType?: 'small' | 'home' | 'office';
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

export interface GetRequestsParams {
  cursor?: string | null;
  take?: number;
  movingType?: string;
  sort?: string;
}

export interface EstimateRequestRaw {
  id: string;
  name: string;
  movingType: 'SMALL_MOVING' | 'HOME_MOVING' | 'OFFICE_MOVING';
  movingDate: string;
  isDesignated: boolean;
  from: { sido: string; sigungu: string } | null;
  to: { sido: string; sigungu: string } | null;
}

// api/driverEstimate
export interface GetRequestsParams {
  cursor?: string | null;
  take?: number;
  movingType?: string;
  sort?: string;
}
