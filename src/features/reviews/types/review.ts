import {
  BackendMovingType,
  FrontMovingType,
} from '@/features/driver-estimate/types/driverEstimate';

export interface ReviewWritableItem {
  id: string;
  reviewId: string;
  driverName: string;
  description?: string;
  movingType: FrontMovingType;
  pickedDriver: boolean;
  driverImageUrl?: string;
  pickupAddress: string;
  dropoffAddress: string;
  movingDate: string;
  estimatedPrice: number;
}

export interface ReviewWrittenItem {
  id: string;
  driverName: string;
  description?: string;
  movingType: FrontMovingType;
  pickedDriver: boolean;
  driverImageUrl?: string;
  pickupAddress: string;
  dropoffAddress: string;
  movingDate: string;
  rating: number;
  content: string;
  updatedAt: string;
}

export interface OffsetPaginationResponse<T> {
  data: T[];
  total: number;
}

export interface ReviewWritableItemRaw {
  id: string;
  price: number;
  createdAt: string;
  reviewId: string;
  driver: {
    id: string;
    name: string;
    shortIntro: string;
    imageUrl: string | null;
  };
  movingDate: string;
  movingType: BackendMovingType;
  isDesignated: boolean;
  from: { sido: string; sigungu: string } | null;
  to: { sido: string; sigungu: string } | null;
}

export interface getReviewWrittenItemRaw {
  id: string;
  rating: number;
  content: string;
  updatedAt: string;
  driver: {
    id: string;
    name: string;
    shortIntro: string;
    imageUrl: string | null;
  };
  movingDate: string;
  movingType: BackendMovingType;
  isDesignated: boolean;
  from: { sido: string; sigungu: string } | null;
  to: { sido: string; sigungu: string } | null;
}
