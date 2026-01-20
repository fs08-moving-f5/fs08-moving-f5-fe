// API 공통 응답 타입
export interface ApiResponse<T = unknown> {
  success?: boolean;
  message?: string;
  data: T;
  count?: number;
  pagination?: {
    hasNext?: boolean;
    nextCursor?: string | null;
  };
}

// API 에러 타입
export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// HTTP 메서드별 타입
export type ApiMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
