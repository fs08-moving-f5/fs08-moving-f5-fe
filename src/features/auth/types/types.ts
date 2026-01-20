import type { components, paths } from '@/shared/types/openapi';

// ===== 회원가입 타입 =====

// 공통 폼 데이터
type SignupFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
};

// 공통 폼 에러
type SignupFormErrors = {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
};

type OpenApiSignupRequest = components['schemas']['SignupRequest'];

// 회원가입 요청
// NOTE: 백엔드(User.phone)는 String인데 OpenAPI 스펙에서는 number로 내려오는 케이스가 있어
// UI/백엔드 동작에 맞춰 string으로 오버라이드합니다.
type SignupRequest = Omit<OpenApiSignupRequest, 'phone'> & {
  phone: string;
  frontendOrigin?: string;
};

// 기사 회원가입 요청
type DriverSignupRequest = SignupRequest & { type: 'DRIVER' };

// 일반 유저 회원가입 요청
type UserSignupRequest = SignupRequest & { type: 'USER' };

type AuthSignupResponse =
  paths['/api/auth/signup']['post']['responses'][201]['content']['application/json'];

type AuthData = Required<NonNullable<components['schemas']['AuthResponse']['data']>>;
type AuthUser = Omit<Required<NonNullable<AuthData['user']>>, 'phone'> & {
  phone: string | null;
  hasProfile?: boolean;
};

// 회원가입 응답(data)
type SignupResponse = Omit<AuthData, 'user'> & { user: AuthUser };

// ===== 로그인 타입 =====

// 로그인 폼 데이터
type LoginFormData = {
  email: string;
  password: string;
};

// 로그인 요청
type LoginRequest = components['schemas']['LoginRequest'];

type AuthLoginResponse =
  paths['/api/auth/login']['post']['responses'][200]['content']['application/json'];

// 로그인 응답(data)
type LoginResponse = Omit<AuthData, 'user'> & { user: AuthUser };

// UserType export
type UserType = components['schemas']['LoginRequest']['type'];

// (참고) 아래 두 타입은 현재 파일에서는 직접 사용하지 않지만, OpenAPI 경로/상태코드가 바뀌면
// 컴파일 타임에 깨지도록 유지합니다.
type _AuthLoginResponse = AuthLoginResponse;
type _AuthSignupResponse = AuthSignupResponse;

export type {
  _AuthLoginResponse,
  _AuthSignupResponse,
  DriverSignupRequest,
  LoginFormData,
  LoginRequest,
  LoginResponse,
  SignupFormData,
  SignupFormErrors,
  SignupRequest,
  SignupResponse,
  UserSignupRequest,
  UserType,
};
