/**
 * 회원가입 폼 검증 에러 메시지 상수
 */

export const SIGNUP_ERROR_MESSAGES = {
  NAME: {
    REQUIRED: '이름을 입력해 주세요',
    MIN_LENGTH: '이름은 최소 2자 이상이어야 합니다',
  },
  EMAIL: {
    REQUIRED: '이메일을 입력해 주세요',
    INVALID_FORMAT: '올바른 이메일 형식이 아닙니다',
  },
  PHONE: {
    REQUIRED: '전화번호를 입력해 주세요',
    INVALID_FORMAT: '올바른 전화번호 형식이 아닙니다 (10-11자리 숫자)',
  },
  PASSWORD: {
    REQUIRED: '비밀번호를 입력해 주세요',
    MIN_LENGTH: '비밀번호는 8자 이상이어야 합니다',
    MISSING_LETTER: '비밀번호는 영문을 포함해야 합니다',
    MISSING_NUMBER: '비밀번호는 숫자를 포함해야 합니다',
    MISSING_SPECIAL: '비밀번호는 특수문자를 포함해야 합니다',
  },
  PASSWORD_CONFIRM: {
    REQUIRED: '비밀번호를 다시 입력해 주세요',
    NOT_MATCH: '비밀번호가 일치하지 않습니다',
  },
} as const;

/**
 * 정규표현식 패턴
 */
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{10,11}$/,
  PASSWORD_LETTER: /[a-zA-Z]/,
  PASSWORD_NUMBER: /[0-9]/,
  PASSWORD_SPECIAL: /[!@#$%^&*(),.?":{}|<>]/,
} as const;

/**
 * 검증 규칙 상수
 */
export const VALIDATION_RULES = {
  NAME_MIN_LENGTH: 2,
  PASSWORD_MIN_LENGTH: 8,
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 11,
} as const;
