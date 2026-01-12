import type { components, paths } from '@/shared/types/openapi';

type UserType = components['schemas']['LoginRequest']['type'];

type OpenApiUser = Required<NonNullable<components['schemas']['User']>>;

// NOTE:
// - OpenAPI 스펙상 `phone`이 number로 생성되는 경우가 있어, FE/BE 실제 동작(문자열 전화번호)에 맞춰 string으로 오버라이드.
// - `hasProfile`은 BE에서 내려오지만 OpenAPI 스펙에 없을 수 있어 optional로 확장.
type UserResponse = Omit<OpenApiUser, 'phone'> & {
  phone: string | null;
  hasProfile?: boolean;
};

type RefreshResponse =
  paths['/api/auth/refresh']['post']['responses'][200]['content']['application/json'];

type RefreshDataBase = Required<NonNullable<RefreshResponse['data']>>;

type RefreshData = RefreshDataBase;

export type { RefreshData, UserResponse, UserType };
