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
  phone: string | null;
  type: UserType;
  provider: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  hasProfile?: boolean;
}

// 로그인 응답 데이터
export interface LoginData {
  user: UserResponse;
  accessToken: string;
}

// 회원가입 응답 데이터
export interface SignupData {
  user: UserResponse;
  accessToken: string;
}

// 토큰 갱신 응답 데이터
export interface RefreshData {
  accessToken: string;
}
