import { useQuery } from '@tanstack/react-query';
import PROFILE_QUERY_KEY from '../../constants/queryKey';
import { getUserProfile, getDriverProfile, getMyProfile } from '../../services/profileService';
import type { UserType } from '@/features/auth/types/types';
import type { UserProfile, DriverProfile } from '../../types/types';

/**
 * 유저 프로필 조회 Query Hook
 */
export const useGetUserProfileQuery = () => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY.USER_PROFILE,
    queryFn: getUserProfile,
  });
};

/**
 * 기사 프로필 조회 Query Hook
 */
export const useGetDriverProfileQuery = () => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY.DRIVER_PROFILE,
    queryFn: getDriverProfile,
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
  const userQuery = useGetUserProfileQuery();
  const driverQuery = useGetDriverProfileQuery();

  return userType === 'USER' ? userQuery : driverQuery;
};
