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
