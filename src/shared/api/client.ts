import ky, { Options } from 'ky';
import type { ApiResponse } from '../types/api';
import { setAuthorizationHeader, handleToken } from './interceptors';

const apiClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30 * 1000, // 응답대기 30초
  credentials: 'include', // 쿠키 포함
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [setAuthorizationHeader],
    beforeRetry: [handleToken],
  },
});

// 타입이 안전한 API 요청 헬퍼 함수들
export const api = {
  get: async <T>(url: string, options?: Options): Promise<ApiResponse<T>> => {
    return apiClient.get(url, options).json<ApiResponse<T>>();
  },

  post: async <T>(url: string, data?: unknown, options?: Options): Promise<ApiResponse<T>> => {
    return apiClient
      .post(url, {
        ...options,
        json: data,
      })
      .json<ApiResponse<T>>();
  },

  put: async <T>(url: string, data?: unknown, options?: Options): Promise<ApiResponse<T>> => {
    return apiClient
      .put(url, {
        ...options,
        json: data,
      })
      .json<ApiResponse<T>>();
  },

  patch: async <T>(url: string, data?: unknown, options?: Options): Promise<ApiResponse<T>> => {
    return apiClient
      .patch(url, {
        ...options,
        json: data,
      })
      .json<ApiResponse<T>>();
  },

  delete: async <T>(url: string, options?: Options): Promise<ApiResponse<T>> => {
    return apiClient.delete(url, options).json<ApiResponse<T>>();
  },
};

export default apiClient;
