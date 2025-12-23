import type { UserType, LoginData, SignupData } from '@/shared/types/user';

// ===== 회원가입 타입 =====

// 공통 폼 데이터
export interface SignupFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}

// 공통 폼 에러
export interface SignupFormErrors {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}

// 회원가입 요청
export interface SignupRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  type: UserType; // 백엔드는 'type' 필드를 사용
}

// 기사 회원가입 요청
export interface DriverSignupRequest extends SignupRequest {
  type: 'DRIVER';
}

// 일반 유저 회원가입 요청
export interface UserSignupRequest extends SignupRequest {
  type: 'USER';
}

// 회원가입 응답
export type SignupResponse = SignupData;

// ===== 로그인 타입 =====

// 로그인 폼 데이터
export interface LoginFormData {
  email: string;
  password: string;
}

// 로그인 요청
export interface LoginRequest {
  email: string;
  password: string;
  type: UserType;
}

// 로그인 응답
export type LoginResponse = LoginData;

// UserType export
export type { UserType };
