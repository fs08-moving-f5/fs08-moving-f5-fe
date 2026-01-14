import { paths } from '@/shared/types/openapi';

export type NearbyRequestsResponse =
  paths['/api/drivers/me/requests/nearby']['get']['responses']['200']['content']['application/json'];

export type MyPageResponse =
  paths['/api/my-page']['get']['responses']['200']['content']['application/json'];

export type NearbyRequestItem = {
  estimateRequestId: string;
  distanceKm: number;
  movingType: 'SMALL_MOVING' | 'HOME_MOVING' | 'OFFICE_MOVING';
  movingDate: string;
  createdAt: string;
  isDesignated: boolean;
  user: {
    id: string;
    name: string;
  };
  fromAddress: {
    sido: string;
    sigungu: string;
    address: string;
    lat: number;
    lng: number;
  };
  toAddress: {
    sido: string;
    sigungu: string;
    address: string;
  };
};

export type NearbyRequestList = NearbyRequestItem[];
