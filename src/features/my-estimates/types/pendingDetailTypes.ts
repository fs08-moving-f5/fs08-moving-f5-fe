export interface PendingDetailDriverInfoProps {
  movingType: 'SMALL_MOVING' | 'HOME_MOVING' | 'OFFICE_MOVING';
  isDesignated: boolean;
  shortIntro: string;
  estimateStatus: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED';
  driverName: string;
  favoriteCount: number;
  rating: number;
  career: string;
  moveCount: number;
  reviewCount: number;
}

export interface PendingDetailEstimatePriceInfoProps {
  price: number;
  requestDate: string;
  movingType: '소형이사' | '가정이사' | '사무실이사';
  movingDate: string;
  fromAddress: string;
  toAddress: string;
}
