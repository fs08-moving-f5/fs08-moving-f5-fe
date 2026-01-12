'use client';

import { useState } from 'react';
import { loginService } from '../services/login';

import type { LoginFormData, LoginResponse, UserType } from '../types/types';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (
    formData: LoginFormData,
    userType: UserType,
  ): Promise<LoginResponse | null> => {
    setIsLoading(true);
    try {
      const result = await loginService(formData, userType);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading };
}
