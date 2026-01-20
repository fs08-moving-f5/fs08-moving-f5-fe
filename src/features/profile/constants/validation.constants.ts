/**
 * 프로필 등록 폼 검증 에러 메시지 상수
 */

export const PROFILE_ERROR_MESSAGES = {
  NAME: {
    REQUIRED: '이름을 입력해 주세요.',
    MIN_LENGTH: '이름은 최소 2자 이상 입력해주세요.',
    MAX_LENGTH: '이름은 최대 10자 이하로 입력해주세요.',
  },
  EMAIL: {
    REQUIRED: '이메일을 입력해 주세요.',
    INVALID_FORMAT: '올바른 이메일 형식이 아닙니다.',
  },
  PHONE: {
    REQUIRED: '전화번호를 입력해 주세요.',
    INVALID_FORMAT: '올바른 전화번호 형식이 아닙니다 (10-11자리 숫자).',
  },
  CAREER: {
    INVALID_FORMAT: '숫자만 입력해주세요.',
  },
  SHORT_INTRO: {
    MIN_LENGTH: '8자 이상 입력해주세요.',
  },
  DESCRIPTION: {
    MIN_LENGTH: '10자 이상 입력해주세요.',
  },
  PASSWORD: {
    REQUIRED: '비밀번호를 입력해주세요.',
    MIN_LENGTH: '비밀번호는 최소 8자 이상이어야 합니다.',
    INVALID_FORMAT: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
    MISMATCH: '새 비밀번호와 확인 비밀번호가 일치하지 않습니다.',
    CURRENT_REQUIRED: '현재 비밀번호를 입력해주세요.',
    CURRENT_INVALID: '현재 비밀번호가 올바르지 않습니다.',
  },
} as const;

/**
 * 정규표현식 패턴
 */
export const PROFILE_VALIDATION_PATTERNS_EXT = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{10,11}$/,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
} as const;

export const PROFILE_VALIDATION_RULES = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 10,
} as const;

export const PROFILE_VALIDATION_PATTERNS = {
  NUMBER_ONLY: /^[0-9]*$/,
} as const;
