/**
 * 로그인 폼 검증 에러 메시지 상수
 */

export const LOGIN_ERROR_MESSAGES = {
  EMAIL: {
    REQUIRED: '이메일을 입력해 주세요',
    INVALID_FORMAT: '올바른 이메일 형식이 아닙니다',
  },
  PASSWORD: {
    REQUIRED: '비밀번호를 입력해 주세요',
  },
} as const;

/**
 * 정규표현식 패턴
 */
export const LOGIN_VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;
