/**
 * 프로필 등록 폼 검증 에러 메시지 상수
 */

export const PROFILE_ERROR_MESSAGES = {
  CAREER: {
    INVALID_FORMAT: '숫자만 입력해주세요.',
  },
  SHORT_INTRO: {
    MIN_LENGTH: '8자 이상 입력해주세요.',
  },
  DESCRIPTION: {
    MIN_LENGTH: '10자 이상 입력해주세요.',
  },
} as const;

/**
 * 정규표현식 패턴
 */
export const PROFILE_VALIDATION_PATTERNS = {
  NUMBER_ONLY: /^[0-9]*$/,
} as const;
