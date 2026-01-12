import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createUserProfile,
  createDriverProfile,
  updateUserProfile,
  updateDriverProfile,
} from '../../services/profileService';
import PROFILE_QUERY_KEY from '../../constants/queryKey';
import { showToast } from '@/shared/ui/sonner';

import type { UserType } from '@/features/auth/types/types';

/**
 * 유저 프로필 생성 Mutation Hook
 */
export const useCreateUserProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY.USER_PROFILE });
      showToast({ kind: 'success', message: '프로필이 생성되었습니다.' });
    },
    onError: (error: Error) => {
      showToast({
        kind: 'error',
        message: error.message || '프로필 생성에 실패했습니다.',
      });
    },
  });
};

/**
 * 기사 프로필 생성 Mutation Hook
 */
export const useCreateDriverProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDriverProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY.DRIVER_PROFILE });
      showToast({ kind: 'success', message: '프로필이 생성되었습니다.' });
    },
    onError: (error: Error) => {
      showToast({
        kind: 'error',
        message: error.message || '프로필 생성에 실패했습니다.',
      });
    },
  });
};

/**
 * 유저 프로필 수정 Mutation Hook
 */
export const useUpdateUserProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY.USER_PROFILE });
      showToast({ kind: 'success', message: '프로필이 수정되었습니다.' });
    },
    onError: (error: Error) => {
      showToast({
        kind: 'error',
        message: error.message || '프로필 수정에 실패했습니다.',
      });
    },
  });
};

/**
 * 기사 프로필 수정 Mutation Hook
 */
export const useUpdateDriverProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDriverProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY.DRIVER_PROFILE });
      showToast({ kind: 'success', message: '프로필이 수정되었습니다.' });
    },
    onError: (error: Error) => {
      showToast({
        kind: 'error',
        message: error.message || '프로필 수정에 실패했습니다.',
      });
    },
  });
};

/**
 * 유저 타입에 따른 프로필 생성 Mutation Hook
 */
export const useCreateProfileMutation = (userType: UserType) => {
  const createUser = useCreateUserProfileMutation();
  const createDriver = useCreateDriverProfileMutation();

  return userType === 'USER' ? createUser : createDriver;
};

/**
 * 유저 타입에 따른 프로필 수정 Mutation Hook
 */
export const useUpdateProfileMutation = (userType: UserType) => {
  const updateUser = useUpdateUserProfileMutation();
  const updateDriver = useUpdateDriverProfileMutation();

  return userType === 'USER' ? updateUser : updateDriver;
};
