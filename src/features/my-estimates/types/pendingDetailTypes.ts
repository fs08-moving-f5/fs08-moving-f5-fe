export interface PendingDetailDriverInfoProps {
  movingType: 'small' | 'home' | 'office';
  isDesignated: boolean;
  shortIntro: string;
  estimateStatus: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
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
  movingType: 'small' | 'home' | 'office';
  movingDate: string;
  fromAddress: string;
  toAddress: string;
}
