import { api } from '@/shared/api/client';
import type {
  UserProfile,
  DriverProfile,
  CreateUserProfileRequest,
  UpdateUserProfileRequest,
  CreateDriverProfileRequest,
  UpdateDriverProfileRequest,
} from '../types/types';

// ========== 유저 프로필 API ==========

/**
 * 유저 프로필 조회
 */
export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await api.get<UserProfile>('profile/user');
  return response.data;
};

/**
 * 유저 프로필 생성
 */
export const createUserProfile = async (
  data: CreateUserProfileRequest,
): Promise<UserProfile> => {
  const response = await api.post<UserProfile>('profile/user', data);
  return response.data;
};

/**
 * 유저 프로필 수정
 */
export const updateUserProfile = async (
  data: UpdateUserProfileRequest,
): Promise<UserProfile> => {
  const response = await api.patch<UserProfile>('profile/user', data);
  return response.data;
};

// ========== 기사 프로필 API ==========

/**
 * 기사 프로필 조회
 */
export const getDriverProfile = async (): Promise<DriverProfile> => {
  const response = await api.get<DriverProfile>('profile/driver');
  return response.data;
};

/**
 * 기사 프로필 생성
 */
export const createDriverProfile = async (
  data: CreateDriverProfileRequest,
): Promise<DriverProfile> => {
  const response = await api.post<DriverProfile>('profile/driver', data);
  return response.data;
};

/**
 * 기사 프로필 수정
 */
export const updateDriverProfile = async (
  data: UpdateDriverProfileRequest,
): Promise<DriverProfile> => {
  const response = await api.patch<DriverProfile>('profile/driver', data);
  return response.data;
};

// ========== 공통 프로필 API ==========

/**
 * 내 프로필 조회 (유저 타입 자동 판별)
 */
export const getMyProfile = async (): Promise<UserProfile | DriverProfile> => {
  const response = await api.get<UserProfile | DriverProfile>('profile/me');
  return response.data;
};
