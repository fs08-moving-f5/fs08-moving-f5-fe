import { useQuery } from '@tanstack/react-query';
import PROFILE_QUERY_KEY from '../../constants/queryKey';
import {
  getUserProfile,
  getDriverProfile,
  getMyProfile,
  getDriverPublicProfile,
  getDriverPublicReviews,
} from '../../services/profileService';

import type { UserType } from '@/features/auth/types/types';

/**
 * 유저 프로필 조회 Query Hook
 */
export const useGetUserProfileQuery = (enabled = true) => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY.USER_PROFILE,
    queryFn: getUserProfile,
    enabled,
  });
};

/**
 * 기사 프로필 조회 Query Hook
 */
export const useGetDriverProfileQuery = (enabled = true) => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY.DRIVER_PROFILE,
    queryFn: getDriverProfile,
    enabled,
  });
};

/**
 * 기사 공개 프로필 조회 Query Hook (기사 찾기 상세용)
 */
export const useGetDriverPublicProfileQuery = (driverId: string, enabled = true) => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY.DRIVER_PUBLIC_PROFILE(driverId),
    queryFn: () => getDriverPublicProfile(driverId),
    enabled: enabled && Boolean(driverId),
  });
};

/**
 * 기사 공개 리뷰 조회 Query Hook (기사 찾기 상세용)
 */
export const useGetDriverPublicReviewsQuery = ({
  driverId,
  page = 1,
  limit = 10,
  enabled = true,
}: {
  driverId: string;
  page?: number;
  limit?: number;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY.DRIVER_PUBLIC_REVIEWS(driverId, page, limit),
    queryFn: () => getDriverPublicReviews({ driverId, page, limit }),
    enabled: enabled && Boolean(driverId),
  });
};

/**
 * 내 프로필 조회 Query Hook (유저 타입 자동 판별)
 */
export const useGetMyProfileQuery = () => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY.MY_PROFILE,
    queryFn: getMyProfile,
  });
};

/**
 * 유저 타입에 따른 프로필 조회 Query Hook
 */
export const useGetProfileQuery = (userType: UserType) => {
  const userQuery = useGetUserProfileQuery(userType === 'USER');
  const driverQuery = useGetDriverProfileQuery(userType === 'DRIVER');

  return userType === 'USER' ? userQuery : driverQuery;
};
