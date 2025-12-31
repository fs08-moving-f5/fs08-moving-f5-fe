// 프로필 관련 타입 정의

export type RegionType =
  | '서울'
  | '경기'
  | '인천'
  | '강원'
  | '충북'
  | '충남'
  | '대전'
  | '세종'
  | '전북'
  | '전남'
  | '광주'
  | '경북'
  | '경남'
  | '대구'
  | '부산'
  | '울산'
  | '제주';

export type ServiceType = 'SMALL_MOVING' | 'HOME_MOVING' | 'OFFICE_MOVING';

// 유저 프로필
export interface UserProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  imageUrl?: string | null;
  regions: RegionType[];
  services: ServiceType[];
  createdAt: string;
  updatedAt: string;
}

// 기사 프로필
export interface DriverProfile {
  id: string;
  driverId: string;
  name: string;
  email: string;
  phone: string;
  imageUrl?: string | null;
  career?: string | null;
  shortIntro?: string | null;
  description?: string | null;
  regions: RegionType[];
  services: ServiceType[];
  createdAt: string;
  updatedAt: string;
}

// 유저 프로필 생성 요청
export interface CreateUserProfileRequest {
  imageUrl?: string;
  regions: RegionType[];
  services: ServiceType[];
}

// 유저 프로필 수정 요청
export interface UpdateUserProfileRequest {
  imageUrl?: string | null;
  regions?: RegionType[];
  services?: ServiceType[];
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  currentPassword?: string;
  newPassword?: string;
}

// 기사 프로필 생성 요청
export interface CreateDriverProfileRequest {
  imageUrl?: string;
  career?: string;
  shortIntro?: string;
  description?: string;
  regions: RegionType[];
  services: ServiceType[];
}

// 기사 프로필 수정 요청
export interface UpdateDriverProfileRequest {
  imageUrl?: string | null;
  career?: string | null;
  shortIntro?: string | null;
  description?: string | null;
  regions?: RegionType[];
  services?: ServiceType[];
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  currentPassword?: string;
  newPassword?: string;
}

// ========== 마이페이지 관련 타입 ==========

// 마이페이지 데이터
export interface MyPageData {
  profile: {
    id: string;
    name: string;
    imageUrl: string | null;
    career: string | null;
    shortIntro: string | null;
    description: string | null;
    services: string[];
    regions: string[];
    favoritedCount: number;
  };
  activity: {
    completedCount: number;
    averageRating: number;
    career: string | null;
  };
  reviewDistribution: {
    [key: number]: number;
  };
}

// 리뷰
export interface Review {
  id: string;
  rating: number | null;
  content: string | null;
  createdAt: string;
  userName: string;
}

// 리뷰 목록 데이터
export interface ReviewListData {
  reviews: Review[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
