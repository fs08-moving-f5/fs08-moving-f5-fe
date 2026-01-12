// 프로필 관련 타입 정의

import type { components, paths } from '@/shared/types/openapi';

type GetUserProfileResponse =
  paths['/api/profile/user']['get']['responses'][200]['content']['application/json'];
type GetDriverProfileResponse =
  paths['/api/profile/driver']['get']['responses'][200]['content']['application/json'];
type GetMyProfileResponse =
  paths['/api/profile/me']['get']['responses'][200]['content']['application/json'];

type UserProfileBase = NonNullable<GetUserProfileResponse['data']>;
type DriverProfileBase = NonNullable<GetDriverProfileResponse['data']>;
type MyProfileBase = NonNullable<GetMyProfileResponse['data']>;

type RegionType = NonNullable<UserProfileBase['regions']>[number];
type ServiceType = NonNullable<UserProfileBase['services']>[number];

type MergedUserFields = {
  name: string;
  email: string;
  phone: string;
};

// 유저 프로필 (BE 응답에서 User 정보(name/email/phone)가 병합되어 내려옴)
type UserProfile = Omit<
  UserProfileBase,
  'id' | 'userId' | 'regions' | 'services' | 'createdAt' | 'updatedAt'
> &
  MergedUserFields & {
    id: string;
    userId: string;
    regions: RegionType[];
    services: ServiceType[];
    createdAt: string;
    updatedAt: string;
    imageKey?: string | null;
  };

// 기사 프로필 (BE 응답에서 User 정보(name/email/phone)가 병합되어 내려옴)
type DriverProfile = Omit<
  DriverProfileBase,
  'id' | 'driverId' | 'regions' | 'services' | 'createdAt' | 'updatedAt'
> &
  MergedUserFields & {
    id: string;
    driverId: string;
    regions: RegionType[];
    services: ServiceType[];
    createdAt: string;
    updatedAt: string;
    imageKey?: string | null;
  };

type MyProfile = UserProfile | DriverProfile;

type OpenApiCreateUserProfileRequest = components['schemas']['CreateUserProfileRequest'];
type OpenApiUpdateUserProfileRequest = components['schemas']['UpdateUserProfileRequest'];
type OpenApiCreateDriverProfileRequest = components['schemas']['CreateDriverProfileRequest'];
type OpenApiUpdateDriverProfileRequest = components['schemas']['UpdateDriverProfileRequest'];

// ========== 프로필 이미지 presign 관련 타입 ==========

type CreateProfileImagePutPresignRequest =
  paths['/api/profile/me/profile-image/presign-put']['post']['requestBody']['content']['application/json'];

type CreateProfileImagePutPresignResponse =
  paths['/api/profile/me/profile-image/presign-put']['post']['responses'][200]['content']['application/json'];

type ProfileImagePutPresignData = NonNullable<CreateProfileImagePutPresignResponse['data']>;

// 유저 프로필 생성 요청
type CreateUserProfileRequest = OpenApiCreateUserProfileRequest;

// 유저 프로필 수정 요청
// NOTE: BE 구현상 계정 정보/비밀번호 변경도 같은 endpoint로 처리하지만,
// OpenAPI 스펙의 UpdateUserProfileRequest에는 아직 반영되지 않아 확장 타입으로 보강합니다.
type UpdateUserProfileRequest = OpenApiUpdateUserProfileRequest & {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  currentPassword?: string;
  newPassword?: string;
};

// 기사 프로필 생성 요청
type CreateDriverProfileRequest = OpenApiCreateDriverProfileRequest;

// 기사 프로필 수정 요청
// NOTE: 유저와 동일하게 계정 정보/비밀번호 변경 필드를 확장합니다.
type UpdateDriverProfileRequest = OpenApiUpdateDriverProfileRequest & {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  currentPassword?: string;
  newPassword?: string;
};

// ========== 마이페이지 관련 타입 ==========

type GetMyPageResponse =
  paths['/api/my-page']['get']['responses'][200]['content']['application/json'];
type GetMyPageReviewsResponse =
  paths['/api/my-page/reviews']['get']['responses'][200]['content']['application/json'];

type MyPageDataBase = NonNullable<GetMyPageResponse['data']>;
type MyPageReviewsBase = NonNullable<GetMyPageReviewsResponse['data']>;
type MyPageReviewBase = components['schemas']['MyPageReview'];

// 마이페이지 데이터
type MyPageProfileBase = NonNullable<MyPageDataBase['profile']>;
type MyPageActivityBase = NonNullable<MyPageDataBase['activity']>;
type MyPageReviewDistributionBase = NonNullable<MyPageDataBase['reviewDistribution']>;

type MyPageData = {
  profile: Omit<MyPageProfileBase, 'id' | 'name' | 'services' | 'regions'> & {
    id: string;
    name: string;
    services: string[];
    regions: string[];
    favoritedCount: number;
  };
  activity: Omit<MyPageActivityBase, 'completedCount' | 'averageRating'> & {
    completedCount: number;
    averageRating: number;
  };
  // UI에서 숫자 키로 인덱싱(Object.values / [rating])하므로 number index 시그니처로 넓힘
  reviewDistribution: Record<number, number> & MyPageReviewDistributionBase;
};

// 리뷰
type Review = Omit<MyPageReviewBase, 'id' | 'createdAt' | 'userName'> & {
  id: string;
  createdAt: string;
  userName: string;
};

// 리뷰 목록 데이터
type ReviewListData = {
  reviews: Review[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
};

// ========== 기사 찾기 상세(공개 프로필) 관련 타입 ==========

interface DriverPublicProfileData {
  id: string;
  name: string;
  driverProfile: {
    id: string;
    driverId: string;
    imageUrl: string | null;
    career: number | null;
    shortIntro: string | null;
    description: string | null;
    regions: string[];
    services: string[];
    createdAt: string;
    updatedAt: string;
  } | null;
}

export type {
  CreateProfileImagePutPresignRequest,
  ProfileImagePutPresignData,
  CreateDriverProfileRequest,
  CreateUserProfileRequest,
  DriverProfile,
  DriverPublicProfileData,
  MyPageData,
  MyProfile,
  RegionType,
  Review,
  ReviewListData,
  ServiceType,
  UpdateDriverProfileRequest,
  UpdateUserProfileRequest,
  UserProfile,
};
