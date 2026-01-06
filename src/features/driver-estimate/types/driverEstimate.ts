export type BackendMovingType = 'SMALL_MOVING' | 'HOME_MOVING' | 'OFFICE_MOVING';
export type FrontMovingType = 'small' | 'home' | 'office';

export type BackendFilter = 'latest' | 'oldest' | 'moving-latest' | 'moving-oldest';
export type FrontFilter = 'Latest' | 'Oldest' | 'HighestMovingDate' | 'LowestMovingDate';

// 받은 요청
export interface EstimateRequestItem {
  id: string;
  customerName: string;
  movingType: FrontMovingType;
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
  movingType: r.movingType,
  pickedDriver: r.pickedDriver,
  departure: r.pickupAddress,
  destination: r.dropoffAddress,
  date: r.movingDate,
});

// 확정 견적 & 반려
export interface EstimateListPageProps {
  queryKey: readonly unknown[];
  queryFn: (params: { cursor: string | null }) => Promise<EstimateListResponse>;
  emptyType: 'confirm' | 'reject';
  status: 'completed' | 'rejected';
}

interface BaseEstimateClientProps {
  id: string;
  customerName: string;
  pickupAddress: string;
  dropoffAddress: string;
  movingDate: string;

  movingType?: FrontMovingType;
  pickedDriver?: boolean;
  isConfirmed?: boolean;
}

interface CompletedEstimateProps {
  status: 'completed';
  estimatePrice: number;
}

interface RejectedEstimateProps {
  status: 'rejected';
}

interface NormalEstimateProps {
  status: 'normal';
  estimatePrice: number;
}

export type EstimateClientProps =
  | (BaseEstimateClientProps & CompletedEstimateProps)
  | (BaseEstimateClientProps & RejectedEstimateProps)
  | (BaseEstimateClientProps & NormalEstimateProps);

export interface EstimateListResponse {
  data: EstimateClientProps[];
  nextCursor: string | null;
}

export interface ConfirmDetailPageProps {
  id: string;

  customerName: string;
  movingType?: FrontMovingType;
  pickedDriver?: boolean;

  requestTime: string;
  pickupAddress: string;
  dropoffAddress: string;
  movingDate: string;

  estimatePrice: number;
  isConfirmed?: boolean;
}

// api/driverEstimate
export interface GetRequestsUIParams {
  cursor?: string | null;
  take?: number;
  movingTypes?: FrontMovingType[];
  sort?: FrontFilter;
  keyword?: string;
  onlyDesignated?: boolean;
  onlyServiceable?: boolean;
}

export interface GetRequestsParams {
  cursor?: string | null;
  take?: number;
  movingType?: BackendMovingType;
  sort?: BackendFilter;
}
export interface EstimateRequestRaw {
  id: string;
  user: {
    id: string;
    name: string;
  };
  movingType: BackendMovingType;
  movingDate: string;
  isDesignated: boolean;
  createdAt: string;
  updatedAt?: string | null;
  from: { sido: string; sigungu: string } | null;
  to: { sido: string; sigungu: string } | null;
}

export interface SendEstimateParams {
  estimateRequestId: string;
  price: number;
  comment: string;
}

export interface RejectEstimateParams {
  estimateRequestId: string;
  rejectReason: string;
}

export interface GetConfirmEstimatesParams {
  cursor?: string | null;
}

export interface EstimateConfirmRaw {
  id: string;
  user: {
    id: string;
    name: string;
  };
  movingType: BackendMovingType;
  movingDate: string;
  isDesignated: boolean;
  createdAt: string;
  updatedAt?: string | null;
  from: { sido: string; sigungu: string } | null;
  to: { sido: string; sigungu: string } | null;
  price: number;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED';
  type: 'completed' | 'normal';
}

export interface EstimateRejectRaw {
  id: string;
  user: {
    id: string;
    name: string;
  };
  movingType: BackendMovingType;
  movingDate: string;
  isDesignated: boolean;
  createdAt: string;
  updatedAt?: string | null;
  from: { sido: string; sigungu: string } | null;
  to: { sido: string; sigungu: string } | null;
  type: 'rejected';
}

export interface ConfirmDetailPageProps {
  id: string;
  customerName: string;
  movingType?: FrontMovingType;
  pickedDriver?: boolean;

  requestTime: string;
  pickupAddress: string;
  dropoffAddress: string;
  movingDate: string;

  estimatePrice: number;
}

export interface EstimateConfirmDetailRaw {
  id: string;
  price: number;
  userName: string;
  movingType: BackendMovingType;
  movingDate: string;
  isDesignated: boolean;
  createdAt: string;
  updatedAt: string;
  fromAddress: string | null;
  toAddress: string | null;
}
