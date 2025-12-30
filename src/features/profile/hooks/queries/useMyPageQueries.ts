import { useQuery } from '@tanstack/react-query';
import { getMyPageData, getMyPageReviews } from '@/shared/api/myPage.api';
import MY_PAGE_QUERY_KEY from '../../constants/myPageQueryKey';

/**
 * 마이페이지 데이터 조회 Query Hook
 */
export const useGetMyPageQuery = () => {
  return useQuery({
    queryKey: MY_PAGE_QUERY_KEY.MY_PAGE,
    queryFn: getMyPageData,
  });
};

/**
 * 마이페이지 리뷰 목록 조회 Query Hook
 */
export const useGetMyPageReviewsQuery = ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: MY_PAGE_QUERY_KEY.MY_PAGE_REVIEWS(page, limit),
    queryFn: () => getMyPageReviews({ page, limit }),
  });
};
