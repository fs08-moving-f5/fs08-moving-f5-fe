import { api } from './client';

// ========== Types ==========

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

export interface Review {
  id: string;
  rating: number | null;
  content: string | null;
  createdAt: string;
  userName: string;
}

export interface ReviewListData {
  reviews: Review[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// ========== API Functions ==========

/**
 * 드라이버 마이페이지 전체 데이터 조회
 * GET /api/my-page
 */
export const getMyPageData = async (): Promise<MyPageData> => {
  const res = await api.get<MyPageData>('my-page');
  return res.data;
};

/**
 * 드라이버 마이페이지 리뷰 목록 조회 (페이지네이션)
 * GET /api/my-page/reviews?page=1&limit=10
 */
export const getMyPageReviews = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<ReviewListData> => {
  const res = await api.get<ReviewListData>(`my-page/reviews?page=${page}&limit=${limit}`);
  return res.data;
};
