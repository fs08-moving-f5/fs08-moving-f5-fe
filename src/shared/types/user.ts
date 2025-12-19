// 유저 타입
export type UserType = 'USER' | 'DRIVER';

// 토큰 응답
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

// 유저 정보
export interface UserResponse {
  id: string;
  email: string;
  name: string;
  phone: string;
  type: UserType;
  provider: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// 로그인,회원가입 응답
export interface AuthResponse {
  user: UserResponse;
  accessToken: string;
}
