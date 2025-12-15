import ky, { Options } from 'ky';
import type { ApiResponse } from '../types/api';

const apiClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30 * 1000, // 응답대기 30초
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeError: [
      (error) => {
        const { response } = error;
        if (response && response.body) {
          // API 에러 응답을 파싱
          error.name = 'ApiError';
        }
        return error;
      },
    ],
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
