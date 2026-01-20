interface DriverProfile {
  id: string;
  imageUrl: string;
  career: number;
  shortIntro: string;
  description: string;
  services: ('SMALL_MOVING' | 'HOME_MOVING' | 'OFFICE_MOVING')[];
  confirmedEstimateCount: number;
  favoriteDriverCount: number;
  averageRating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

interface GetFavoriteDriversData {
  id: string;
  userId: string;
  driverId: string;
  createdAt: string;
  driver: {
    id: string;
    name: string;
    driverProfile: DriverProfile;
  };
  reviews: {
    id: string;
    rating: number;
  }[];
}

interface GetFavoriteDriversResponse {
  success: boolean;
  data: GetFavoriteDriversData[];
  count: number;
  pagination: {
    hasNext: boolean;
    nextCursor: string;
  };
}

export type { GetFavoriteDriversResponse, GetFavoriteDriversData, DriverProfile };
